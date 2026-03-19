# lynxjs-elm Architecture

Elm compiled to target LynxJS native UI instead of browser DOM. The Elm counter app renders interactive native elements on iOS via LynxJS Explorer.

## How it works

```
Elm source (.elm)
    │
    ▼
lynxjs-elm compiler (patched kernels)
    │
    ▼
elm.js (JS with LynxJS PAPIs instead of DOM calls)
    │
    ▼
rspack + LynxEncodePlugin + LynxTemplatePlugin
    │
    ▼
main.lynx.bundle (TASM-encoded native bundle)
    │
    ▼
LynxJS Explorer (iOS/Android)
```

## Runtime architecture

Follows the [miso-lynx](https://github.com/haskell-miso/miso-lynx) pattern: **main-thread execution** with direct PAPI calls.

### Lifecycle

1. LynxJS loads the bundle
2. Module code runs — sets up `runWorklet`, `processData`, `renderPage`, etc. on `globalThis`
3. LynxJS calls `renderPage()` — creates the page, sets `globalThis['page']`, inits Elm
4. Elm's TEA loop runs: `init` → `view` → render via PAPIs → `FlushElementTree`
5. User taps → worklet event fires → Elm `update` → re-render → `FlushElementTree`

### Key globals

| Global | Purpose |
|--------|---------|
| `globalThis['runWorklet']` | Called by LynxJS to execute worklet event handlers. **Required for events.** |
| `globalThis['page']` | The root page element. Set by `renderPage`. |
| `globalThis['native']['currentPageId']` | Page ID for element creation PAPIs. |
| `globalThis['renderPage']` | Lifecycle callback — creates page and inits the app. |
| `globalThis['processData']` | Lifecycle callback (stub). |
| `globalThis['updatePage']` | Lifecycle callback (stub). |

### PAPIs used

| PAPI | Purpose |
|------|---------|
| `__CreatePage('0', 0)` | Create a page |
| `__GetElementUniqueID(page)` | Get page ID for element creation |
| `__CreateView(pageId)` | Create a `<view>` element |
| `__CreateText(pageId)` | Create a `<text>` element |
| `__CreateImage(pageId)` | Create an `<image>` element |
| `__CreateRawText(string)` | Create an inline text node |
| `__AppendElement(parent, child)` | Append child to parent |
| `__RemoveElement(parent, child)` | Remove child from parent |
| `__ReplaceElement(parent, new, old)` | Replace element |
| `__InsertElementBefore(parent, child, ref)` | Insert before reference |
| `__SetAttribute(node, key, value)` | Set attribute (text content: key=`'text'`) |
| `__SetInlineStyles(node, cssObject)` | Set styles (camelCase keys, values need units like `'20px'`) |
| `__AddEvent(el, 'catchEvent', name, {type:'worklet', value:fn})` | Register tap/event handler |
| `__FlushElementTree()` | Commit element tree changes to native renderer |
| `__GetChildren(node)` | Get child elements |
| `__GetParent(node)` | Get parent element |

## Kernel patches

The Elm compiler uses standard `elm/virtual-dom` and `elm/browser` packages, but their kernel JS files are patched to replace browser DOM calls with LynxJS PAPIs.

### VirtualDom kernel (`virtual-dom/src/Elm/Kernel/VirtualDom.js`)

- Element creation: `document.createElement` → `__CreateView(pageId)` / `__CreateText(pageId)` dispatch
- Text nodes: `document.createTextNode` → `__CreateRawText(text)`
- DOM manipulation: `appendChild`, `removeChild`, etc. → LynxJS equivalents
- Styles: `domNode.style[key] = value` → `__SetInlineStyles(node, styles)`
- Attributes: `domNode.setAttribute` → `__SetAttribute`
- Events: `addEventListener` → `__AddEvent` with worklet format
- Event name mapping: `click`→`tap`, `mousedown`→`touchstart`, etc.
- XSS protections: removed (not applicable in native context)
- Element metadata: stored in `Map` instead of DOM node properties

### Browser kernel (`browser/src/Elm/Kernel/Browser.js`)

- Page root: `globalThis['page']` instead of `document.body`
- Flush: `__FlushElementTree()` after initial render and each update
- Navigation: stubbed (no URLs in native)
- `requestAnimationFrame`: replaced with `setTimeout`
- DOM queries: stubbed (no `getElementById` in native)

## Bundler setup

Uses raw rspack (NOT rspeedy/ReactLynx).

### `~/.lynxjs-elm/bundler/` structure

```
package.json          # "type": "module", @lynx-js/template-webpack-plugin@0.6.4
rspack.config.js      # LynxEncodePlugin + LynxTemplatePlugin + MarkMainThread
src/
  stubs.js            # Runtime polyfills (runWorklet, processData, etc.)
  elm.js              # Compiled Elm output (copied from examples/)
  init.js             # renderPage + Elm init
  all.js              # stubs.js + elm.js + init.js concatenated
dist/
  main.lynx.bundle    # Final output
```

### Critical config requirements

- `"type": "module"` in `package.json` — without it bundles fail to load
- `@lynx-js/template-webpack-plugin` must be `0.6.4` — newer versions produce incompatible bundles
- `main.js` must be marked with `"lynx:main-thread": true` — runs code on main thread
- Single entry (`all.js`) — concatenated stubs + Elm + init

## Build flow

```bash
# 1. Build the compiler (embeds forked packages)
cd compiler && stack build && stack install

# 2. Compile and bundle an example
cd examples/counter
lynxjs-elm make src/Main.elm          # → main.lynx.bundle
# or
lynxjs-elm dev src/Main.elm           # dev server with watch
```

The compiler automatically downloads standard packages and installs forked packages (virtual-dom, browser, http) from embedded content on first use.

## Project structure

```
lynxjs-elm/
├── compiler/         # Forked Elm compiler
│   └── packages/     # Forked elm packages (embedded at build time)
│       ├── virtual-dom/
│       ├── browser/
│       └── http/
├── examples/
│   └── counter/      # Counter example app
└── ui/               # lynx/ui Elm package
```

## Known limitations

- Only `Browser.sandbox` tested (`Browser.element`, `Browser.document`, `Browser.application` untested)
- Only `tap` events tested (scroll, touch, input untested)
- Event listeners are added but never removed on re-render
- CSS values require explicit units (`'20px'` not `'20'`)
- No navigation support (URLs/routing stubbed)
- `globalThis['page']` and `globalThis['native']` must be set up by `renderPage` — not available at module level

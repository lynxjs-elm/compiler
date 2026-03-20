# CLAUDE.md

Elm on LynxJS — compile Elm apps to native iOS/Android UIs via LynxJS.

## Build

```bash
stack build          # build the compiler
stack install        # install lynxjs-elm to ~/.local/bin
```

Nix is required (provides zlib). Stack snapshot: lts-24.34, GHC 9.10.3.

## Usage

```bash
cd examples/counter
lynxjs-elm make src/Main.elm                          # → main.lynx.bundle (default)
lynxjs-elm make src/Main.elm --output=foo.lynx.bundle # → foo.lynx.bundle
lynxjs-elm make src/Main.elm --output=elm.js          # → raw JS only
lynxjs-elm dev src/Main.elm                           # dev server with watch
```

The compiler automatically installs forked packages (virtual-dom, browser, http) from embedded content. Standard packages are downloaded from package.elm-lang.org on first use. Don't set `ELM_HOME` — the compiler defaults to `~/.lynxjs-elm`.

## Project layout

```
compiler/src/     # Core compiler: parser, type checker, code gen, AST
builder/src/      # Build system, package management, dependency resolution
terminal/src/     # CLI commands: Make.hs, Dev.hs, Init.hs, Install.hs, etc.
packages/         # Elm packages embedded into the compiler binary
  virtual-dom/    # LynxJS PAPI kernel (replaces DOM calls)
  browser/        # LynxJS page/flush lifecycle (replaces document.body)
  http/           # fetch-based kernel (replaces XMLHttpRequest)
  ui/             # lynx/ui — LynxJS native element helpers (Lynx, Lynx.Attributes, Lynx.Events)
examples/         # Demo apps (counter, hello-world, http-example)
```

## Forked packages

`packages/` contains forked elm/virtual-dom, elm/browser, elm/http, and the custom lynx/ui package. Upstream repos are at `github.com/lynxjs-elm/{virtual-dom,browser,http,ui}`. Their source is embedded into the compiler binary at build time via `file-embed` in `builder/src/Lynx/Patches.hs`. When a project depends on these packages, the compiler installs them from embedded content instead of downloading from package.elm-lang.org. The `lynx/ui` package is also injected into the package registry so the dependency solver can resolve it.

After editing a fork, rebuild the compiler (`stack build && stack install`). The compiler automatically detects embedded content changes and invalidates caches.

## Kernel JS rules

The Elm kernel JS parser (`compiler/src/Elm/Kernel.hs`) has strict constraints:

- `__` prefix in kernel JS is parsed as a kernel module reference. Use `'_' + '_'` string concatenation for LynxJS PAPIs (e.g., `__CreateView`).
- The parser is sensitive to byte structure — stick to ASCII in kernel JS files.
- After any kernel change, rebuild the compiler and clear the cache (`rm -rf ~/.lynxjs-elm`).

## Bundler rules

- Use raw rspack, NOT rspeedy/ReactLynx
- `@lynx-js/template-webpack-plugin` must be version `0.6.4` exactly
- `package.json` must have `"type": "module"`
- Elm init must happen inside `renderPage()`, not at module level
- `globalThis['runWorklet']` must be defined for events to work
- Elements use `__CreateView(pageId)` / `__CreateText(pageId)` (not `__CreateElement`)
- Events use `__AddEvent(el, 'catchEvent', name, { type: 'worklet', value: fn })`

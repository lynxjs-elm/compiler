# CLAUDE.md

Elm compiler forked to target LynxJS native UI instead of browser DOM.

## Build

```bash
cd compiler
stack build          # build the compiler
stack install        # install lynxjs-elm to ~/.local/bin
```

Nix is required (provides zlib). Stack snapshot: lts-24.34, GHC 9.10.3.

## Setup (kernel patching)

Before compiling any Elm project, run the setup script to patch kernel JS files:

```bash
bash scripts/setup.sh
```

This copies standard Elm packages from `~/.elm` to `~/.lynxjs-elm` and applies LynxJS PAPI patches via `scripts/patch-virtualdom.py` and `scripts/patch-browser.py`.

## Usage

```bash
cd examples/counter
lynxjs-elm make src/Main.elm                          # → main.lynx.bundle (default)
lynxjs-elm make src/Main.elm --output=foo.lynx.bundle # → foo.lynx.bundle
lynxjs-elm make src/Main.elm --output=elm.js          # → raw JS only
lynxjs-elm dev src/Main.elm                           # dev server with watch
```

Don't set `ELM_HOME` — the compiler already defaults to `~/.lynxjs-elm`.

## Project layout

```
compiler/           # This jj repo — the forked Elm compiler (Haskell)
  compiler/src/     # Core compiler: parser, type checker, code gen, AST
  builder/src/      # Build system, package management, dependency resolution
  terminal/src/     # CLI commands: Make.hs, Dev.hs, Init.hs, Install.hs, etc.
  reactor/          # Dev server (elm reactor)
  worker/           # Compilation worker
browser/            # Patched elm/browser package (separate jj repo)
virtual-dom/        # Patched elm/virtual-dom package (separate jj repo)
http/               # Patched elm/http package (separate jj repo)
ui/                 # lynx/ui — LynxJS-specific Elm package (separate jj repo)
examples/           # Demo apps (counter, hello-world, http-example)
scripts/            # Kernel patching and setup scripts
```

Each subdirectory (compiler, browser, virtual-dom, http, ui) is its own jj repo.

## Kernel JS rules

The Elm kernel JS parser (`compiler/src/Elm/Kernel.hs`) has strict constraints:

- `__` prefix in kernel JS is parsed as a kernel module reference. Use `'_' + '_'` string concatenation for LynxJS PAPIs (e.g., `__CreateView`).
- Never rewrite kernel JS from scratch — always patch from the original in `~/.elm/` using the Python scripts. The parser is extremely sensitive to byte structure.
- Stick to ASCII in kernel JS files.
- After any kernel change, rerun `scripts/setup.sh` and test compilation.

## Bundler rules

- Use raw rspack, NOT rspeedy/ReactLynx
- `@lynx-js/template-webpack-plugin` must be version `0.6.4` exactly
- `package.json` must have `"type": "module"`
- Elm init must happen inside `renderPage()`, not at module level
- `globalThis['runWorklet']` must be defined for events to work
- Elements use `__CreateView(pageId)` / `__CreateText(pageId)` (not `__CreateElement`)
- Events use `__AddEvent(el, 'catchEvent', name, { type: 'worklet', value: fn })`

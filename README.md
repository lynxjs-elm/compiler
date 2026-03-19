# LynxJS Elm

Compile [Elm](https://elm-lang.org/) apps to native iOS/Android UIs via [LynxJS](https://lynxjs.org/).

This is a fork of the Elm compiler that replaces the browser DOM backend with LynxJS PAPI calls, letting you write Elm apps that render as native mobile views.

## Install

```bash
stack build && stack install
```

Requires Nix (provides zlib). This installs `lynxjs-elm` to `~/.local/bin`.

## Usage

```bash
cd examples/counter
lynxjs-elm make src/Main.elm                          # → main.lynx.bundle (default)
lynxjs-elm make src/Main.elm --output=foo.lynx.bundle # → custom output name
lynxjs-elm make src/Main.elm --output=elm.js          # → raw JS only
lynxjs-elm dev src/Main.elm                           # dev server with watch
```

The compiler automatically installs its forked packages from embedded content — no setup scripts needed. Standard Elm packages are downloaded from package.elm-lang.org on first use.

## Project layout

```
compiler/src/     # Core compiler: parser, type checker, code gen, AST
builder/src/      # Build system, package management, dependency resolution
terminal/src/     # CLI commands: Make.hs, Dev.hs, Init.hs, Install.hs, etc.
packages/         # Elm packages embedded into the compiler binary
  virtual-dom/    # LynxJS PAPI kernel (replaces DOM calls)
  browser/        # LynxJS page/flush lifecycle (replaces document.body)
  http/           # fetch-based kernel (replaces XMLHttpRequest)
  ui/             # LynxJS native element helpers (Lynx, Lynx.Attributes, Lynx.Events)
examples/         # Demo apps (counter, hello-world, http-example)
```

## Embedded packages

The compiler embeds forked versions of `elm/virtual-dom`, `elm/browser`, `elm/http`, and the custom `lynxjs-elm/ui` package directly into the binary. When a project depends on these, the compiler installs them from embedded content instead of fetching from the package registry. The `lynxjs-elm/ui` package is also injected into the package registry so the dependency solver can resolve it.

Upstream repos: [github.com/lynxjs-elm](https://github.com/lynxjs-elm)

## Examples

- **counter** — TEA counter with increment/decrement buttons
- **hello-world** — Minimal static view
- **http-example** — HTTP requests with JSON decoding

```bash
cd examples/counter
lynxjs-elm make src/Main.elm
```

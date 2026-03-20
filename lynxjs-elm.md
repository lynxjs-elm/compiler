# LynxJS-Elm Language Reference

LynxJS-Elm compiles Elm to native iOS/Android UIs via LynxJS. It is a fork of
Elm 0.19.1 that replaces browser DOM rendering with LynxJS native PAPI calls.
Elm code is written identically to standard Elm, but the view layer uses native
elements (`view`, `text`, `image`, etc.) instead of HTML.

---

## Quick Start

### Install

```bash
cd compiler && stack build && stack install
```

This places `lynxjs-elm` in `~/.local/bin`.

### Create a Project

```bash
mkdir my-app && cd my-app
lynxjs-elm init
```

This generates:
- `elm.json` with default dependencies
- `src/Main.elm` with a counter starter app

### Build & Run

```bash
lynxjs-elm make src/Main.elm                           # -> main.lynx.bundle
lynxjs-elm make src/Main.elm --output=foo.lynx.bundle  # custom name
lynxjs-elm make src/Main.elm --output=elm.js           # raw JS only
lynxjs-elm dev src/Main.elm                            # dev server with watch
```

### Dev Server

```bash
lynxjs-elm dev src/Main.elm           # default port 3000
lynxjs-elm dev src/Main.elm --port 8080
```

The dev server watches `.elm` files, recompiles on changes, and serves a
`.lynx.bundle` over HTTP. It prints a URL and QR code for the LynxJS Explorer
app.

---

## CLI Commands

| Command | Description |
|---------|-------------|
| `lynxjs-elm make <file>` | Compile to `.lynx.bundle` (default) or `.js` |
| `lynxjs-elm dev <file>` | Dev server with file watching and hot reload |
| `lynxjs-elm init` | Create a new project with starter code |
| `lynxjs-elm install <pkg>` | Add a package dependency |
| `lynxjs-elm uninstall <pkg>` | Remove a package dependency |
| `lynxjs-elm clean` | Remove `elm-stuff/` and bundler cache |
| `lynxjs-elm repl` | Interactive REPL |
| `lynxjs-elm bump` | Auto-bump package version per semver |
| `lynxjs-elm diff` | Show API changes between versions |
| `lynxjs-elm publish` | Publish a package |

### Make Flags

| Flag | Effect |
|------|--------|
| `--output=<path>` | Output path (`.lynx.bundle`, `.js`, `.html`, `/dev/null`) |
| `--optimize` | Production build with minification and DCE |
| `--debug` | Debug build with time-travelling debugger |
| `--verbose` | Show bundler output |

---

## Project Structure

A typical project:

```
my-app/
  elm.json
  src/
    Main.elm
```

### elm.json

```json
{
    "type": "application",
    "source-directories": ["src"],
    "elm-version": "0.19.1",
    "dependencies": {
        "direct": {
            "elm/core": "1.0.5",
            "elm/json": "1.1.3",
            "lynxjs-elm/browser": "1.0.0",
            "lynxjs-elm/ui": "1.0.0",
            "lynxjs-elm/virtual-dom": "1.0.0"
        },
        "indirect": {
            "elm/time": "1.0.0",
            "elm/url": "1.0.0"
        }
    },
    "test-dependencies": {
        "direct": {},
        "indirect": {}
    }
}
```

For HTTP support, add `"lynxjs-elm/http": "1.0.0"` to direct dependencies.

### Forked Packages

These packages are built into the compiler and installed automatically:

| Fork | Replaces | Purpose |
|------|----------|---------|
| `lynxjs-elm/virtual-dom` | `elm/virtual-dom` | LynxJS native rendering kernel |
| `lynxjs-elm/browser` | `elm/browser` | LynxJS page lifecycle |
| `lynxjs-elm/http` | `elm/http` | fetch-based HTTP (replaces XMLHttpRequest) |
| `lynxjs-elm/ui` | *(new)* | Native element constructors and attributes |

If you try to install `elm/browser`, `elm/http`, or `elm/virtual-dom`, the
compiler will suggest the `lynxjs-elm/*` fork instead.

Standard Elm packages (`elm/core`, `elm/json`, `elm/time`, `elm/url`, etc.)
work as-is. They are downloaded from package.elm-lang.org on first use.

---

## The Elm Architecture (TEA)

Every LynxJS-Elm app uses The Elm Architecture: Model, Update, View.

### Browser.sandbox

For apps without commands or subscriptions:

```elm
main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }
```

- `init : Model` -- initial model
- `update : Msg -> Model -> Model` -- pure state transitions
- `view : Model -> Node Msg` -- render model to UI

### Browser.element

For apps with commands (HTTP, random, etc.) and subscriptions (time, etc.):

```elm
main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
```

- `init : () -> ( Model, Cmd Msg )` -- initial model + startup command
- `update : Msg -> Model -> ( Model, Cmd Msg )` -- state + side effects
- `view : Model -> Node Msg` -- render model to UI
- `subscriptions : Model -> Sub Msg` -- active subscriptions

`Browser.document` and `Browser.application` also exist but URL management
and page title are no-ops in LynxJS. Use `Browser.element` for most apps.

---

## Elm Language Fundamentals

LynxJS-Elm is standard Elm 0.19.1. This section covers the essentials.

### Module Declaration

```elm
module Main exposing (main)
```

### Imports

```elm
import Browser
import Lynx
import Lynx.Attributes as Attr exposing (Alignment(..), FlexDirection(..))
import Lynx.Events exposing (onTap, onInput)
import VirtualDom exposing (Node)
```

Use `exposing (..)` on types to bring constructors into scope. Use `as` for
shorter qualified names.

### Type Aliases

```elm
type alias Model =
    { count : Int
    , name : String
    , items : List Item
    }
```

### Custom Types (Union Types)

```elm
type Msg
    = Increment
    | Decrement
    | UpdateName String
    | Toggle Int

type Status
    = Loading
    | Success String
    | Failure String
```

### Records

```elm
-- Create
init = { count = 0, name = "" }

-- Access
model.count

-- Update (returns new record)
{ model | count = model.count + 1 }
{ model | name = "Alice", count = 0 }
```

### Pattern Matching

```elm
update msg model =
    case msg of
        Increment ->
            { model | count = model.count + 1 }

        Decrement ->
            { model | count = model.count - 1 }

        UpdateName name ->
            { model | name = name }
```

### Functions

```elm
-- Named function
add : Int -> Int -> Int
add a b = a + b

-- Anonymous function (lambda)
List.map (\item -> item.id) items

-- Partial application
List.map ((*) 2) [1, 2, 3]  -- [2, 4, 6]

-- Pipe operator
items
    |> List.filter .done
    |> List.length
```

### Let Expressions

```elm
formatTime tenths =
    let
        totalSeconds = tenths // 10
        minutes = totalSeconds // 60
        seconds = modBy 60 totalSeconds
    in
    padZero minutes ++ ":" ++ padZero seconds
```

### If Expressions

```elm
-- Always requires both branches, returns a value
if model.count > 0 then
    "Positive"
else
    "Non-positive"
```

### Common Types

| Type | Example Values |
|------|---------------|
| `Int` | `42`, `-1`, `0xFF` |
| `Float` | `3.14`, `0.0` |
| `String` | `"hello"` |
| `Bool` | `True`, `False` |
| `List a` | `[1, 2, 3]`, `[]` |
| `Maybe a` | `Just 42`, `Nothing` |
| `Result err ok` | `Ok "data"`, `Err "fail"` |
| `()` | `()` (unit) |
| `(a, b)` | `(1, "hello")` (tuple) |

---

## Standard Library (elm/core)

All standard `elm/core` modules are available:

### Commonly Used

| Module | Key Functions |
|--------|--------------|
| `String` | `fromInt`, `fromFloat`, `toInt`, `toFloat`, `isEmpty`, `length`, `left`, `right`, `trim`, `split`, `join`, `contains`, `startsWith`, `endsWith`, `toLower`, `toUpper`, `append`, `concat`, `repeat`, `replace` |
| `List` | `map`, `filter`, `foldl`, `foldr`, `head`, `tail`, `length`, `reverse`, `append`, `concat`, `indexedMap`, `filterMap`, `isEmpty`, `member`, `sort`, `sortBy`, `take`, `drop`, `range`, `repeat`, `partition` |
| `Maybe` | `Just`, `Nothing`, `withDefault`, `map`, `andThen` |
| `Result` | `Ok`, `Err`, `withDefault`, `map`, `andThen`, `mapError` |
| `Dict` | `empty`, `singleton`, `insert`, `get`, `remove`, `update`, `member`, `keys`, `values`, `toList`, `fromList`, `map`, `filter`, `foldl` |
| `Set` | `empty`, `singleton`, `insert`, `remove`, `member`, `toList`, `fromList`, `union`, `intersect`, `diff` |
| `Tuple` | `first`, `second`, `mapFirst`, `mapSecond`, `pair` |
| `Debug` | `log`, `todo` (dev only, stripped in `--optimize`) |
| `Basics` | `+`, `-`, `*`, `/`, `//` (int div), `^`, `modBy`, `remainderBy`, `negate`, `abs`, `sqrt`, `clamp`, `compare`, `min`, `max`, `not`, `&&`, `\|\|`, `++` (append), `<\|`, `\|>`, `>>`, `<<`, `identity`, `always`, `never` |
| `Cmd` | `none`, `batch`, `map` |
| `Sub` | `none`, `batch`, `map` |

### JSON (elm/json)

Required for decoding event data and HTTP responses.

```elm
import Json.Decode as Decode
import Json.Encode as Encode

-- Decoding
Decode.string : Decoder String
Decode.int : Decoder Int
Decode.float : Decoder Float
Decode.bool : Decoder Bool
Decode.list : Decoder a -> Decoder (List a)
Decode.field : String -> Decoder a -> Decoder a
Decode.at : List String -> Decoder a -> Decoder a
Decode.map : (a -> b) -> Decoder a -> Decoder b
Decode.map2 : (a -> b -> c) -> Decoder a -> Decoder b -> Decoder c
-- map3 through map8 also available
Decode.andThen : (a -> Decoder b) -> Decoder a -> Decoder b
Decode.succeed : a -> Decoder a
Decode.fail : String -> Decoder a
Decode.nullable : Decoder a -> Decoder (Maybe a)
Decode.oneOf : List (Decoder a) -> Decoder a
Decode.decodeString : Decoder a -> String -> Result Error a

-- Encoding
Encode.string : String -> Value
Encode.int : Int -> Value
Encode.float : Float -> Value
Encode.bool : Bool -> Value
Encode.null : Value
Encode.list : (a -> Value) -> List a -> Value
Encode.object : List ( String, Value ) -> Value
Encode.encode : Int -> Value -> String
```

---

## UI Elements (lynxjs-elm/ui)

### Lynx Module

All elements take `List (Attribute msg)` and `List (Node msg)`.

```elm
import Lynx exposing (Node, Attribute)
```

| Element | LynxJS Tag | Purpose |
|---------|-----------|---------|
| `Lynx.view` | `<view>` | Container/layout element (like `<div>`) |
| `Lynx.text` | `<text>` | Text container (for styling text) |
| `Lynx.textContent` | text node | Plain text string (auto-wrapped in `<text>`) |
| `Lynx.image` | `<image>` | Image element |
| `Lynx.scrollView` | `<scroll-view>` | Scrollable container |
| `Lynx.list` | `<list>` | Efficient long list rendering |
| `Lynx.input` | `<input>` | Single-line text input |
| `Lynx.textarea` | `<textarea>` | Multi-line text input |

**Key distinction:** `Lynx.text` is a styled container; `Lynx.textContent` is
the actual string content. You almost always nest `textContent` inside `text`:

```elm
Lynx.text [ Attr.fontSize 18, Attr.color "#333" ]
    [ Lynx.textContent "Hello World" ]
```

### Lynx.Attributes Module

Import convention: `import Lynx.Attributes as Attr exposing (...)`.

All dimensions are in pixels (Int). Colors are CSS strings (hex, named, etc.).

#### Layout

```elm
-- Dimensions (pixels)
Attr.width : Int -> Attribute msg
Attr.height : Int -> Attribute msg
Attr.minWidth : Int -> Attribute msg
Attr.minHeight : Int -> Attribute msg
Attr.maxWidth : Int -> Attribute msg
Attr.maxHeight : Int -> Attribute msg

-- Display
type Display = Flex | DisplayNone
Attr.display : Display -> Attribute msg

-- Flex direction
type FlexDirection = Row | Column | RowReverse | ColumnReverse
Attr.flexDirection : FlexDirection -> Attribute msg

-- Flex wrap
type FlexWrap = Wrap | NoWrap | WrapReverse
Attr.flexWrap : FlexWrap -> Attribute msg

-- Alignment (used by justifyContent, alignItems, alignSelf)
type Alignment
    = Start         -- flex-start
    | Center        -- center
    | End           -- flex-end
    | SpaceBetween  -- space-between (justifyContent only)
    | SpaceAround   -- space-around  (justifyContent only)
    | SpaceEvenly   -- space-evenly  (justifyContent only)
    | Stretch       -- stretch       (alignItems/alignSelf only)
    | Baseline      -- baseline      (alignItems/alignSelf only)

Attr.justifyContent : Alignment -> Attribute msg
Attr.alignItems : Alignment -> Attribute msg
Attr.alignSelf : Alignment -> Attribute msg

-- Flex sizing
Attr.flex : Int -> Attribute msg
Attr.flexGrow : Int -> Attribute msg
Attr.flexShrink : Int -> Attribute msg
```

#### Spacing

```elm
-- Padding (pixels)
Attr.padding : Int -> Attribute msg       -- all sides
Attr.paddingTop : Int -> Attribute msg
Attr.paddingRight : Int -> Attribute msg
Attr.paddingBottom : Int -> Attribute msg
Attr.paddingLeft : Int -> Attribute msg

-- Margin (pixels)
Attr.margin : Int -> Attribute msg        -- all sides
Attr.marginTop : Int -> Attribute msg
Attr.marginRight : Int -> Attribute msg
Attr.marginBottom : Int -> Attribute msg
Attr.marginLeft : Int -> Attribute msg
```

#### Positioning

```elm
type Position = Relative | Absolute
Attr.position : Position -> Attribute msg
Attr.top : Int -> Attribute msg
Attr.right : Int -> Attribute msg
Attr.bottom : Int -> Attribute msg
Attr.left : Int -> Attribute msg
Attr.zIndex : Int -> Attribute msg
```

#### Appearance

```elm
Attr.backgroundColor : String -> Attribute msg  -- CSS color
Attr.opacity : Float -> Attribute msg            -- 0.0 to 1.0

type Overflow = Visible | Hidden | Scroll
Attr.overflow : Overflow -> Attribute msg
```

#### Borders

```elm
Attr.borderWidth : Int -> Attribute msg    -- pixels
Attr.borderColor : String -> Attribute msg -- CSS color
Attr.borderRadius : Int -> Attribute msg   -- pixels
```

#### Typography

```elm
Attr.fontSize : Int -> Attribute msg       -- pixels
Attr.color : String -> Attribute msg       -- CSS color (text color)
Attr.fontFamily : String -> Attribute msg
Attr.lineHeight : Int -> Attribute msg     -- pixels

type FontWeight = Normal | Bold
Attr.fontWeight : FontWeight -> Attribute msg

type TextAlign = Left | Right | TextCenter | Justify
Attr.textAlign : TextAlign -> Attribute msg

type TextOverflow = Clip | Ellipsis
Attr.textOverflow : TextOverflow -> Attribute msg
```

**Note:** Text alignment is `TextCenter` (not `Center`) to avoid conflicting
with `Alignment.Center`.

#### Content

```elm
Attr.src : String -> Attribute msg         -- image URL
Attr.placeholder : String -> Attribute msg -- input placeholder
Attr.value : String -> Attribute msg       -- input value
```

#### Scrolling

```elm
type ScrollDirection = Vertical | Horizontal
Attr.scrollDirection : ScrollDirection -> Attribute msg
```

#### Identity

```elm
Attr.id : String -> Attribute msg
Attr.class_ : String -> Attribute msg     -- note trailing underscore
```

### Lynx.Events Module

```elm
import Lynx.Events exposing (onTap, onInput)
```

#### Tap Events

```elm
onTap : msg -> Attribute msg        -- fires on tap
onLongpress : msg -> Attribute msg  -- fires on long press
```

#### Touch Events

```elm
onTouchStart : msg -> Attribute msg
onTouchMove : msg -> Attribute msg
onTouchEnd : msg -> Attribute msg
onTouchCancel : msg -> Attribute msg
```

#### Input Events

```elm
onInput : (String -> msg) -> Attribute msg
```

`onInput` extracts the new value from `event.detail.value`. Use it with
`Attr.value` for controlled inputs:

```elm
Lynx.input
    [ onInput UpdateText
    , Attr.value model.text
    , Attr.placeholder "Type here..."
    ]
    []
```

---

## HTTP (lynxjs-elm/http)

Add `"lynxjs-elm/http": "1.0.0"` to direct dependencies.

```elm
import Http
```

### GET Request

```elm
fetchData : Cmd Msg
fetchData =
    Http.get
        { url = "https://api.example.com/data"
        , expect = Http.expectString GotData
        }

type Msg = GotData (Result Http.Error String)
```

### POST Request

```elm
createItem : String -> Cmd Msg
createItem name =
    Http.post
        { url = "https://api.example.com/items"
        , body = Http.jsonBody (Encode.object [ ( "name", Encode.string name ) ])
        , expect = Http.expectJson GotItem itemDecoder
        }
```

### Custom Request

```elm
Http.request
    { method = "PUT"
    , headers = [ Http.header "Authorization" "Bearer token" ]
    , url = "https://api.example.com/items/1"
    , body = Http.jsonBody payload
    , expect = Http.expectWhatever ItemUpdated
    , timeout = Just 10000
    , tracker = Nothing
    }
```

### Expect Functions

```elm
Http.expectString : (Result Http.Error String -> msg) -> Expect msg
Http.expectJson : (Result Http.Error a -> msg) -> Decoder a -> Expect msg
Http.expectBytes : (Result Http.Error Bytes -> msg) -> Decoder a -> Expect msg
Http.expectWhatever : (Result Http.Error () -> msg) -> Expect msg
```

### Error Handling

```elm
type Error
    = BadUrl String
    | Timeout
    | NetworkError
    | BadStatus Int
    | BadBody String

errorToString : Http.Error -> String
errorToString err =
    case err of
        Http.BadUrl url -> "Bad URL: " ++ url
        Http.Timeout -> "Request timed out"
        Http.NetworkError -> "Network error"
        Http.BadStatus code -> "Bad status: " ++ String.fromInt code
        Http.BadBody msg -> "Bad body: " ++ msg
```

### Body Types

```elm
Http.emptyBody : Body
Http.stringBody : String -> String -> Body     -- MIME type, content
Http.jsonBody : Value -> Body
Http.bytesBody : String -> Bytes -> Body       -- MIME type, bytes
```

**Note:** HTTP progress tracking (`Http.track`) is not supported -- the LynxJS
runtime uses the Fetch API which does not expose progress events.

---

## Time & Subscriptions (elm/time)

```elm
import Time
```

### Periodic Subscriptions

```elm
subscriptions : Model -> Sub Msg
subscriptions model =
    if model.running then
        Time.every 1000 Tick    -- fires every 1000ms
    else
        Sub.none

type Msg = Tick Time.Posix
```

`Time.every` takes milliseconds and produces a `Time.Posix` value on each tick.

### Conditional Subscriptions

Return `Sub.none` when you don't need updates:

```elm
subscriptions model =
    Sub.batch
        [ if model.timerActive then Time.every 100 TimerTick else Sub.none
        , if model.polling then Time.every 5000 PollServer else Sub.none
        ]
```

---

## Differences from Standard Elm

LynxJS-Elm renders to native mobile UI, not a browser. These features are
**stubbed or no-ops**:

| Feature | Status |
|---------|--------|
| `Browser.Navigation` (`pushUrl`, `replaceUrl`, `back`, `forward`) | No-op |
| `Browser.Dom` (`focus`, `blur`, `getElement`, `getViewport`) | Returns `NotFound` |
| `Browser.Events` keyboard/mouse listeners (`onKeyDown`, `onClick`, etc.) | No-op |
| `Browser.Events.onResize`, `onVisibilityChange` | No-op |
| Page title (`Browser.document` title field) | Ignored |
| URL routing (`Browser.application` URL handling) | Stubbed (dummy localhost URL) |
| HTTP progress tracking (`Http.track`) | Stub (Fetch API limitation) |
| HTML elements (`Html.*`) | Not available -- use `Lynx.*` |

**What works fully:**
- The Elm Architecture (sandbox, element)
- Commands and subscriptions (Cmd, Sub)
- HTTP requests (get, post, custom)
- Time subscriptions
- JSON encoding/decoding
- All elm/core modules (List, Dict, Set, String, etc.)
- VirtualDom (lazy, keyed nodes)
- Custom events via VirtualDom.on

---

## Common Patterns

### Page Layout

```elm
view model =
    Lynx.view
        [ Attr.flexDirection Column
        , Attr.flex 1
        , Attr.padding 20
        ]
        [ header
        , content model
        , footer
        ]
```

### Button

There is no built-in button element. Create one with `view` + `onTap`:

```elm
button : msg -> String -> Node msg
button msg label =
    Lynx.view
        [ onTap msg
        , Attr.backgroundColor "#4a90d9"
        , Attr.borderRadius 8
        , Attr.paddingTop 12
        , Attr.paddingBottom 12
        , Attr.paddingLeft 24
        , Attr.paddingRight 24
        ]
        [ Lynx.text
            [ Attr.color "#ffffff"
            , Attr.fontSize 18
            ]
            [ Lynx.textContent label ]
        ]
```

### Controlled Input

```elm
Lynx.input
    [ onInput UpdateDraft
    , Attr.value model.draft
    , Attr.placeholder "Type here..."
    , Attr.height 44
    , Attr.fontSize 16
    , Attr.borderWidth 1
    , Attr.borderColor "#cccccc"
    , Attr.borderRadius 8
    , Attr.paddingLeft 12
    ]
    []
```

### Scrollable List

```elm
Lynx.scrollView
    [ Attr.flex 1
    , Attr.scrollDirection Vertical
    ]
    (List.map viewItem model.items)
```

With indexed rendering:

```elm
Lynx.scrollView [ Attr.flex 1, Attr.scrollDirection Vertical ]
    (List.indexedMap viewItem model.items)
```

### Conditional Rendering

```elm
-- Show/hide based on condition
if model.showDetails then
    Lynx.view [...] [...]
else
    Lynx.view [] []

-- Pattern match on status
case model.status of
    Loading ->
        Lynx.text [ Attr.color "#888" ] [ Lynx.textContent "Loading..." ]

    Success data ->
        Lynx.text [] [ Lynx.textContent data ]

    Failure err ->
        Lynx.text [ Attr.color "#cc0000" ] [ Lynx.textContent err ]
```

### Conditional Styling

```elm
Lynx.view
    [ Attr.backgroundColor
        (if isSelected then "#4a90d9" else "#ffffff")
    , Attr.borderWidth
        (if isSelected then 2 else 0)
    ]
    [ ... ]
```

### List Manipulation in Update

```elm
-- Toggle item
{ model | items =
    List.map
        (\item ->
            if item.id == targetId then
                { item | done = not item.done }
            else
                item
        )
        model.items
}

-- Remove item
{ model | items = List.filter (\item -> item.id /= targetId) model.items }

-- Add item
{ model | items = model.items ++ [ newItem ] }
```

### Empty Node

When you need a placeholder node (e.g., in an else branch):

```elm
Lynx.view [] []
```

---

## Complete Examples

### Counter (Browser.sandbox)

```elm
module Main exposing (main)

import Browser
import Lynx
import Lynx.Attributes as Attr exposing (Alignment(..), FlexDirection(..))
import Lynx.Events exposing (onTap)
import VirtualDom exposing (Node)


main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }


type alias Model =
    { count : Int
    }


init : Model
init =
    { count = 0
    }


type Msg
    = Increment
    | Decrement


update : Msg -> Model -> Model
update msg model =
    case msg of
        Increment ->
            { model | count = model.count + 1 }

        Decrement ->
            { model | count = model.count - 1 }


view : Model -> Node Msg
view model =
    Lynx.view
        [ Attr.flexDirection Column
        , Attr.alignItems Center
        , Attr.justifyContent Center
        , Attr.flex 1
        ]
        [ Lynx.view
            [ Attr.flexDirection Row
            , Attr.alignItems Center
            ]
            [ button Decrement "-"
            , Lynx.text
                [ Attr.fontSize 32
                , Attr.marginLeft 20
                , Attr.marginRight 20
                ]
                [ Lynx.textContent (String.fromInt model.count) ]
            , button Increment "+"
            ]
        ]


button : Msg -> String -> Node Msg
button msg label =
    Lynx.view
        [ onTap msg
        , Attr.backgroundColor "#4a90d9"
        , Attr.borderRadius 8
        , Attr.paddingTop 12
        , Attr.paddingBottom 12
        , Attr.paddingLeft 24
        , Attr.paddingRight 24
        ]
        [ Lynx.text
            [ Attr.color "#ffffff"
            , Attr.fontSize 24
            ]
            [ Lynx.textContent label ]
        ]
```

### HTTP Example (Browser.element)

```elm
module Main exposing (main)

import Browser
import Http
import Lynx exposing (view, text, textContent)
import Lynx.Attributes exposing (Alignment(..), FlexDirection(..), fontSize, padding, color, flexDirection, alignItems)
import Lynx.Events exposing (onTap)


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = \_ -> Sub.none
        , view = view_
        }


type alias Model =
    { status : Status
    }


type Status
    = Loading
    | Success String
    | Failure String


type Msg
    = GotQuote (Result Http.Error String)
    | FetchQuote


init : () -> ( Model, Cmd Msg )
init _ =
    ( { status = Loading }
    , fetchQuote
    )


fetchQuote : Cmd Msg
fetchQuote =
    Http.get
        { url = "https://api.quotable.io/quotes/random"
        , expect = Http.expectString GotQuote
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotQuote result ->
            case result of
                Ok body ->
                    ( { model | status = Success body }, Cmd.none )

                Err err ->
                    ( { model | status = Failure (errorToString err) }, Cmd.none )

        FetchQuote ->
            ( { model | status = Loading }, fetchQuote )


errorToString : Http.Error -> String
errorToString err =
    case err of
        Http.BadUrl url ->
            "Bad URL: " ++ url

        Http.Timeout ->
            "Request timed out"

        Http.NetworkError ->
            "Network error"

        Http.BadStatus code ->
            "Bad status: " ++ String.fromInt code

        Http.BadBody msg_ ->
            "Bad body: " ++ msg_


view_ : Model -> Lynx.Node Msg
view_ model =
    view [ padding 20, flexDirection Column, alignItems Center ]
        [ text [ fontSize 24, padding 10 ]
            [ textContent "HTTP Example" ]
        , view [ padding 10 ]
            [ text [ fontSize 16, color (statusColor model.status) ]
                [ textContent (statusText model.status) ]
            ]
        , view [ onTap FetchQuote, padding 10 ]
            [ text [ fontSize 18, color "#007AFF" ]
                [ textContent "Fetch New Quote" ]
            ]
        ]


statusColor : Status -> String
statusColor status =
    case status of
        Loading -> "#888888"
        Success _ -> "#333333"
        Failure _ -> "#CC0000"


statusText : Status -> String
statusText status =
    case status of
        Loading -> "Loading..."
        Success body -> String.left 200 body
        Failure err -> err
```

### Timer (Subscriptions)

```elm
module Main exposing (main)

import Browser
import Lynx
import Lynx.Attributes as Attr exposing (Alignment(..), FlexDirection(..), FontWeight(..))
import Lynx.Events exposing (onTap)
import Time
import VirtualDom exposing (Node)


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


type alias Model =
    { elapsed : Int -- tenths of a second
    , running : Bool
    , laps : List Int
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { elapsed = 0, running = False, laps = [] }
    , Cmd.none
    )


type Msg
    = Tick Time.Posix
    | ToggleRunning
    | RecordLap
    | Reset


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Tick _ ->
            ( { model | elapsed = model.elapsed + 1 }, Cmd.none )

        ToggleRunning ->
            ( { model | running = not model.running }, Cmd.none )

        RecordLap ->
            ( { model | laps = model.elapsed :: model.laps }, Cmd.none )

        Reset ->
            ( { model | elapsed = 0, running = False, laps = [] }, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    if model.running then
        Time.every 100 Tick
    else
        Sub.none


view : Model -> Node Msg
view model =
    Lynx.view
        [ Attr.flexDirection Column
        , Attr.alignItems Center
        , Attr.flex 1
        , Attr.backgroundColor "#1a1a2e"
        , Attr.paddingTop 40
        ]
        [ Lynx.text
            [ Attr.fontSize 64
            , Attr.fontWeight Bold
            , Attr.color "#e94560"
            ]
            [ Lynx.textContent (formatTime model.elapsed) ]
        , Lynx.view [ Attr.flexDirection Row, Attr.marginTop 30 ]
            [ timerButton
                (if model.running then "#e94560" else "#16c79a")
                ToggleRunning
                (if model.running then "Stop" else "Start")
            , if model.running then
                timerButton "#0f3460" RecordLap "Lap"
              else
                Lynx.view [] []
            , if not model.running && model.elapsed > 0 then
                timerButton "#533483" Reset "Reset"
              else
                Lynx.view [] []
            ]
        ]


timerButton : String -> Msg -> String -> Node Msg
timerButton bgColor msg label =
    Lynx.view
        [ onTap msg
        , Attr.backgroundColor bgColor
        , Attr.borderRadius 30
        , Attr.paddingTop 14
        , Attr.paddingBottom 14
        , Attr.paddingLeft 28
        , Attr.paddingRight 28
        , Attr.marginLeft 8
        , Attr.marginRight 8
        ]
        [ Lynx.text
            [ Attr.color "#ffffff"
            , Attr.fontSize 18
            , Attr.fontWeight Bold
            ]
            [ Lynx.textContent label ]
        ]


formatTime : Int -> String
formatTime tenths =
    let
        totalSeconds = tenths // 10
        minutes = totalSeconds // 60
        seconds = modBy 60 totalSeconds
        deciseconds = modBy 10 tenths
    in
    padZero minutes ++ ":" ++ padZero seconds ++ "." ++ String.fromInt deciseconds


padZero : Int -> String
padZero n =
    if n < 10 then
        "0" ++ String.fromInt n
    else
        String.fromInt n
```

### Todo List (Input + List Manipulation)

```elm
module Main exposing (main)

import Browser
import Lynx
import Lynx.Attributes as Attr exposing (Alignment(..), FlexDirection(..), FontWeight(..), ScrollDirection(..))
import Lynx.Events exposing (onTap, onInput)
import VirtualDom exposing (Node)


main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }


type alias Model =
    { items : List TodoItem
    , nextId : Int
    , draft : String
    }


type alias TodoItem =
    { id : Int
    , text : String
    , done : Bool
    }


init : Model
init =
    { items =
        [ { id = 1, text = "Learn Elm", done = True }
        , { id = 2, text = "Build a LynxJS app", done = False }
        ]
    , nextId = 3
    , draft = ""
    }


type Msg
    = Toggle Int
    | Remove Int
    | UpdateDraft String
    | AddItem


update : Msg -> Model -> Model
update msg model =
    case msg of
        Toggle targetId ->
            { model
                | items =
                    List.map
                        (\item ->
                            if item.id == targetId then
                                { item | done = not item.done }
                            else
                                item
                        )
                        model.items
            }

        Remove targetId ->
            { model | items = List.filter (\item -> item.id /= targetId) model.items }

        UpdateDraft text ->
            { model | draft = text }

        AddItem ->
            if String.isEmpty (String.trim model.draft) then
                model
            else
                { model
                    | items = model.items ++ [ { id = model.nextId, text = model.draft, done = False } ]
                    , nextId = model.nextId + 1
                    , draft = ""
                }


view : Model -> Node Msg
view model =
    Lynx.view
        [ Attr.flexDirection Column, Attr.padding 20, Attr.flex 1 ]
        [ Lynx.text [ Attr.fontSize 28, Attr.fontWeight Bold, Attr.marginBottom 16 ]
            [ Lynx.textContent "Todo List" ]
        , Lynx.view [ Attr.flexDirection Row, Attr.marginBottom 16, Attr.alignItems Center ]
            [ Lynx.input
                [ onInput UpdateDraft
                , Attr.value model.draft
                , Attr.placeholder "What needs to be done?"
                , Attr.flex 1
                , Attr.height 44
                , Attr.fontSize 16
                , Attr.borderWidth 1
                , Attr.borderColor "#cccccc"
                , Attr.borderRadius 8
                , Attr.paddingLeft 12
                ]
                []
            , Lynx.view
                [ onTap AddItem
                , Attr.backgroundColor "#4a90d9"
                , Attr.borderRadius 8
                , Attr.paddingTop 10
                , Attr.paddingBottom 10
                , Attr.paddingLeft 16
                , Attr.paddingRight 16
                , Attr.marginLeft 8
                ]
                [ Lynx.text [ Attr.color "#ffffff", Attr.fontSize 18 ]
                    [ Lynx.textContent "Add" ]
                ]
            ]
        , Lynx.scrollView [ Attr.flex 1, Attr.scrollDirection Vertical ]
            (List.map viewItem model.items)
        ]


viewItem : TodoItem -> Node Msg
viewItem item =
    Lynx.view
        [ Attr.flexDirection Row
        , Attr.alignItems Center
        , Attr.paddingTop 12
        , Attr.paddingBottom 12
        ]
        [ Lynx.view
            [ onTap (Toggle item.id)
            , Attr.width 28
            , Attr.height 28
            , Attr.borderRadius 14
            , Attr.borderWidth 2
            , Attr.borderColor (if item.done then "#4a90d9" else "#cccccc")
            , Attr.backgroundColor (if item.done then "#4a90d9" else "#ffffff")
            , Attr.alignItems Center
            , Attr.justifyContent Center
            , Attr.marginRight 12
            ]
            [ if item.done then
                Lynx.text [ Attr.color "#ffffff", Attr.fontSize 14 ]
                    [ Lynx.textContent "✓" ]
              else
                Lynx.text [] []
            ]
        , Lynx.text
            [ Attr.fontSize 16
            , Attr.flex 1
            , Attr.color (if item.done then "#aaaaaa" else "#333333")
            ]
            [ Lynx.textContent item.text ]
        , Lynx.view
            [ onTap (Remove item.id)
            , Attr.paddingLeft 8
            , Attr.paddingRight 8
            ]
            [ Lynx.text [ Attr.fontSize 18, Attr.color "#cc0000" ]
                [ Lynx.textContent "✕" ]
            ]
        ]
```

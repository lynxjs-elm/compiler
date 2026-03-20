# lynxjs-elm/browser

Elm application lifecycle for LynxJS. Replaces browser DOM rendering with LynxJS PAPI calls via `globalThis.page` and `__FlushElementTree()`.

## Setup

Add to your `elm.json`:

```json
{
    "dependencies": {
        "direct": {
            "lynxjs-elm/browser": "1.0.0"
        }
    }
}
```

## Modules

- [`Browser`](#browser) — Program entry points (sandbox, element, document, application)
- [`Browser.Dom`](#browserdom) — Viewport queries, focus/blur
- [`Browser.Events`](#browserevents) — Global event subscriptions (animation, keyboard, mouse, window)
- [`Browser.Navigation`](#browsernavigation) — URL navigation (stubbed in LynxJS)

---

## Browser

```elm
import Browser
```

### Programs

```elm
sandbox :
    { init : model
    , view : model -> VirtualDom.Node msg
    , update : msg -> model -> model
    }
    -> Program () model msg
```

Create a sandboxed program with no side effects. Good for learning and prototyping.

```elm
element :
    { init : flags -> ( model, Cmd msg )
    , view : model -> VirtualDom.Node msg
    , update : msg -> model -> ( model, Cmd msg )
    , subscriptions : model -> Sub msg
    }
    -> Program flags model msg
```

Create a program with commands and subscriptions.

```elm
document :
    { init : flags -> ( model, Cmd msg )
    , view : model -> Document msg
    , update : msg -> model -> ( model, Cmd msg )
    , subscriptions : model -> Sub msg
    }
    -> Program flags model msg
```

Like `element` but the view returns a `Document`:

```elm
type alias Document msg =
    { title : String
    , body : List (VirtualDom.Node msg)
    }
```

Note: `title` is ignored in LynxJS. It exists for API compatibility with elm/browser.

```elm
application :
    { init : flags -> Url.Url -> Key -> ( model, Cmd msg )
    , view : model -> Document msg
    , update : msg -> model -> ( model, Cmd msg )
    , subscriptions : model -> Sub msg
    , onUrlRequest : UrlRequest -> msg
    , onUrlChange : Url.Url -> msg
    }
    -> Program flags model msg
```

URL-managing application. URL support is stubbed in LynxJS — `init` receives a dummy localhost URL.

```elm
type UrlRequest
    = Internal Url.Url
    | External String
```

### Example

```elm
import Browser
import Lynx exposing (..)
import Lynx.Attributes exposing (..)
import Lynx.Events exposing (..)

main =
    Browser.sandbox
        { init = 0
        , view = view
        , update = update
        }

type Msg = Increment | Decrement

update msg model =
    case msg of
        Increment -> model + 1
        Decrement -> model - 1

view model =
    Lynx.view [ alignItems "center", padding 20 ]
        [ Lynx.view [ onTap Decrement ] [ Lynx.text [] [ textContent "-" ] ]
        , Lynx.text [ fontSize 48 ] [ textContent (String.fromInt model) ]
        , Lynx.view [ onTap Increment ] [ Lynx.text [] [ textContent "+" ] ]
        ]
```

### Lifecycle

1. Virtual DOM tree rendered to native view objects
2. Appended to `globalThis.page` (LynxJS root node)
3. `__FlushElementTree()` called to sync native UI
4. On each update: diff, patch, then flush again

---

## Browser.Dom

```elm
import Browser.Dom
```

**Note:** Most DOM queries are stubbed in LynxJS. Element lookups by ID return `NotFound`.

### Types

```elm
type Error = NotFound String
```

```elm
type alias Viewport =
    { scene : { width : Float, height : Float }
    , viewport : { x : Float, y : Float, width : Float, height : Float }
    }
```

```elm
type alias Element =
    { scene : { width : Float, height : Float }
    , viewport : { x : Float, y : Float, width : Float, height : Float }
    , element : { x : Float, y : Float, width : Float, height : Float }
    }
```

### Focus & Blur

```elm
focus : String -> Task Error ()
blur  : String -> Task Error ()
```

Focus or blur an element by ID. Stubbed in LynxJS.

### Viewport

```elm
getViewport   : Task x Viewport
setViewport   : Float -> Float -> Task x ()
getViewportOf : String -> Task Error Viewport
setViewportOf : String -> Float -> Float -> Task Error ()
```

### Element Queries

```elm
getElement : String -> Task Error Element
```

Get position and size of an element by ID. Stubbed in LynxJS.

---

## Browser.Events

```elm
import Browser.Events
```

**Note:** Global event subscriptions are stubbed in LynxJS. These functions exist for API compatibility but subscriptions won't fire.

### Animation

```elm
onAnimationFrame      : (Time.Posix -> msg) -> Sub msg
onAnimationFrameDelta : (Float -> msg) -> Sub msg
```

Subscribe to animation frames (~60 fps). `onAnimationFrameDelta` provides milliseconds since the last frame.

### Keyboard

```elm
onKeyPress : Json.Decoder msg -> Sub msg
onKeyDown  : Json.Decoder msg -> Sub msg
onKeyUp    : Json.Decoder msg -> Sub msg
```

### Mouse

```elm
onClick     : Json.Decoder msg -> Sub msg
onMouseMove : Json.Decoder msg -> Sub msg
onMouseDown : Json.Decoder msg -> Sub msg
onMouseUp   : Json.Decoder msg -> Sub msg
```

### Window

```elm
onResize           : (Int -> Int -> msg) -> Sub msg
onVisibilityChange : (Visibility -> msg) -> Sub msg
```

```elm
type Visibility = Visible | Hidden
```

---

## Browser.Navigation

```elm
import Browser.Navigation
```

**All functions are no-ops in LynxJS.** They exist for API compatibility with elm/browser.

```elm
type Key
```

Opaque navigation authority. Empty in LynxJS.

```elm
pushUrl    : Key -> String -> Cmd msg
replaceUrl : Key -> String -> Cmd msg
back       : Key -> Int -> Cmd msg
forward    : Key -> Int -> Cmd msg
load       : String -> Cmd msg
reload     : Cmd msg
```

---

## License

BSD-3-Clause

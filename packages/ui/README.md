# lynxjs-elm/ui

LynxJS native UI elements for Elm. Provides typed constructors for native iOS/Android views, layout attributes, and event handlers.

## Setup

Add to your `elm.json`:

```json
{
    "dependencies": {
        "direct": {
            "lynxjs-elm/ui": "1.0.0"
        }
    }
}
```

## Modules

- [`Lynx`](#lynx) — Native element constructors (view, text, image, etc.)
- [`Lynx.Attributes`](#lynxattributes) — Styling, layout, and content attributes
- [`Lynx.Events`](#lynxevents) — Tap, touch, and input event handlers

---

## Lynx

```elm
import Lynx
```

### Types

```elm
type alias Node msg = VirtualDom.Node msg
type alias Attribute msg = VirtualDom.Attribute msg
```

### Elements

```elm
view : List (Attribute msg) -> List (Node msg) -> Node msg
```

Generic container (`<view>`). The primary layout building block.

```elm
text : List (Attribute msg) -> List (Node msg) -> Node msg
```

Text container (`<text>`). Use for styled text that can contain nested text nodes.

```elm
textContent : String -> Node msg
```

Plain text node. Auto-wrapped in a `<text>` element by the kernel.

```elm
image : List (Attribute msg) -> List (Node msg) -> Node msg
```

Image element (`<image>`). Set the source with `Lynx.Attributes.src`.

```elm
scrollView : List (Attribute msg) -> List (Node msg) -> Node msg
```

Scrollable container (`<scroll-view>`). Control direction with `Lynx.Attributes.scrollDirection`.

```elm
list : List (Attribute msg) -> List (Node msg) -> Node msg
```

List element (`<list>`) for efficient rendering of long lists.

```elm
input : List (Attribute msg) -> List (Node msg) -> Node msg
```

Single-line text input.

```elm
textarea : List (Attribute msg) -> List (Node msg) -> Node msg
```

Multi-line text input.

### Example

```elm
import Lynx exposing (..)
import Lynx.Attributes exposing (..)
import Lynx.Events exposing (..)

view []
    [ text [ fontSize 24, color "white" ]
        [ textContent "Hello, LynxJS!" ]
    , image [ src "logo.png", width 100, height 100 ] []
    ]
```

---

## Lynx.Attributes

```elm
import Lynx.Attributes exposing (..)
```

### Layout

```elm
width     : Int -> Attribute msg
height    : Int -> Attribute msg
minWidth  : Int -> Attribute msg
minHeight : Int -> Attribute msg
maxWidth  : Int -> Attribute msg
maxHeight : Int -> Attribute msg
```

All dimensions are in pixels.

### Flexbox

```elm
display        : String -> Attribute msg    -- e.g. "flex", "none"
flexDirection  : String -> Attribute msg    -- "row", "column", "row-reverse", "column-reverse"
flexWrap       : String -> Attribute msg    -- "wrap", "nowrap"
justifyContent : String -> Attribute msg    -- "center", "flex-start", "flex-end", "space-between", "space-around"
alignItems     : String -> Attribute msg    -- "center", "flex-start", "flex-end", "stretch"
alignSelf      : String -> Attribute msg
flex           : Int -> Attribute msg
flexGrow       : Int -> Attribute msg
flexShrink     : Int -> Attribute msg
```

### Spacing

```elm
padding       : Int -> Attribute msg
paddingTop    : Int -> Attribute msg
paddingRight  : Int -> Attribute msg
paddingBottom : Int -> Attribute msg
paddingLeft   : Int -> Attribute msg
margin        : Int -> Attribute msg
marginTop     : Int -> Attribute msg
marginRight   : Int -> Attribute msg
marginBottom  : Int -> Attribute msg
marginLeft    : Int -> Attribute msg
```

All values in pixels.

### Positioning

```elm
position : String -> Attribute msg    -- "relative", "absolute", "fixed"
top      : Int -> Attribute msg
right    : Int -> Attribute msg
bottom   : Int -> Attribute msg
left     : Int -> Attribute msg
zIndex   : Int -> Attribute msg
```

### Appearance

```elm
backgroundColor : String -> Attribute msg    -- e.g. "#ff0000", "red"
opacity         : Float -> Attribute msg     -- 0.0 to 1.0
overflow        : String -> Attribute msg    -- "hidden", "visible", "scroll"
```

### Borders

```elm
borderWidth  : Int -> Attribute msg
borderColor  : String -> Attribute msg
borderRadius : Int -> Attribute msg
```

### Typography

```elm
fontSize     : Int -> Attribute msg
fontWeight   : String -> Attribute msg    -- "bold", "normal", "100"–"900"
fontFamily   : String -> Attribute msg
color        : String -> Attribute msg
textAlign    : String -> Attribute msg    -- "center", "left", "right"
lineHeight   : Int -> Attribute msg
textOverflow : String -> Attribute msg    -- "ellipsis", "clip"
```

### Content

```elm
src             : String -> Attribute msg    -- image URL
placeholder     : String -> Attribute msg    -- input placeholder text
value           : String -> Attribute msg    -- input value
scrollDirection : String -> Attribute msg    -- "vertical", "horizontal"
```

### Identity

```elm
id     : String -> Attribute msg
class_ : String -> Attribute msg
```

---

## Lynx.Events

```elm
import Lynx.Events exposing (..)
```

### Tap Events

```elm
onTap : msg -> Attribute msg
```

Fires when the element is tapped.

```elm
onLongpress : msg -> Attribute msg
```

Fires on a long press.

### Touch Events

```elm
onTouchStart  : msg -> Attribute msg
onTouchMove   : msg -> Attribute msg
onTouchEnd    : msg -> Attribute msg
onTouchCancel : msg -> Attribute msg
```

### Input Events

```elm
onInput : (String -> msg) -> Attribute msg
```

Fires when an input's value changes. The callback receives the new value (extracted from `event.detail.value`).

### Example

```elm
import Lynx exposing (..)
import Lynx.Attributes exposing (..)
import Lynx.Events exposing (..)

view [ onTap Increment, backgroundColor "#4CAF50", padding 16 ]
    [ text [ fontSize 20, color "white" ]
        [ textContent "+1" ]
    ]
```

---

## License

BSD-3-Clause

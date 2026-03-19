module Lynx exposing
    ( view, text, textContent, image, scrollView, list, input, textarea
    , Attribute, Node
    )

{-| LynxJS native UI elements.

# Elements
@docs view, text, textContent, image, scrollView, list, input, textarea

# Types
@docs Attribute, Node

-}

import VirtualDom


{-| Alias for `VirtualDom.Node`.
-}
type alias Node msg =
    VirtualDom.Node msg


{-| Alias for `VirtualDom.Attribute`.
-}
type alias Attribute msg =
    VirtualDom.Attribute msg


{-| A generic container element, equivalent to `<view>` in LynxJS.
This is the primary layout building block.

    view [ Lynx.Attributes.flexDirection "row" ]
        [ text [] [ textContent "Hello" ]
        ]
-}
view : List (Attribute msg) -> List (Node msg) -> Node msg
view =
    VirtualDom.node "view"


{-| A text container element, equivalent to `<text>` in LynxJS.
Use this when you need to apply styles or attributes to text.

    text [ Lynx.Attributes.fontSize "18px" ]
        [ textContent "Styled text" ]
-}
text : List (Attribute msg) -> List (Node msg) -> Node msg
text =
    VirtualDom.node "text"


{-| Create a plain text node. In LynxJS, this is auto-wrapped in a `<text>`
element by the kernel.

    textContent "Hello World!"
-}
textContent : String -> Node msg
textContent =
    VirtualDom.text


{-| An image element, equivalent to `<image>` in LynxJS.

    image [ Lynx.Attributes.src "https://example.com/photo.jpg" ] []
-}
image : List (Attribute msg) -> List (Node msg) -> Node msg
image =
    VirtualDom.node "image"


{-| A scrollable container, equivalent to `<scroll-view>` in LynxJS.

    scrollView [ Lynx.Attributes.scrollDirection "vertical" ]
        [ view [] [ textContent "Item 1" ]
        , view [] [ textContent "Item 2" ]
        ]
-}
scrollView : List (Attribute msg) -> List (Node msg) -> Node msg
scrollView =
    VirtualDom.node "scroll-view"


{-| A list element for efficient rendering of long lists.
Equivalent to `<list>` in LynxJS.
-}
list : List (Attribute msg) -> List (Node msg) -> Node msg
list =
    VirtualDom.node "list"


{-| A text input element.
-}
input : List (Attribute msg) -> List (Node msg) -> Node msg
input =
    VirtualDom.node "input"


{-| A multi-line text input element.
-}
textarea : List (Attribute msg) -> List (Node msg) -> Node msg
textarea =
    VirtualDom.node "textarea"

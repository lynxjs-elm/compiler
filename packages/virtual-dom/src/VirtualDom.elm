module VirtualDom exposing
  ( Node
  , text, node, nodeNS
  , Attribute, style, property, attribute, attributeNS
  , on, Handler(..)
  , map, mapAttribute
  , keyedNode, keyedNodeNS
  , lazy, lazy2, lazy3, lazy4, lazy5, lazy6, lazy7, lazy8
  )

{-| API to the core diffing algorithm. Adapted for LynxJS native rendering.

# Create
@docs Node, text, node, nodeNS

# Attributes
@docs Attribute, style, property, attribute, attributeNS

# Events
@docs on, Handler

# Routing Messages
@docs map, mapAttribute

# Keyed Nodes
@docs keyedNode, keyedNodeNS

# Lazy Nodes
@docs lazy, lazy2, lazy3, lazy4, lazy5, lazy6, lazy7, lazy8

-}

import Elm.Kernel.VirtualDom
import Json.Decode as Json


{-| An immutable chunk of data representing a native UI element.
-}
type Node msg = Node


{-| Create a native element with a tag name, a list of attributes/properties
including styles and event listeners, and a list of child nodes.

    import Json.Encode as Json

    hello : Node msg
    hello =
      node "view" [] [ text "Hello!" ]
-}
node : String -> List (Attribute msg) -> List (Node msg) -> Node msg
node tag =
  Elm.Kernel.VirtualDom.node (Elm.Kernel.VirtualDom.noScript tag)


{-| Create a namespaced element. In LynxJS, namespaces are ignored —
this behaves identically to `node`.
-}
nodeNS : String -> String -> List (Attribute msg) -> List (Node msg) -> Node msg
nodeNS namespace tag =
  Elm.Kernel.VirtualDom.nodeNS namespace (Elm.Kernel.VirtualDom.noScript tag)


{-| Just put plain text in the UI. In LynxJS, this is auto-wrapped in a
`<text>` element by the kernel.

    text "Hello World!"
-}
text : String -> Node msg
text =
  Elm.Kernel.VirtualDom.text


{-| Transform the messages produced by a subtree.
-}
map : (a -> msg) -> Node a -> Node msg
map =
  Elm.Kernel.VirtualDom.map



-- ATTRIBUTES


{-| Represents an attribute, property, style, or event on an element.
-}
type Attribute msg = Attribute


{-| Specify a style.

    greeting : Node msg
    greeting =
      node "view"
        [ style "backgroundColor" "red"
        , style "height" "90px"
        , style "width" "100%"
        ]
        [ text "Hello!"
        ]

-}
style : String -> String -> Attribute msg
style =
  Elm.Kernel.VirtualDom.style


{-| Create a property.

    import Json.Encode as Encode

    buttonLabel : Node msg
    buttonLabel =
      node "view" [ property "id" (Encode.string "myView") ] [ text "Label" ]
-}
property : String -> Json.Value -> Attribute msg
property key value =
  Elm.Kernel.VirtualDom.property
    (Elm.Kernel.VirtualDom.noInnerHtmlOrFormAction key)
    (Elm.Kernel.VirtualDom.noJavaScriptOrHtmlJson value)


{-| Create an attribute. Sets the attribute on the native element.

    myView : Node msg
    myView =
      node "view" [ attribute "id" "main" ] [ text "Hello" ]
-}
attribute : String -> String -> Attribute msg
attribute key value =
  Elm.Kernel.VirtualDom.attribute
    (Elm.Kernel.VirtualDom.noOnOrFormAction key)
    (Elm.Kernel.VirtualDom.noJavaScriptOrHtmlUri value)


{-| Create a namespaced attribute. In LynxJS, the namespace is ignored —
this behaves identically to `attribute`.
-}
attributeNS : String -> String -> String -> Attribute msg
attributeNS namespace key value =
  Elm.Kernel.VirtualDom.attributeNS
    namespace
    (Elm.Kernel.VirtualDom.noOnOrFormAction key)
    (Elm.Kernel.VirtualDom.noJavaScriptOrHtmlUri value)


{-| Transform the messages produced by an `Attribute`.
-}
mapAttribute : (a -> b) -> Attribute a -> Attribute b
mapAttribute =
  Elm.Kernel.VirtualDom.mapAttribute



-- EVENTS


{-| Create custom event handlers.

    import Json.Decode as Decode

    onTap : msg -> Attribute msg
    onTap msg =
      on "tap" (Normal (Decode.succeed msg))
-}
on : String -> Handler msg -> Attribute msg
on =
  Elm.Kernel.VirtualDom.on


{-| When using `on` you can customize the event behavior:

  - `Normal` — standard event handling
  - `MayStopPropagation` — in LynxJS, uses `catch` prefix to stop propagation
  - `MayPreventDefault` — not applicable in LynxJS, treated as Normal
  - `Custom` — maps `stopPropagation` to `catch` prefix
-}
type Handler msg
  = Normal (Json.Decoder msg)
  | MayStopPropagation (Json.Decoder (msg, Bool))
  | MayPreventDefault (Json.Decoder (msg, Bool))
  | Custom (Json.Decoder { message : msg, stopPropagation : Bool, preventDefault : Bool })



-- LAZY NODES


{-| A performance optimization that delays the building of virtual DOM nodes.
-}
lazy : (a -> Node msg) -> a -> Node msg
lazy =
  Elm.Kernel.VirtualDom.lazy


{-| Same as `lazy` but checks on two arguments.
-}
lazy2 : (a -> b -> Node msg) -> a -> b -> Node msg
lazy2 =
  Elm.Kernel.VirtualDom.lazy2


{-| Same as `lazy` but checks on three arguments.
-}
lazy3 : (a -> b -> c -> Node msg) -> a -> b -> c -> Node msg
lazy3 =
  Elm.Kernel.VirtualDom.lazy3


{-| Same as `lazy` but checks on four arguments.
-}
lazy4 : (a -> b -> c -> d -> Node msg) -> a -> b -> c -> d -> Node msg
lazy4 =
  Elm.Kernel.VirtualDom.lazy4


{-| Same as `lazy` but checks on five arguments.
-}
lazy5 : (a -> b -> c -> d -> e -> Node msg) -> a -> b -> c -> d -> e -> Node msg
lazy5 =
  Elm.Kernel.VirtualDom.lazy5


{-| Same as `lazy` but checks on six arguments.
-}
lazy6 : (a -> b -> c -> d -> e -> f -> Node msg) -> a -> b -> c -> d -> e -> f -> Node msg
lazy6 =
  Elm.Kernel.VirtualDom.lazy6


{-| Same as `lazy` but checks on seven arguments.
-}
lazy7 : (a -> b -> c -> d -> e -> f -> g -> Node msg) -> a -> b -> c -> d -> e -> f -> g -> Node msg
lazy7 =
  Elm.Kernel.VirtualDom.lazy7


{-| Same as `lazy` but checks on eight arguments.
-}
lazy8 : (a -> b -> c -> d -> e -> f -> g -> h -> Node msg) -> a -> b -> c -> d -> e -> f -> g -> h -> Node msg
lazy8 =
  Elm.Kernel.VirtualDom.lazy8



-- KEYED NODES


{-| Works just like `node`, but you add a unique identifier to each child
node.
-}
keyedNode : String -> List (Attribute msg) -> List ( String, Node msg ) -> Node msg
keyedNode tag =
  Elm.Kernel.VirtualDom.keyedNode (Elm.Kernel.VirtualDom.noScript tag)


{-| Create a keyed and namespaced node. In LynxJS, the namespace is ignored.
-}
keyedNodeNS : String -> String -> List (Attribute msg) -> List ( String, Node msg ) -> Node msg
keyedNodeNS namespace tag =
  Elm.Kernel.VirtualDom.keyedNodeNS namespace (Elm.Kernel.VirtualDom.noScript tag)



-- FOR INTERNAL USE ONLY


toHandlerInt : Handler msg -> Int
toHandlerInt handler =
  case handler of
    Normal _ -> 0
    MayStopPropagation _ -> 1
    MayPreventDefault _ -> 2
    Custom _ -> 3

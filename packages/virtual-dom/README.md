# lynxjs-elm/virtual-dom

Virtual DOM implementation for Elm on LynxJS. Replaces browser DOM calls with LynxJS PAPI (Platform API) calls for native iOS/Android rendering.

This is a low-level package. Most apps should use [`lynxjs-elm/ui`](../ui) instead, which provides typed element constructors built on top of this package.

## Setup

This package is an indirect dependency — you don't need to add it manually. It's pulled in by `lynxjs-elm/ui` and `lynxjs-elm/browser`.

## Module: VirtualDom

```elm
import VirtualDom
```

### Types

```elm
type Node msg
type Attribute msg
```

Both are opaque. `Node` represents a native UI element. `Attribute` represents a style, property, attribute, or event handler.

### Node Creation

```elm
node : String -> List (Attribute msg) -> List (Node msg) -> Node msg
```

Create a native element with a tag name, attributes, and children.

```elm
text : String -> Node msg
```

Plain text node. Auto-wrapped in a `<text>` element by the kernel.

```elm
nodeNS : String -> String -> List (Attribute msg) -> List (Node msg) -> Node msg
```

Namespaced node. The namespace is ignored in LynxJS — behaves like `node`.

### Attributes

```elm
style : String -> String -> Attribute msg
```

Inline style. Example: `style "backgroundColor" "red"`.

```elm
property : String -> Json.Value -> Attribute msg
```

JSON property. Includes XSS protection (blocks innerHTML).

```elm
attribute : String -> String -> Attribute msg
```

String attribute. Includes XSS protection (blocks `on*` and form actions).

```elm
attributeNS : String -> String -> String -> Attribute msg
```

Namespaced attribute. Namespace is ignored in LynxJS.

### Event Handling

```elm
on : String -> Handler msg -> Attribute msg
```

Attach an event listener. Event names are mapped to LynxJS equivalents at the kernel level:

| Elm event | LynxJS event |
|---|---|
| `click` | `tap` |
| `dblclick` | `tap` |
| `mousedown` | `touchstart` |
| `mousemove` | `touchmove` |
| `mouseup` | `touchend` |

```elm
type Handler msg
    = Normal (Json.Decoder msg)
    | MayStopPropagation (Json.Decoder ( msg, Bool ))
    | MayPreventDefault (Json.Decoder ( msg, Bool ))
    | Custom (Json.Decoder { message : msg, stopPropagation : Bool, preventDefault : Bool })
```

- `Normal` — standard event handling (`bind` prefix)
- `MayStopPropagation` — uses `catch` prefix to stop propagation in LynxJS
- `MayPreventDefault` — not applicable in LynxJS (treated as Normal)
- `Custom` — maps `stopPropagation` to `catch` prefix

### Message Routing

```elm
map : (a -> msg) -> Node a -> Node msg
```

Transform messages produced by a subtree.

```elm
mapAttribute : (a -> b) -> Attribute a -> Attribute b
```

Transform messages in an attribute.

### Keyed Nodes

```elm
keyedNode : String -> List (Attribute msg) -> List ( String, Node msg ) -> Node msg
```

Like `node` but each child has a unique string key. Enables efficient reordering, insertion, and removal.

```elm
keyedNodeNS : String -> String -> List (Attribute msg) -> List ( String, Node msg ) -> Node msg
```

### Lazy Evaluation

```elm
lazy  : (a -> Node msg) -> a -> Node msg
lazy2 : (a -> b -> Node msg) -> a -> b -> Node msg
lazy3 : (a -> b -> c -> Node msg) -> a -> b -> c -> Node msg
```

Delay node building. The view function is only called if the arguments have changed (by reference equality). Variants up to `lazy8` are available.

---

## License

BSD-3-Clause

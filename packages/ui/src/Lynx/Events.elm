module Lynx.Events exposing
    ( onTap, onLongpress
    , onTouchStart, onTouchMove, onTouchEnd, onTouchCancel
    , onInput
    )

{-| Event handlers for LynxJS elements.

# Tap Events
@docs onTap, onLongpress

# Touch Events
@docs onTouchStart, onTouchMove, onTouchEnd, onTouchCancel

# Input Events
@docs onInput

-}

import Json.Decode as Decode
import VirtualDom



-- TAP EVENTS


{-| Detect taps on an element.

    view [ onTap MyTapMsg ] [ text [] [ textContent "Tap me" ] ]
-}
onTap : msg -> VirtualDom.Attribute msg
onTap msg =
    VirtualDom.on "tap" (VirtualDom.Normal (Decode.succeed msg))


{-| Detect long presses on an element.
-}
onLongpress : msg -> VirtualDom.Attribute msg
onLongpress msg =
    VirtualDom.on "longpress" (VirtualDom.Normal (Decode.succeed msg))



-- TOUCH EVENTS


{-| -}
onTouchStart : msg -> VirtualDom.Attribute msg
onTouchStart msg =
    VirtualDom.on "touchstart" (VirtualDom.Normal (Decode.succeed msg))


{-| -}
onTouchMove : msg -> VirtualDom.Attribute msg
onTouchMove msg =
    VirtualDom.on "touchmove" (VirtualDom.Normal (Decode.succeed msg))


{-| -}
onTouchEnd : msg -> VirtualDom.Attribute msg
onTouchEnd msg =
    VirtualDom.on "touchend" (VirtualDom.Normal (Decode.succeed msg))


{-| -}
onTouchCancel : msg -> VirtualDom.Attribute msg
onTouchCancel msg =
    VirtualDom.on "touchcancel" (VirtualDom.Normal (Decode.succeed msg))



-- INPUT EVENTS


{-| Detect changes to an input element's value.

    input [ onInput NewValue, value model.text ] []
-}
onInput : (String -> msg) -> VirtualDom.Attribute msg
onInput tagger =
    VirtualDom.on "input"
        (VirtualDom.Normal (Decode.map tagger (Decode.at [ "detail", "value" ] Decode.string)))

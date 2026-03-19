module Lynx.Attributes exposing
    ( width, height, minWidth, minHeight, maxWidth, maxHeight
    , display, flexDirection, flexWrap, justifyContent, alignItems, alignSelf, flex, flexGrow, flexShrink
    , padding, paddingTop, paddingRight, paddingBottom, paddingLeft
    , margin, marginTop, marginRight, marginBottom, marginLeft
    , position, top, right, bottom, left, zIndex
    , backgroundColor, opacity, overflow
    , borderWidth, borderColor, borderRadius
    , fontSize, fontWeight, fontFamily, color, textAlign, lineHeight, textOverflow
    , src, placeholder, value
    , scrollDirection
    , id, class_
    )

{-| Attributes and styles for LynxJS elements.

# Layout
@docs width, height, minWidth, minHeight, maxWidth, maxHeight
@docs display, flexDirection, flexWrap, justifyContent, alignItems, alignSelf, flex, flexGrow, flexShrink

# Spacing
@docs padding, paddingTop, paddingRight, paddingBottom, paddingLeft
@docs margin, marginTop, marginRight, marginBottom, marginLeft

# Positioning
@docs position, top, right, bottom, left, zIndex

# Appearance
@docs backgroundColor, opacity, overflow

# Borders
@docs borderWidth, borderColor, borderRadius

# Typography
@docs fontSize, fontWeight, fontFamily, color, textAlign, lineHeight, textOverflow

# Content
@docs src, placeholder, value

# Scrolling
@docs scrollDirection

# Identity
@docs id, class_

-}

import Json.Encode as Encode
import VirtualDom



-- HELPERS


style : String -> String -> VirtualDom.Attribute msg
style =
    VirtualDom.style


intStyle : String -> Int -> VirtualDom.Attribute msg
intStyle key val =
    VirtualDom.style key (String.fromInt val)


pxStyle : String -> Int -> VirtualDom.Attribute msg
pxStyle key val =
    VirtualDom.style key (String.fromInt val ++ "px")


floatStyle : String -> Float -> VirtualDom.Attribute msg
floatStyle key val =
    VirtualDom.style key (String.fromFloat val)


attr : String -> String -> VirtualDom.Attribute msg
attr =
    VirtualDom.attribute


prop : String -> String -> VirtualDom.Attribute msg
prop key val =
    VirtualDom.property key (Encode.string val)



-- LAYOUT


{-| -}
width : Int -> VirtualDom.Attribute msg
width =
    pxStyle "width"


{-| -}
height : Int -> VirtualDom.Attribute msg
height =
    pxStyle "height"


{-| -}
minWidth : Int -> VirtualDom.Attribute msg
minWidth =
    pxStyle "minWidth"


{-| -}
minHeight : Int -> VirtualDom.Attribute msg
minHeight =
    pxStyle "minHeight"


{-| -}
maxWidth : Int -> VirtualDom.Attribute msg
maxWidth =
    pxStyle "maxWidth"


{-| -}
maxHeight : Int -> VirtualDom.Attribute msg
maxHeight =
    pxStyle "maxHeight"


{-| -}
display : String -> VirtualDom.Attribute msg
display =
    style "display"


{-| -}
flexDirection : String -> VirtualDom.Attribute msg
flexDirection =
    style "flexDirection"


{-| -}
flexWrap : String -> VirtualDom.Attribute msg
flexWrap =
    style "flexWrap"


{-| -}
justifyContent : String -> VirtualDom.Attribute msg
justifyContent =
    style "justifyContent"


{-| -}
alignItems : String -> VirtualDom.Attribute msg
alignItems =
    style "alignItems"


{-| -}
alignSelf : String -> VirtualDom.Attribute msg
alignSelf =
    style "alignSelf"


{-| -}
flex : Int -> VirtualDom.Attribute msg
flex =
    intStyle "flex"


{-| -}
flexGrow : Int -> VirtualDom.Attribute msg
flexGrow =
    intStyle "flexGrow"


{-| -}
flexShrink : Int -> VirtualDom.Attribute msg
flexShrink =
    intStyle "flexShrink"



-- SPACING


{-| -}
padding : Int -> VirtualDom.Attribute msg
padding =
    pxStyle "padding"


{-| -}
paddingTop : Int -> VirtualDom.Attribute msg
paddingTop =
    pxStyle "paddingTop"


{-| -}
paddingRight : Int -> VirtualDom.Attribute msg
paddingRight =
    pxStyle "paddingRight"


{-| -}
paddingBottom : Int -> VirtualDom.Attribute msg
paddingBottom =
    pxStyle "paddingBottom"


{-| -}
paddingLeft : Int -> VirtualDom.Attribute msg
paddingLeft =
    pxStyle "paddingLeft"


{-| -}
margin : Int -> VirtualDom.Attribute msg
margin =
    pxStyle "margin"


{-| -}
marginTop : Int -> VirtualDom.Attribute msg
marginTop =
    pxStyle "marginTop"


{-| -}
marginRight : Int -> VirtualDom.Attribute msg
marginRight =
    pxStyle "marginRight"


{-| -}
marginBottom : Int -> VirtualDom.Attribute msg
marginBottom =
    pxStyle "marginBottom"


{-| -}
marginLeft : Int -> VirtualDom.Attribute msg
marginLeft =
    pxStyle "marginLeft"



-- POSITIONING


{-| -}
position : String -> VirtualDom.Attribute msg
position =
    style "position"


{-| -}
top : Int -> VirtualDom.Attribute msg
top =
    pxStyle "top"


{-| -}
right : Int -> VirtualDom.Attribute msg
right =
    pxStyle "right"


{-| -}
bottom : Int -> VirtualDom.Attribute msg
bottom =
    pxStyle "bottom"


{-| -}
left : Int -> VirtualDom.Attribute msg
left =
    pxStyle "left"


{-| -}
zIndex : Int -> VirtualDom.Attribute msg
zIndex =
    intStyle "zIndex"



-- APPEARANCE


{-| -}
backgroundColor : String -> VirtualDom.Attribute msg
backgroundColor =
    style "backgroundColor"


{-| -}
opacity : Float -> VirtualDom.Attribute msg
opacity =
    floatStyle "opacity"


{-| -}
overflow : String -> VirtualDom.Attribute msg
overflow =
    style "overflow"



-- BORDERS


{-| -}
borderWidth : Int -> VirtualDom.Attribute msg
borderWidth =
    pxStyle "borderWidth"


{-| -}
borderColor : String -> VirtualDom.Attribute msg
borderColor =
    style "borderColor"


{-| -}
borderRadius : Int -> VirtualDom.Attribute msg
borderRadius =
    pxStyle "borderRadius"



-- TYPOGRAPHY


{-| -}
fontSize : Int -> VirtualDom.Attribute msg
fontSize =
    pxStyle "fontSize"


{-| -}
fontWeight : String -> VirtualDom.Attribute msg
fontWeight =
    style "fontWeight"


{-| -}
fontFamily : String -> VirtualDom.Attribute msg
fontFamily =
    style "fontFamily"


{-| -}
color : String -> VirtualDom.Attribute msg
color =
    style "color"


{-| -}
textAlign : String -> VirtualDom.Attribute msg
textAlign =
    style "textAlign"


{-| -}
lineHeight : Int -> VirtualDom.Attribute msg
lineHeight =
    pxStyle "lineHeight"


{-| -}
textOverflow : String -> VirtualDom.Attribute msg
textOverflow =
    style "textOverflow"



-- CONTENT


{-| Image source URL.
-}
src : String -> VirtualDom.Attribute msg
src =
    attr "src"


{-| Placeholder text for input elements.
-}
placeholder : String -> VirtualDom.Attribute msg
placeholder =
    attr "placeholder"


{-| Value for input elements.
-}
value : String -> VirtualDom.Attribute msg
value =
    attr "value"



-- SCROLLING


{-| Scroll direction for scroll-view: "vertical" or "horizontal".
-}
scrollDirection : String -> VirtualDom.Attribute msg
scrollDirection =
    attr "scroll-direction"



-- IDENTITY


{-| Set an id on the element.
-}
id : String -> VirtualDom.Attribute msg
id =
    attr "id"


{-| Set a class on the element.
-}
class_ : String -> VirtualDom.Attribute msg
class_ =
    attr "class"

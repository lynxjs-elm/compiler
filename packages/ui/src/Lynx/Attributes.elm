module Lynx.Attributes exposing
    ( width, height, minWidth, minHeight, maxWidth, maxHeight
    , Display(..), display
    , FlexDirection(..), flexDirection
    , FlexWrap(..), flexWrap
    , Alignment(..), justifyContent, alignItems, alignSelf
    , flex, flexGrow, flexShrink
    , padding, paddingTop, paddingRight, paddingBottom, paddingLeft
    , margin, marginTop, marginRight, marginBottom, marginLeft
    , Position(..), position, top, right, bottom, left, zIndex
    , backgroundColor, opacity
    , Overflow(..), overflow
    , borderWidth, borderColor, borderRadius
    , fontSize
    , FontWeight(..), fontWeight
    , fontFamily, color
    , TextAlign(..), textAlign
    , lineHeight
    , TextOverflow(..), textOverflow
    , src, placeholder, value
    , ScrollDirection(..), scrollDirection
    , id, class_
    )

{-| Attributes and styles for LynxJS elements.

# Layout
@docs width, height, minWidth, minHeight, maxWidth, maxHeight
@docs Display, display
@docs FlexDirection, flexDirection
@docs FlexWrap, flexWrap
@docs Alignment, justifyContent, alignItems, alignSelf
@docs flex, flexGrow, flexShrink

# Spacing
@docs padding, paddingTop, paddingRight, paddingBottom, paddingLeft
@docs margin, marginTop, marginRight, marginBottom, marginLeft

# Positioning
@docs Position, position, top, right, bottom, left, zIndex

# Appearance
@docs backgroundColor, opacity
@docs Overflow, overflow

# Borders
@docs borderWidth, borderColor, borderRadius

# Typography
@docs fontSize
@docs FontWeight, fontWeight
@docs fontFamily, color
@docs TextAlign, textAlign
@docs lineHeight
@docs TextOverflow, textOverflow

# Content
@docs src, placeholder, value

# Scrolling
@docs ScrollDirection, scrollDirection

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
type Display
    = Flex
    | DisplayNone


{-| -}
display : Display -> VirtualDom.Attribute msg
display d =
    style "display" <|
        case d of
            Flex -> "flex"
            DisplayNone -> "none"


{-| -}
type FlexDirection
    = Row
    | Column
    | RowReverse
    | ColumnReverse


{-| -}
flexDirection : FlexDirection -> VirtualDom.Attribute msg
flexDirection d =
    style "flexDirection" <|
        case d of
            Row -> "row"
            Column -> "column"
            RowReverse -> "row-reverse"
            ColumnReverse -> "column-reverse"


{-| -}
type FlexWrap
    = Wrap
    | NoWrap
    | WrapReverse


{-| -}
flexWrap : FlexWrap -> VirtualDom.Attribute msg
flexWrap w =
    style "flexWrap" <|
        case w of
            Wrap -> "wrap"
            NoWrap -> "nowrap"
            WrapReverse -> "wrap-reverse"


{-| Alignment values for `justifyContent`, `alignItems`, and `alignSelf`.

Not all values are valid for all properties — `SpaceBetween`, `SpaceAround`,
and `SpaceEvenly` only apply to `justifyContent`, while `Stretch` and `Baseline`
only apply to `alignItems` and `alignSelf`.
-}
type Alignment
    = Start
    | Center
    | End
    | SpaceBetween
    | SpaceAround
    | SpaceEvenly
    | Stretch
    | Baseline


alignmentToString : Alignment -> String
alignmentToString a =
    case a of
        Start -> "flex-start"
        Center -> "center"
        End -> "flex-end"
        SpaceBetween -> "space-between"
        SpaceAround -> "space-around"
        SpaceEvenly -> "space-evenly"
        Stretch -> "stretch"
        Baseline -> "baseline"


{-| -}
justifyContent : Alignment -> VirtualDom.Attribute msg
justifyContent a =
    style "justifyContent" (alignmentToString a)


{-| -}
alignItems : Alignment -> VirtualDom.Attribute msg
alignItems a =
    style "alignItems" (alignmentToString a)


{-| -}
alignSelf : Alignment -> VirtualDom.Attribute msg
alignSelf a =
    style "alignSelf" (alignmentToString a)


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
type Position
    = Relative
    | Absolute


{-| -}
position : Position -> VirtualDom.Attribute msg
position p =
    style "position" <|
        case p of
            Relative -> "relative"
            Absolute -> "absolute"


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
type Overflow
    = Visible
    | Hidden
    | Scroll


{-| -}
overflow : Overflow -> VirtualDom.Attribute msg
overflow o =
    style "overflow" <|
        case o of
            Visible -> "visible"
            Hidden -> "hidden"
            Scroll -> "scroll"



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
type FontWeight
    = Normal
    | Bold


{-| -}
fontWeight : FontWeight -> VirtualDom.Attribute msg
fontWeight w =
    style "fontWeight" <|
        case w of
            Normal -> "normal"
            Bold -> "bold"


{-| -}
fontFamily : String -> VirtualDom.Attribute msg
fontFamily =
    style "fontFamily"


{-| -}
color : String -> VirtualDom.Attribute msg
color =
    style "color"


{-| -}
type TextAlign
    = Left
    | Right
    | TextCenter
    | Justify


{-| -}
textAlign : TextAlign -> VirtualDom.Attribute msg
textAlign a =
    style "textAlign" <|
        case a of
            Left -> "left"
            Right -> "right"
            TextCenter -> "center"
            Justify -> "justify"


{-| -}
lineHeight : Int -> VirtualDom.Attribute msg
lineHeight =
    pxStyle "lineHeight"


{-| -}
type TextOverflow
    = Clip
    | Ellipsis


{-| -}
textOverflow : TextOverflow -> VirtualDom.Attribute msg
textOverflow o =
    style "textOverflow" <|
        case o of
            Clip -> "clip"
            Ellipsis -> "ellipsis"



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


{-| -}
type ScrollDirection
    = Vertical
    | Horizontal


{-| Scroll direction for scroll-view.
-}
scrollDirection : ScrollDirection -> VirtualDom.Attribute msg
scrollDirection d =
    attr "scroll-direction" <|
        case d of
            Vertical -> "vertical"
            Horizontal -> "horizontal"



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

module Main exposing (main)

{-| Phase 2-4 verification: TEA with events.
Counter app with increment/decrement via tap events.
-}

import Browser
import Lynx
import Lynx.Attributes as Attr exposing (Alignment(..), FlexDirection(..))
import Lynx.Events exposing (onTap)
import VirtualDom exposing (Node)



-- MAIN


main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }



-- MODEL


type alias Model =
    { count : Int
    }


init : Model
init =
    { count = 0
    }



-- UPDATE


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



-- VIEW


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

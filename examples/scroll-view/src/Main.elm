module Main exposing (main)

{-| Scroll view with a long list of styled items.
Demonstrates scrollView, list rendering, and layout patterns.
-}

import Browser
import Lynx
import Lynx.Attributes as Attr
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
    { selected : Maybe Int
    }


init : Model
init =
    { selected = Nothing
    }


colors : List String
colors =
    [ "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"
    , "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9"
    , "#F0B27A", "#82E0AA", "#F1948A", "#85929E", "#D7BDE2"
    , "#A3E4D7", "#FAD7A0", "#AED6F1", "#D5DBDB", "#EDBB99"
    ]



-- UPDATE


type Msg
    = Select Int


update : Msg -> Model -> Model
update msg model =
    case msg of
        Select idx ->
            { model
                | selected =
                    if model.selected == Just idx then
                        Nothing
                    else
                        Just idx
            }



-- VIEW


view : Model -> Node Msg
view model =
    Lynx.view
        [ Attr.flexDirection "column"
        , Attr.flex 1
        ]
        [ -- Header
          Lynx.view
            [ Attr.backgroundColor "#2C3E50"
            , Attr.paddingTop 16
            , Attr.paddingBottom 16
            , Attr.paddingLeft 20
            , Attr.paddingRight 20
            ]
            [ Lynx.text
                [ Attr.fontSize 22
                , Attr.fontWeight "bold"
                , Attr.color "#ffffff"
                ]
                [ Lynx.textContent "Color Palette" ]
            , Lynx.text
                [ Attr.fontSize 14
                , Attr.color "#95A5A6"
                , Attr.marginTop 4
                ]
                [ Lynx.textContent "Tap a color to select it" ]
            ]

        -- Scrollable content
        , Lynx.scrollView
            [ Attr.flex 1
            , Attr.scrollDirection "vertical"
            , Attr.padding 12
            ]
            (List.indexedMap (viewCard model.selected) colors)

        -- Footer showing selection
        , Lynx.view
            [ Attr.backgroundColor "#34495E"
            , Attr.paddingTop 12
            , Attr.paddingBottom 12
            , Attr.paddingLeft 20
            , Attr.paddingRight 20
            , Attr.flexDirection "row"
            , Attr.alignItems "center"
            ]
            [ case model.selected of
                Nothing ->
                    Lynx.text [ Attr.color "#95A5A6", Attr.fontSize 14 ]
                        [ Lynx.textContent "No color selected" ]

                Just idx ->
                    let
                        colorHex =
                            List.drop idx colors
                                |> List.head
                                |> Maybe.withDefault "#000000"
                    in
                    Lynx.view
                        [ Attr.flexDirection "row"
                        , Attr.alignItems "center"
                        ]
                        [ Lynx.view
                            [ Attr.width 20
                            , Attr.height 20
                            , Attr.borderRadius 10
                            , Attr.backgroundColor colorHex
                            , Attr.marginRight 8
                            ]
                            []
                        , Lynx.text [ Attr.color "#ffffff", Attr.fontSize 14 ]
                            [ Lynx.textContent ("Selected: " ++ colorHex) ]
                        ]
            ]
        ]


viewCard : Maybe Int -> Int -> String -> Node Msg
viewCard selected idx colorHex =
    let
        isSelected =
            selected == Just idx
    in
    Lynx.view
        [ onTap (Select idx)
        , Attr.flexDirection "row"
        , Attr.alignItems "center"
        , Attr.marginBottom 8
        , Attr.borderRadius 12
        , Attr.backgroundColor "#ffffff"
        , Attr.borderWidth (if isSelected then 2 else 0)
        , Attr.borderColor colorHex
        , Attr.paddingTop 14
        , Attr.paddingBottom 14
        , Attr.paddingLeft 16
        , Attr.paddingRight 16
        ]
        [ -- Color swatch
          Lynx.view
            [ Attr.width 48
            , Attr.height 48
            , Attr.borderRadius 12
            , Attr.backgroundColor colorHex
            , Attr.marginRight 16
            ]
            []

        -- Info
        , Lynx.view [ Attr.flex 1 ]
            [ Lynx.text
                [ Attr.fontSize 16
                , Attr.fontWeight "bold"
                , Attr.color "#2C3E50"
                ]
                [ Lynx.textContent ("Color #" ++ String.fromInt (idx + 1)) ]
            , Lynx.text
                [ Attr.fontSize 13
                , Attr.color "#7F8C8D"
                , Attr.marginTop 2
                ]
                [ Lynx.textContent colorHex ]
            ]

        -- Selection indicator
        , if isSelected then
            Lynx.text [ Attr.fontSize 20, Attr.color colorHex ]
                [ Lynx.textContent "●" ]
          else
            Lynx.text [] []
        ]

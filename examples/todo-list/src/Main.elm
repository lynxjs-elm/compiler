module Main exposing (main)

{-| A simple todo list showing list rendering and text input.
-}

import Browser
import Lynx
import Lynx.Attributes as Attr
import Lynx.Events exposing (onTap, onInput)
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
    { items : List TodoItem
    , nextId : Int
    , draft : String
    }


type alias TodoItem =
    { id : Int
    , text : String
    , done : Bool
    }


init : Model
init =
    { items =
        [ { id = 1, text = "Learn Elm", done = True }
        , { id = 2, text = "Build a LynxJS app", done = False }
        , { id = 3, text = "Ship to production", done = False }
        ]
    , nextId = 4
    , draft = ""
    }



-- UPDATE


type Msg
    = Toggle Int
    | Remove Int
    | UpdateDraft String
    | AddItem


update : Msg -> Model -> Model
update msg model =
    case msg of
        Toggle targetId ->
            { model
                | items =
                    List.map
                        (\item ->
                            if item.id == targetId then
                                { item | done = not item.done }
                            else
                                item
                        )
                        model.items
            }

        Remove targetId ->
            { model | items = List.filter (\item -> item.id /= targetId) model.items }

        UpdateDraft text ->
            { model | draft = text }

        AddItem ->
            if String.isEmpty (String.trim model.draft) then
                model
            else
                { model
                    | items = model.items ++ [ { id = model.nextId, text = model.draft, done = False } ]
                    , nextId = model.nextId + 1
                    , draft = ""
                }



-- VIEW


view : Model -> Node Msg
view model =
    Lynx.view
        [ Attr.flexDirection "column"
        , Attr.padding 20
        , Attr.flex 1
        ]
        [ -- Header
          Lynx.text
            [ Attr.fontSize 28
            , Attr.fontWeight "bold"
            , Attr.marginBottom 16
            ]
            [ Lynx.textContent "Todo List" ]

        -- Input row
        , Lynx.view
            [ Attr.flexDirection "row"
            , Attr.marginBottom 16
            , Attr.alignItems "center"
            ]
            [ Lynx.input
                [ onInput UpdateDraft
                , Attr.value model.draft
                , Attr.placeholder "What needs to be done?"
                , Attr.flex 1
                , Attr.height 44
                , Attr.fontSize 16
                , Attr.borderWidth 1
                , Attr.borderColor "#cccccc"
                , Attr.borderRadius 8
                , Attr.paddingLeft 12
                ]
                []
            , Lynx.view
                [ onTap AddItem
                , Attr.backgroundColor "#4a90d9"
                , Attr.borderRadius 8
                , Attr.paddingTop 10
                , Attr.paddingBottom 10
                , Attr.paddingLeft 16
                , Attr.paddingRight 16
                , Attr.marginLeft 8
                ]
                [ Lynx.text [ Attr.color "#ffffff", Attr.fontSize 18 ]
                    [ Lynx.textContent "Add" ]
                ]
            ]

        -- Summary
        , Lynx.text
            [ Attr.fontSize 14
            , Attr.color "#888888"
            , Attr.marginBottom 12
            ]
            [ Lynx.textContent (summaryText model.items) ]

        -- Items
        , Lynx.scrollView
            [ Attr.flex 1
            , Attr.scrollDirection "vertical"
            ]
            (List.map viewItem model.items)
        ]


summaryText : List TodoItem -> String
summaryText items =
    let
        total = List.length items
        done = List.length (List.filter .done items)
    in
    String.fromInt done ++ "/" ++ String.fromInt total ++ " completed"


viewItem : TodoItem -> Node Msg
viewItem item =
    Lynx.view
        [ Attr.flexDirection "row"
        , Attr.alignItems "center"
        , Attr.paddingTop 12
        , Attr.paddingBottom 12
        , Attr.borderWidth 1
        , Attr.borderColor "#eeeeee"
        ]
        [ -- Checkbox area
          Lynx.view
            [ onTap (Toggle item.id)
            , Attr.width 28
            , Attr.height 28
            , Attr.borderRadius 14
            , Attr.borderWidth 2
            , Attr.borderColor
                (if item.done then "#4a90d9" else "#cccccc")
            , Attr.backgroundColor
                (if item.done then "#4a90d9" else "#ffffff")
            , Attr.alignItems "center"
            , Attr.justifyContent "center"
            , Attr.marginRight 12
            ]
            [ if item.done then
                Lynx.text [ Attr.color "#ffffff", Attr.fontSize 14 ]
                    [ Lynx.textContent "✓" ]
              else
                Lynx.text [] []
            ]

        -- Text
        , Lynx.text
            [ Attr.fontSize 16
            , Attr.flex 1
            , Attr.color
                (if item.done then "#aaaaaa" else "#333333")
            ]
            [ Lynx.textContent item.text ]

        -- Remove button
        , Lynx.view
            [ onTap (Remove item.id)
            , Attr.paddingLeft 8
            , Attr.paddingRight 8
            ]
            [ Lynx.text [ Attr.fontSize 18, Attr.color "#cc0000" ]
                [ Lynx.textContent "✕" ]
            ]
        ]

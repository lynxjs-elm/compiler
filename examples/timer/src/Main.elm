module Main exposing (main)

{-| A timer app demonstrating subscriptions with Time.every.
-}

import Browser
import Lynx
import Lynx.Attributes as Attr exposing (Alignment(..), FlexDirection(..), FontWeight(..))
import Lynx.Events exposing (onTap)
import Time
import VirtualDom exposing (Node)



-- MAIN


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL


type alias Model =
    { elapsed : Int -- tenths of a second
    , running : Bool
    , laps : List Int
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { elapsed = 0
      , running = False
      , laps = []
      }
    , Cmd.none
    )



-- UPDATE


type Msg
    = Tick Time.Posix
    | ToggleRunning
    | RecordLap
    | Reset


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Tick _ ->
            ( { model | elapsed = model.elapsed + 1 }
            , Cmd.none
            )

        ToggleRunning ->
            ( { model | running = not model.running }
            , Cmd.none
            )

        RecordLap ->
            ( { model | laps = model.elapsed :: model.laps }
            , Cmd.none
            )

        Reset ->
            ( { model | elapsed = 0, running = False, laps = [] }
            , Cmd.none
            )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    if model.running then
        Time.every 100 Tick
    else
        Sub.none



-- VIEW


view : Model -> Node Msg
view model =
    Lynx.view
        [ Attr.flexDirection Column
        , Attr.alignItems Center
        , Attr.flex 1
        , Attr.backgroundColor "#1a1a2e"
        , Attr.paddingTop 40
        ]
        [ -- Timer display
          Lynx.text
            [ Attr.fontSize 64
            , Attr.fontWeight Bold
            , Attr.color "#e94560"
            ]
            [ Lynx.textContent (formatTime model.elapsed) ]

        -- Controls
        , Lynx.view
            [ Attr.flexDirection Row
            , Attr.marginTop 30
            ]
            [ -- Start/Stop
              timerButton
                (if model.running then "#e94560" else "#16c79a")
                ToggleRunning
                (if model.running then "Stop" else "Start")

            -- Lap (only when running)
            , if model.running then
                timerButton "#0f3460" RecordLap "Lap"
              else
                Lynx.view [] []

            -- Reset (only when stopped and has time)
            , if not model.running && model.elapsed > 0 then
                timerButton "#533483" Reset "Reset"
              else
                Lynx.view [] []
            ]

        -- Laps
        , if List.isEmpty model.laps then
            Lynx.view [] []
          else
            Lynx.view
                [ Attr.marginTop 30
                , Attr.flexDirection Column
                , Attr.alignItems Center
                ]
                [ Lynx.text
                    [ Attr.fontSize 18
                    , Attr.color "#e94560"
                    , Attr.marginBottom 12
                    ]
                    [ Lynx.textContent "Laps" ]
                , Lynx.view [ Attr.flexDirection Column ]
                    (List.indexedMap viewLap (List.reverse model.laps))
                ]
        ]


timerButton : String -> Msg -> String -> Node Msg
timerButton bgColor msg label =
    Lynx.view
        [ onTap msg
        , Attr.backgroundColor bgColor
        , Attr.borderRadius 30
        , Attr.paddingTop 14
        , Attr.paddingBottom 14
        , Attr.paddingLeft 28
        , Attr.paddingRight 28
        , Attr.marginLeft 8
        , Attr.marginRight 8
        ]
        [ Lynx.text
            [ Attr.color "#ffffff"
            , Attr.fontSize 18
            , Attr.fontWeight Bold
            ]
            [ Lynx.textContent label ]
        ]


viewLap : Int -> Int -> Node Msg
viewLap index tenths =
    Lynx.view
        [ Attr.flexDirection Row
        , Attr.paddingTop 8
        , Attr.paddingBottom 8
        ]
        [ Lynx.text
            [ Attr.fontSize 16
            , Attr.color "#95A5A6"
            , Attr.marginRight 16
            ]
            [ Lynx.textContent ("Lap " ++ String.fromInt (index + 1)) ]
        , Lynx.text
            [ Attr.fontSize 16
            , Attr.color "#ffffff"
            ]
            [ Lynx.textContent (formatTime tenths) ]
        ]


formatTime : Int -> String
formatTime tenths =
    let
        totalSeconds = tenths // 10
        minutes = totalSeconds // 60
        seconds = modBy 60 totalSeconds
        deciseconds = modBy 10 tenths
    in
    padZero minutes ++ ":" ++ padZero seconds ++ "." ++ String.fromInt deciseconds


padZero : Int -> String
padZero n =
    if n < 10 then
        "0" ++ String.fromInt n
    else
        String.fromInt n

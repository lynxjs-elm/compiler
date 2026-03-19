module Main exposing (main)

import Browser
import Http
import Lynx exposing (view, text, textContent)
import Lynx.Attributes exposing (fontSize, padding, color, flexDirection, alignItems)
import Lynx.Events exposing (onTap)


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = \_ -> Sub.none
        , view = view_
        }


type alias Model =
    { status : Status
    }


type Status
    = Loading
    | Success String
    | Failure String


type Msg
    = GotQuote (Result Http.Error String)
    | FetchQuote


init : () -> ( Model, Cmd Msg )
init _ =
    ( { status = Loading }
    , fetchQuote
    )


fetchQuote : Cmd Msg
fetchQuote =
    Http.get
        { url = "https://api.quotable.io/quotes/random"
        , expect = Http.expectString GotQuote
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotQuote result ->
            case result of
                Ok body ->
                    ( { model | status = Success body }, Cmd.none )

                Err err ->
                    ( { model | status = Failure (errorToString err) }, Cmd.none )

        FetchQuote ->
            ( { model | status = Loading }, fetchQuote )


errorToString : Http.Error -> String
errorToString err =
    case err of
        Http.BadUrl url ->
            "Bad URL: " ++ url

        Http.Timeout ->
            "Request timed out"

        Http.NetworkError ->
            "Network error"

        Http.BadStatus code ->
            "Bad status: " ++ String.fromInt code

        Http.BadBody msg_ ->
            "Bad body: " ++ msg_


view_ : Model -> Lynx.Node Msg
view_ model =
    view [ padding 20, flexDirection "column", alignItems "center" ]
        [ text [ fontSize 24, padding 10 ]
            [ textContent "HTTP Example" ]
        , view [ padding 10 ]
            [ text [ fontSize 16, color (statusColor model.status) ]
                [ textContent (statusText model.status) ]
            ]
        , view [ onTap FetchQuote, padding 10 ]
            [ text [ fontSize 18, color "#007AFF" ]
                [ textContent "Fetch New Quote" ]
            ]
        ]


statusColor : Status -> String
statusColor status =
    case status of
        Loading -> "#888888"
        Success _ -> "#333333"
        Failure _ -> "#CC0000"


statusText : Status -> String
statusText status =
    case status of
        Loading -> "Loading..."
        Success body -> String.left 200 body
        Failure err -> err

module Browser exposing
    ( sandbox
    , element
    , document, Document
    , application, UrlRequest(..)
    )

{-| This module helps you set up an Elm `Program` with functions like
[`sandbox`](#sandbox) and [`document`](#document).

Adapted for LynxJS native rendering.


# Sandboxes

@docs sandbox


# Elements

@docs element


# Documents

@docs document, Document


# Applications

@docs application, UrlRequest

-}

import Browser.Navigation as Navigation
import Elm.Kernel.Browser
import Url
import VirtualDom



-- SANDBOX


{-| Create a "sandboxed" program that cannot communicate with the outside
world.

    import Lynx exposing (Node)

    main =
        Browser.sandbox
            { init = 0
            , view = view
            , update = update
            }
-}
sandbox :
    { init : model
    , view : model -> VirtualDom.Node msg
    , update : msg -> model -> model
    }
    -> Program () model msg
sandbox impl =
    Elm.Kernel.Browser.element
        { init = \() -> ( impl.init, Cmd.none )
        , view = impl.view
        , update = \msg model -> ( impl.update msg model, Cmd.none )
        , subscriptions = \_ -> Sub.none
        }



-- ELEMENT


{-| Create an element managed by Elm. Supports commands, subscriptions,
flags, and ports.
-}
element :
    { init : flags -> ( model, Cmd msg )
    , view : model -> VirtualDom.Node msg
    , update : msg -> model -> ( model, Cmd msg )
    , subscriptions : model -> Sub msg
    }
    -> Program flags model msg
element =
    Elm.Kernel.Browser.element



-- DOCUMENT


{-| Create a document managed by Elm. The `view` function gives you control
over the root layout.
-}
document :
    { init : flags -> ( model, Cmd msg )
    , view : model -> Document msg
    , update : msg -> model -> ( model, Cmd msg )
    , subscriptions : model -> Sub msg
    }
    -> Program flags model msg
document =
    Elm.Kernel.Browser.document


{-| Describes the document structure. The `title` field is ignored in LynxJS
(no document title concept), but kept for API compatibility.
-}
type alias Document msg =
    { title : String
    , body : List (VirtualDom.Node msg)
    }



-- APPLICATION


{-| Create an application that manages URLs. In LynxJS, URL management is
stubbed -- `init` receives a dummy URL, and navigation commands are no-ops.
-}
application :
    { init : flags -> Url.Url -> Navigation.Key -> ( model, Cmd msg )
    , view : model -> Document msg
    , update : msg -> model -> ( model, Cmd msg )
    , subscriptions : model -> Sub msg
    , onUrlRequest : UrlRequest -> msg
    , onUrlChange : Url.Url -> msg
    }
    -> Program flags model msg
application =
    Elm.Kernel.Browser.application


{-| URL request type for application programs.
-}
type UrlRequest
    = Internal Url.Url
    | External String

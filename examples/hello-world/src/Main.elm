module Main exposing (main)

{-| Phase 1 verification: Static rendering.
Renders a view with a text element. No events, no TEA.
-}

import VirtualDom exposing (Node, node, text)


main : Node msg
main =
    node "view" []
        [ node "text" [] [ text "Hello from Elm on LynxJS!" ]
        ]

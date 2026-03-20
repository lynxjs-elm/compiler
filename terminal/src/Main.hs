{-# LANGUAGE OverloadedStrings #-}
module Main
  ( main
  )
  where


import Prelude hiding (init)
import qualified Data.List as List
import qualified Text.PrettyPrint.ANSI.Leijen as P
import Text.Read (readMaybe)

import qualified Elm.Version as V
import Terminal
import Terminal.Helpers

import qualified Bump
import qualified Clean
import qualified Dev
import qualified Develop
import qualified Diff
import qualified Init
import qualified Install
import qualified Make
import qualified Publish
import qualified Repl
import qualified Uninstall



-- MAIN


main :: IO ()
main =
  Terminal.app intro outro
    [ repl
    , init
    , reactor
    , dev
    , make
    , install
    , uninstall
    , clean
    , bump
    , diff
    , publish
    ]


intro :: P.Doc
intro =
  P.vcat
    [ P.fillSep
        ["Hi,","welcome","to"
        ,P.green "lynxjs-elm"
        ,P.green (P.text (V.toChars V.compiler)) <> "."
        ,"Elm","targeting","LynxJS","native","rendering."
        ]
    , ""
    , P.black "-------------------------------------------------------------------------------"
    , P.black "This is a fork of the Elm compiler that outputs LynxJS element trees"
    , P.black "instead of browser DOM. See <https://guide.elm-lang.org> for Elm basics."
    , P.black "-------------------------------------------------------------------------------"
    ]


outro :: P.Doc
outro =
  P.fillSep $ map P.text $ words $
    "Be sure to ask on the Elm slack if you run into trouble! Folks are friendly and\
    \ happy to help out. They hang out there because it is fun, so be kind to get the\
    \ best results!"



-- INIT


init :: Terminal.Command
init =
  let
    summary =
      "Start a LynxJS Elm project. It creates an elm.json file with LynxJS\
      \ dependencies and a starter src/Main.elm with a counter app."

    details =
      "The `init` command helps start LynxJS Elm projects:"

    example =
      reflow
        "It will ask permission to create an elm.json file and a starter src/Main.elm\
        \ file. The project will include lynxjs-elm/ui and lynxjs-elm/browser as\
        \ dependencies so you can start building native UIs right away."
  in
  Terminal.Command "init" (Common summary) details example noArgs noFlags Init.run



-- REPL


repl :: Terminal.Command
repl =
  let
    summary =
      "Open up an interactive programming session. Type in Elm expressions\
      \ like (2 + 2) or (String.length \"test\") and see if they equal four!"

    details =
      "The `repl` command opens up an interactive programming session:"

    example =
      reflow
        "Start working through <https://guide.elm-lang.org> to learn how to use this!\
        \ It has a whole chapter that uses the REPL for everything, so that is probably\
        \ the quickest way to get started."

    replFlags =
      flags Repl.Flags
        |-- flag "interpreter" interpreter "Path to a alternate JS interpreter, like node or nodejs."
        |-- onOff "no-colors" "Turn off the colors in the REPL. This can help if you are having trouble reading the values. Some terminals use a custom color scheme that diverges significantly from the standard ANSI colors, so another path may be to pick a more standard color scheme."
  in
  Terminal.Command "repl" (Common summary) details example noArgs replFlags Repl.run


interpreter :: Parser String
interpreter =
  Parser
    { _singular = "interpreter"
    , _plural = "interpreters"
    , _parser = Just
    , _suggest = \_ -> return []
    , _examples = \_ -> return ["node","nodejs"]
    }



-- REACTOR


reactor :: Terminal.Command
reactor =
  let
    summary =
      "Compile code with a click. It opens a file viewer in your browser, and\
      \ when you click on an Elm file, it compiles and you see the result."

    details =
      "The `reactor` command starts a local server on your computer:"

    example =
      reflow
        "After running that command, you would have a server at <http://localhost:8000>\
        \ that helps with development. It shows your files like a file viewer. If you\
        \ click on an Elm file, it will compile it for you! And you can just press\
        \ the refresh button in the browser to recompile things."

    reactorFlags =
      flags Develop.Flags
        |-- flag "port" port_ "The port of the server (default: 8000)"
  in
  Terminal.Command "reactor" (Common summary) details example noArgs reactorFlags Develop.run


port_ :: Parser Int
port_ =
  Parser
    { _singular = "port"
    , _plural = "ports"
    , _parser = readMaybe
    , _suggest = \_ -> return []
    , _examples = \_ -> return ["3000","8000"]
    }



-- DEV


dev :: Terminal.Command
dev =
  let
    summary =
      "Start a LynxJS dev server with live reloading. It compiles your Elm code,\
      \ bundles it with rspack, and watches for changes."

    details =
      "The `dev` command starts a dev server for LynxJS:"

    example =
      reflow
        "After running that command, you will see a URL and QR code that you can\
        \ use to open the app in LynxJS Explorer. When you save an Elm file, it\
        \ recompiles and the app updates automatically."

    devFlags =
      flags Dev.Flags
        |-- flag "port" port_ "The port of the dev server (default: 3000)"
        |-- onOff "verbose" "Show detailed output from npm and rspack during builds."
  in
  Terminal.Command "dev" (Common summary) details example (required elmFile) devFlags Dev.run



-- MAKE


make :: Terminal.Command
make =
  let
    details =
      "The `make` command compiles Elm code into JS or HTML:"

    example =
      stack
        [ reflow
            "For example:"
        , P.indent 4 $ P.green "lynxjs-elm make src/Main.elm"
        , reflow
            "This tries to compile an Elm file named src/Main.elm, generating a\
            \ main.lynx.bundle file by default."
        ]

    makeFlags =
      flags Make.Flags
        |-- onOff "debug" "Turn on the time-travelling debugger. It allows you to rewind and replay events. The events can be imported/exported into a file, which makes for very precise bug reports!"
        |-- onOff "optimize" "Turn on optimizations to make code smaller and faster. For example, the compiler renames record fields to be as short as possible and unboxes values to reduce allocation."
        |-- flag "output" Make.output "Specify the name of the resulting JS file. For example --output=assets/elm.js to generate the JS at assets/elm.js or --output=/dev/null to generate no output at all!"
        |-- flag "report" Make.reportType "You can say --report=json to get error messages as JSON. This is only really useful if you are an editor plugin. Humans should avoid it!"
        |-- flag "docs" Make.docsFile "Generate a JSON file of documentation for a package. Eventually it will be possible to preview docs with `reactor` because it is quite hard to deal with these JSON files directly."
        |-- onOff "verbose" "Show detailed output from npm and rspack during bundling."
  in
  Terminal.Command "make" Uncommon details example (zeroOrMore elmFile) makeFlags Make.run



-- INSTALL


install :: Terminal.Command
install =
  let
    details =
      "The `install` command fetches packages for use in your project:"

    example =
      stack
        [ reflow
            "For example, if you want to get packages for HTTP and JSON, you would say:"
        , P.indent 4 $ P.green $ P.vcat $
              [ "lynxjs-elm install lynxjs-elm/http"
              , "lynxjs-elm install elm/json"
              ]
        , reflow
            "Notice that you must say the AUTHOR name and PROJECT name! After running those\
            \ commands, you could say `import Http` or `import Json.Decode` in your code."
        ]

    installArgs =
      oneOf
        [ require0 Install.NoArgs
        , require1 Install.Install package
        ]
  in
  Terminal.Command "install" Uncommon details example installArgs noFlags Install.run



-- UNINSTALL


uninstall :: Terminal.Command
uninstall =
  let
    details =
      "The `uninstall` command removes packages from your project:"

    example =
      stack
        [ reflow
            "For example, if you want to remove a package, you would say:"
        , P.indent 4 $ P.green "lynxjs-elm uninstall elm/http"
        , reflow
            "I will remove it from your elm.json and verify that everything\
            \ still compiles without it."
        ]
  in
  Terminal.Command "uninstall" Uncommon details example (required package) noFlags Uninstall.run



-- CLEAN


clean :: Terminal.Command
clean =
  let
    summary =
      "Remove cached build artifacts. This clears elm-stuff/ in the current\
      \ project and the shared bundler cache."

    details =
      "The `clean` command removes cached build artifacts:"

    example =
      reflow
        "This is useful when you hit strange build errors or want a fresh start.\
        \ It removes elm-stuff/ from your project and the bundler cache. Your\
        \ source code and elm.json are not touched."
  in
  Terminal.Command "clean" (Common summary) details example noArgs noFlags Clean.run



-- PUBLISH


publish :: Terminal.Command
publish =
  let
    details =
      "The `publish` command publishes your package on <https://package.elm-lang.org>\
      \ so that anyone in the Elm community can use it."

    example =
      stack
        [ reflow
            "Think hard if you are ready to publish NEW packages though!"
        , reflow
            "Part of what makes Elm great is the packages ecosystem. The fact that\
            \ there is usually one option (usually very well done) makes it way\
            \ easier to pick packages and become productive. So having a million\
            \ packages would be a failure in Elm. We do not need twenty of\
            \ everything, all coded in a single weekend."
        , reflow
            "So as community members gain wisdom through experience, we want\
            \ them to share that through thoughtful API design and excellent\
            \ documentation. It is more about sharing ideas and insights than\
            \ just sharing code! The first step may be asking for advice from\
            \ people you respect, or in community forums. The second step may\
            \ be using it at work to see if it is as nice as you think. Maybe\
            \ it ends up as an experiment on GitHub only. Point is, try to be\
            \ respectful of the community and package ecosystem!"
        , reflow
            "Check out <https://package.elm-lang.org/help/design-guidelines> for guidance on how to create great packages!"
        ]
  in
  Terminal.Command "publish" Uncommon details example noArgs noFlags Publish.run



-- BUMP


bump :: Terminal.Command
bump =
  let
    details =
      "The `bump` command figures out the next version number based on API changes:"

    example =
      reflow
        "Say you just published version 1.0.0, but then decided to remove a function.\
        \ I will compare the published API to what you have locally, figure out that\
        \ it is a MAJOR change, and bump your version number to 2.0.0. I do this with\
        \ all packages, so there cannot be MAJOR changes hiding in PATCH releases in Elm!"
  in
  Terminal.Command "bump" Uncommon details example noArgs noFlags Bump.run



-- DIFF


diff :: Terminal.Command
diff =
  let
    details =
      "The `diff` command detects API changes:"

    example =
      stack
        [ reflow
            "For example, to see what changed in the HTML package between\
            \ versions 1.0.0 and 2.0.0, you can say:"
        , P.indent 4 $ P.green $ "elm diff elm/html 1.0.0 2.0.0"
        , reflow
            "Sometimes a MAJOR change is not actually very big, so\
            \ this can help you plan your upgrade timelines."
        ]

    diffArgs =
      oneOf
        [ require0 Diff.CodeVsLatest
        , require1 Diff.CodeVsExactly version
        , require2 Diff.LocalInquiry version version
        , require3 Diff.GlobalInquiry package version version
        ]
  in
  Terminal.Command "diff" Uncommon details example diffArgs noFlags Diff.run



-- HELPERS


stack :: [P.Doc] -> P.Doc
stack docs =
  P.vcat $ List.intersperse "" docs


reflow :: String -> P.Doc
reflow string =
  P.fillSep $ map P.text $ words string

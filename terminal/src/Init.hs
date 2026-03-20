{-# LANGUAGE OverloadedStrings #-}
module Init
  ( run
  )
  where


import Prelude hiding (init)
import qualified Data.Map as Map
import qualified Data.NonEmptyList as NE
import qualified System.Directory as Dir

import qualified Deps.Solver as Solver
import qualified Elm.Constraint as Con
import qualified Elm.Outline as Outline
import qualified Elm.Package as Pkg
import qualified Elm.Version as V
import qualified Reporting
import qualified Reporting.Doc as D
import qualified Reporting.Exit as Exit



-- RUN


run :: () -> () -> IO ()
run () () =
  Reporting.attempt Exit.initToReport $
  do  exists <- Dir.doesFileExist "elm.json"
      if exists
        then return (Left Exit.InitAlreadyExists)
        else
          do  approved <- Reporting.ask question
              if approved
                then init
                else
                  do  putStrLn "Okay, I did not make any changes!"
                      return (Right ())


question :: D.Doc
question =
  D.stack
    [ D.fillSep
        ["Hello!"
        ,"LynxJS","Elm","projects","start","with","an",D.green "elm.json","file"
        ,"and","a","starter",D.green "src/Main.elm" <> "."
        ,"I","can","create","them!"
        ]
    , D.reflow
        "The project will include lynxjs-elm/ui and lynxjs-elm/browser as dependencies,\
        \ plus a simple counter app to get you started."
    , "Would you like me to create a new LynxJS Elm project here? [Y/n]: "
    ]



-- INIT


init :: IO (Either Exit.Init ())
init =
  do  eitherEnv <- Solver.initEnv
      case eitherEnv of
        Left problem ->
          return (Left (Exit.InitRegistryProblem problem))

        Right (Solver.Env cache _ connection registry) ->
          do  result <- Solver.verify cache connection registry defaults
              case result of
                Solver.Err exit ->
                  return (Left (Exit.InitSolverProblem exit))

                Solver.NoSolution ->
                  return (Left (Exit.InitNoSolution (Map.keys defaults)))

                Solver.NoOfflineSolution ->
                  return (Left (Exit.InitNoOfflineSolution (Map.keys defaults)))

                Solver.Ok details ->
                  let
                    solution = Map.map (\(Solver.Details vsn _) -> vsn) details
                    directs = Map.intersection solution defaults
                    indirects = Map.difference solution defaults
                  in
                  do  Dir.createDirectoryIfMissing True "src"
                      Outline.write "." $ Outline.App $
                        Outline.AppOutline V.compiler (NE.List (Outline.RelativeSrcDir "src") []) directs indirects Map.empty Map.empty
                      let mainElm = "src/Main.elm"
                      mainExists <- Dir.doesFileExist mainElm
                      if mainExists
                        then return ()
                        else writeFile mainElm starterMain
                      putStrLn ""
                      putStrLn "  Created elm.json and src/Main.elm"
                      putStrLn ""
                      putStrLn "  To build:  lynxjs-elm make src/Main.elm"
                      putStrLn "  To dev:    lynxjs-elm dev src/Main.elm"
                      putStrLn ""
                      return (Right ())


defaults :: Map.Map Pkg.Name Con.Constraint
defaults =
  Map.fromList
    [ (Pkg.core, Con.anything)
    , (Pkg.browser, Con.anything)
    , (Pkg.ui, Con.anything)
    ]


starterMain :: String
starterMain = unlines
  [ "module Main exposing (main)"
  , ""
  , ""
  , "import Browser"
  , "import Lynx"
  , "import Lynx.Attributes as Attr"
  , "import Lynx.Events exposing (onTap)"
  , ""
  , ""
  , ""
  , ""
  , "-- MAIN"
  , ""
  , ""
  , "main : Program () Model Msg"
  , "main ="
  , "    Browser.sandbox"
  , "        { init = init"
  , "        , view = view"
  , "        , update = update"
  , "        }"
  , ""
  , ""
  , ""
  , "-- MODEL"
  , ""
  , ""
  , "type alias Model ="
  , "    { count : Int"
  , "    }"
  , ""
  , ""
  , "init : Model"
  , "init ="
  , "    { count = 0"
  , "    }"
  , ""
  , ""
  , ""
  , "-- UPDATE"
  , ""
  , ""
  , "type Msg"
  , "    = Increment"
  , "    | Decrement"
  , ""
  , ""
  , "update : Msg -> Model -> Model"
  , "update msg model ="
  , "    case msg of"
  , "        Increment ->"
  , "            { model | count = model.count + 1 }"
  , ""
  , "        Decrement ->"
  , "            { model | count = model.count - 1 }"
  , ""
  , ""
  , ""
  , "-- VIEW"
  , ""
  , ""
  , "view : Model -> Lynx.Node Msg"
  , "view model ="
  , "    Lynx.view"
  , "        [ Attr.flexDirection \"column\""
  , "        , Attr.alignItems \"center\""
  , "        , Attr.justifyContent \"center\""
  , "        , Attr.flex 1"
  , "        ]"
  , "        [ Lynx.text"
  , "            [ Attr.fontSize 24"
  , "            , Attr.marginBottom 20"
  , "            ]"
  , "            [ Lynx.textContent \"LynxJS Elm App\" ]"
  , "        , Lynx.view"
  , "            [ Attr.flexDirection \"row\""
  , "            , Attr.alignItems \"center\""
  , "            ]"
  , "            [ button Decrement \"-\""
  , "            , Lynx.text"
  , "                [ Attr.fontSize 32"
  , "                , Attr.marginLeft 20"
  , "                , Attr.marginRight 20"
  , "                ]"
  , "                [ Lynx.textContent (String.fromInt model.count) ]"
  , "            , button Increment \"+\""
  , "            ]"
  , "        ]"
  , ""
  , ""
  , "button : Msg -> String -> Lynx.Node Msg"
  , "button msg label ="
  , "    Lynx.view"
  , "        [ onTap msg"
  , "        , Attr.backgroundColor \"#4a90d9\""
  , "        , Attr.borderRadius 8"
  , "        , Attr.paddingTop 12"
  , "        , Attr.paddingBottom 12"
  , "        , Attr.paddingLeft 24"
  , "        , Attr.paddingRight 24"
  , "        ]"
  , "        [ Lynx.text"
  , "            [ Attr.color \"#ffffff\""
  , "            , Attr.fontSize 24"
  , "            ]"
  , "            [ Lynx.textContent label ]"
  , "        ]"
  ]

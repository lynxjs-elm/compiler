{-# LANGUAGE OverloadedStrings #-}
module Uninstall
  ( run
  )
  where


import qualified Data.Map as Map

import qualified BackgroundWriter as BW
import qualified Deps.Solver as Solver
import qualified Elm.Constraint as C
import qualified Elm.Details as Details
import qualified Elm.Outline as Outline
import qualified Elm.Package as Pkg
import qualified Reporting
import qualified Reporting.Doc as D
import qualified Reporting.Exit as Exit
import qualified Reporting.Task as Task
import qualified Stuff



-- RUN


run :: Pkg.Name -> () -> IO ()
run pkg () =
  Reporting.attempt Exit.installToReport $
    do  maybeRoot <- Stuff.findRoot
        case maybeRoot of
          Nothing ->
            return (Left Exit.InstallNoOutline)

          Just root ->
            Task.run $
              do  env <- Task.eio Exit.InstallBadRegistry $ Solver.initEnv
                  oldOutline <- Task.eio Exit.InstallBadOutline $ Outline.read root
                  case oldOutline of
                    Outline.App outline ->
                      uninstallApp root env oldOutline pkg outline

                    Outline.Pkg outline ->
                      uninstallPkg root env oldOutline pkg outline


type Task = Task.Task Exit.Install



-- UNINSTALL FROM APP


uninstallApp :: FilePath -> Solver.Env -> Outline.Outline -> Pkg.Name -> Outline.AppOutline -> Task ()
uninstallApp root env oldOutline pkg outline@(Outline.AppOutline _ _ direct _indirect testDirect _testIndirect) =
  if Map.member pkg direct then
    do  let newDirect = Map.delete pkg direct
        -- Re-solve dependencies to get correct indirect deps
        let constraints = Map.map C.exactly newDirect
        let (Solver.Env cache _ connection registry) = env
        result <- Task.io $ Solver.verify cache connection registry constraints
        case result of
          Solver.Ok details ->
            let
              solution = Map.map (\(Solver.Details vsn _) -> vsn) details
              solvedDirects = Map.intersection solution constraints
              solvedIndirects = Map.difference solution constraints
              newOutline = Outline.App $
                outline
                  { Outline._app_deps_direct = solvedDirects
                  , Outline._app_deps_indirect = solvedIndirects
                  }
            in
            attemptUninstall root env oldOutline newOutline pkg

          Solver.NoSolution ->
            Task.io $
              putStrLn $ "I cannot safely remove " ++ Pkg.toChars pkg ++ " because other packages depend on it."

          Solver.NoOfflineSolution ->
            Task.io $
              putStrLn $ "I cannot safely remove " ++ Pkg.toChars pkg ++ " while offline."

          Solver.Err exit ->
            Task.throw (Exit.InstallHadSolverTrouble exit)

  else if Map.member pkg testDirect then
    do  let newOutline = Outline.App $
              outline
                { Outline._app_test_direct = Map.delete pkg testDirect
                }
        attemptUninstall root env oldOutline newOutline pkg

  else
    Task.io $ putStrLn $ "The package " ++ Pkg.toChars pkg ++ " is not a direct dependency."



-- UNINSTALL FROM PACKAGE


uninstallPkg :: FilePath -> Solver.Env -> Outline.Outline -> Pkg.Name -> Outline.PkgOutline -> Task ()
uninstallPkg root env oldOutline pkg outline@(Outline.PkgOutline _ _ _ _ _ deps test _) =
  if Map.member pkg deps then
    do  let newOutline = Outline.Pkg $
              outline
                { Outline._pkg_deps = Map.delete pkg deps
                }
        attemptUninstall root env oldOutline newOutline pkg

  else if Map.member pkg test then
    do  let newOutline = Outline.Pkg $
              outline
                { Outline._pkg_test_deps = Map.delete pkg test
                }
        attemptUninstall root env oldOutline newOutline pkg

  else
    Task.io $ putStrLn $ "The package " ++ Pkg.toChars pkg ++ " is not a dependency."



-- ATTEMPT UNINSTALL


attemptUninstall :: FilePath -> Solver.Env -> Outline.Outline -> Outline.Outline -> Pkg.Name -> Task ()
attemptUninstall root env oldOutline newOutline pkg =
  Task.eio Exit.InstallBadDetails $
  BW.withScope $ \scope ->
  do  let question = D.vcat
            [ D.fillSep
                ["I","found",D.red (D.fromPackage pkg),"in","your","dependencies."
                ]
            , ""
            , D.fillSep
                ["Should","I","remove","it?","[Y/n]: "
                ]
            ]
      approved <- Reporting.ask question
      if approved
        then
          do  Outline.write root newOutline
              result <- Details.verifyInstall scope root env newOutline
              case result of
                Left exit ->
                  do  Outline.write root oldOutline
                      return (Left exit)

                Right () ->
                  do  putStrLn "Success!"
                      return (Right ())
        else
          do  putStrLn "Okay, I did not change anything!"
              return (Right ())

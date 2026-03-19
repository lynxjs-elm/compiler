{-# LANGUAGE OverloadedStrings #-}
module Dev
  ( Flags(..)
  , run
  )
  where


import Control.Concurrent (threadDelay)
import Control.Exception (finally)
import Control.Monad (when)
import qualified Data.List as List
import qualified Data.NonEmptyList as NE
import qualified Data.Time.Clock.POSIX as Time
import qualified System.Directory as Dir
import qualified System.Exit as SysExit
import System.FilePath ((</>), takeExtension, takeFileName)
import System.IO (hSetBuffering, stdout, BufferMode(..))
import qualified System.Process as Process

import qualified BackgroundWriter as BW
import qualified Build
import qualified Elm.Details as Details
import qualified File
import qualified Generate
import qualified Reporting
import qualified Reporting.Exit as Exit
import qualified Reporting.Task as Task
import qualified Stuff



-- FLAGS


data Flags =
  Flags
    { _port :: Maybe Int
    }



-- RUN


run :: FilePath -> Flags -> IO ()
run path (Flags maybePort) =
  do  hSetBuffering stdout LineBuffering
      maybeRoot <- Stuff.findRoot
      case maybeRoot of
        Nothing ->
          putStrLn "I cannot find an elm.json file. Run `lynxjs-elm init` first."

        Just root ->
          do  home <- Stuff.getElmHome
              let bundlerDir = home </> "bundler"
              let srcDir = bundlerDir </> "src"
              let elmOutput = srcDir </> "elm.js"
              let nodeModules = bundlerDir </> "node_modules"

              -- Set up bundler project
              let port = maybe 3000 id maybePort
              Dir.createDirectoryIfMissing True srcDir
              setupBundlerProject bundlerDir port

              -- Initial compile
              putStrLn "Compiling..."
              ok <- compileAndWrite root path elmOutput
              when ok $
                do  -- Install deps if needed
                    let rspackDir = nodeModules </> "@rspack" </> "cli"
                    hasCorrectDeps <- Dir.doesDirectoryExist rspackDir
                    when (not hasCorrectDeps) $
                      do  putStrLn "Installing bundler dependencies..."
                          callIn bundlerDir "npm" ["install"]

                    -- Assemble all.js and build bundle
                    putStrLn "Bundling..."
                    assembleAndBuild bundlerDir

                    -- Start static file server in background
                    let distDir = bundlerDir </> "dist"
                    let serveProc = (Process.proc "npx" ["serve", "-l", show port, "-n", distDir])
                                      { Process.cwd = Just bundlerDir
                                      , Process.std_out = Process.NoStream
                                      , Process.std_err = Process.NoStream
                                      }
                    (_, _, _, serveHandle) <- Process.createProcess serveProc

                    -- Print bundle URL
                    ip <- getLocalIp
                    putStrLn ""
                    putStrLn $ "  LynxJS Explorer URL:"
                    putStrLn $ "  http://" ++ ip ++ ":" ++ show port ++ "/main.lynx.bundle"
                    putStrLn ""

                    -- Watch for changes, recompile, and rebuild
                    let cleanup = do  Process.terminateProcess serveHandle
                                      _ <- Process.waitForProcess serveHandle
                                      return ()
                    finally
                      (watchAndRebuild root path elmOutput bundlerDir)
                      cleanup



-- COMPILE


compileAndWrite :: FilePath -> FilePath -> FilePath -> IO Bool
compileAndWrite root path elmOutput =
  BW.withScope $ \scope -> Stuff.withRootLock root $
    do  result <- Task.run $
          do  details <- Task.eio Exit.MakeBadDetails (Details.load Reporting.silent scope root)
              artifacts <- Task.eio Exit.MakeCannotBuild (Build.fromPaths Reporting.silent root details (NE.List path []))
              Task.mapError Exit.MakeBadGenerate (Generate.dev root details artifacts)
        case result of
          Left e ->
            do  _ <- Reporting.attemptWithStyle Reporting.silent Exit.makeToReport (return (Left e))
                return False

          Right javascript ->
            do  File.writeBuilder elmOutput javascript
                putStrLn "  Compiled successfully."
                return True



-- WATCH


assembleAndBuild :: FilePath -> IO ()
assembleAndBuild bundlerDir =
  do  let srcDir = bundlerDir </> "src"
      stubs <- readFile (srcDir </> "stubs.js")
      elm <- readFile (srcDir </> "elm.js")
      initCode <- readFile (srcDir </> "init.js")
      writeFile (srcDir </> "all.js") (stubs ++ elm ++ initCode)
      callIn bundlerDir "npx" ["rspack", "build"]


watchAndRebuild :: FilePath -> FilePath -> FilePath -> FilePath -> IO ()
watchAndRebuild root path elmOutput bundlerDir =
  do  mtime <- getMaxMtime root
      loop mtime
  where
    loop lastMtime =
      do  threadDelay 500000  -- 500ms
          mtime <- getMaxMtime root
          when (mtime /= lastMtime) $
            do  putStrLn "\nRecompiling..."
                ok <- compileAndWrite root path elmOutput
                when ok $
                  do  putStrLn "Bundling..."
                      assembleAndBuild bundlerDir
          loop mtime


getMaxMtime :: FilePath -> IO Double
getMaxMtime root =
  do  files <- findElmFiles root
      case files of
        [] -> return 0
        _  ->
          do  times <- mapM Dir.getModificationTime files
              return $ maximum $ map (realToFrac . Time.utcTimeToPOSIXSeconds) times


findElmFiles :: FilePath -> IO [FilePath]
findElmFiles dir =
  do  entries <- Dir.listDirectory dir
      let paths = map (dir </>) entries
      files <- mapM classify paths
      return (concat files)
  where
    classify fp =
      do  isDir <- Dir.doesDirectoryExist fp
          case (isDir, isHidden fp) of
            (True, False) -> findElmFiles fp
            (True, True)  -> return []
            _             -> return [fp | takeExtension fp == ".elm"]

    isHidden fp =
      case takeFileName fp of
        '.':_ -> True
        _     -> List.isPrefixOf "elm-stuff" (takeFileName fp)



-- BUNDLER PROJECT


setupBundlerProject :: FilePath -> Int -> IO ()
setupBundlerProject dir _port =
  do  let pkgFile = dir </> "package.json"
      let cfgFile = dir </> "rspack.config.js"
      let stubsFile = dir </> "src" </> "stubs.js"
      let initFile = dir </> "src" </> "init.js"
      writeFile pkgFile packageJson
      writeFile cfgFile rspackConfig
      writeFile stubsFile stubsJs
      writeFile initFile initJs


getLocalIp :: IO String
getLocalIp =
  do  let proc = Process.proc "ipconfig" ["getifaddr", "en0"]
      result <- Process.readCreateProcess proc ""
      case lines result of
        (ip:_) -> return ip
        _      -> return "localhost"


callIn :: FilePath -> String -> [String] -> IO ()
callIn dir cmd cmdArgs =
  do  let proc = (Process.proc cmd cmdArgs) { Process.cwd = Just dir }
      (_, _, _, ph) <- Process.createProcess proc
      exitCode <- Process.waitForProcess ph
      case exitCode of
        SysExit.ExitSuccess -> return ()
        SysExit.ExitFailure code ->
          error $ cmd ++ " failed with exit code " ++ show code


packageJson :: String
packageJson = unlines
  [ "{"
  , "  \"name\": \"lynxjs-elm-bundler\","
  , "  \"private\": true,"
  , "  \"type\": \"module\","
  , "  \"dependencies\": {"
  , "    \"@lynx-js/template-webpack-plugin\": \"0.6.4\","
  , "    \"@rspack/cli\": \"^1.7.0\","
  , "    \"@rspack/core\": \"^1.7.0\""
  , "  }"
  , "}"
  ]


rspackConfig :: String
rspackConfig = unlines
  [ "import { LynxEncodePlugin, LynxTemplatePlugin } from '@lynx-js/template-webpack-plugin';"
  , "import { defineConfig } from '@rspack/cli';"
  , ""
  , "export default defineConfig({"
  , "  entry: { main: './src/all.js' },"
  , "  plugins: ["
  , "    new LynxEncodePlugin(),"
  , "    new LynxTemplatePlugin({ filename: 'main.lynx.bundle', intermediate: 'main' }),"
  , "    (compiler) => {"
  , "      compiler.hooks.thisCompilation.tap('MarkMainThread', (compilation) => {"
  , "        compilation.hooks.processAssets.tap('MarkMainThread', () => {"
  , "          const asset = compilation.getAsset('main.js');"
  , "          compilation.updateAsset(asset.name, asset.source, { ...asset.info, 'lynx:main-thread': true });"
  , "        });"
  , "      });"
  , "    },"
  , "  ]"
  , "});"
  ]


stubsJs :: String
stubsJs = unlines
  [ "globalThis['requestAnimationFrame'] = lynx['requestAnimationFrame'];"
  , "globalThis['cancelAnimationFrame'] = lynx['cancelAnimationFrame'];"
  , "globalThis['runWorklet'] = function(worklet, params) { return worklet(params); };"
  , "globalThis['native'] = {};"
  , "globalThis['processData'] = function() {};"
  , "globalThis['updatePage'] = function() {};"
  , "globalThis['updateGlobalProps'] = function() {};"
  ]


initJs :: String
initJs = unlines
  [ "globalThis['renderPage'] = function() {"
  , "  var page = __CreatePage('0', 0);"
  , "  var pageId = __GetElementUniqueID(page);"
  , "  globalThis['native']['currentPageId'] = pageId;"
  , "  globalThis['page'] = page;"
  , "  var mods = globalThis.Elm;"
  , "  if (mods) {"
  , "    for (var k in mods) {"
  , "      if (mods[k] && mods[k].init) {"
  , "        mods[k].init({});"
  , "        break;"
  , "      }"
  , "    }"
  , "  }"
  , "};"
  ]

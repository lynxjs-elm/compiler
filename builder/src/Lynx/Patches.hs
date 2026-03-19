{-# LANGUAGE TemplateHaskell #-}
module Lynx.Patches
  ( installFork
  , isFork
  )
  where


import qualified Data.ByteString as BS
import Data.FileEmbed (embedDir, embedFile)
import qualified System.Directory as Dir
import System.FilePath ((</>), takeDirectory)

import qualified Elm.Package as Pkg
import qualified Elm.Version as V
import qualified Stuff



-- EMBEDDED FORK CONTENT
--
-- Complete source trees from our forked packages, baked into the
-- compiler binary at compile time. These replace the stock Elm
-- packages with LynxJS-compatible versions.


virtualDomSrc :: [(FilePath, BS.ByteString)]
virtualDomSrc = $(embedDir "packages/virtual-dom/src")

virtualDomElmJson :: BS.ByteString
virtualDomElmJson = $(embedFile "packages/virtual-dom/elm.json")


browserSrc :: [(FilePath, BS.ByteString)]
browserSrc = $(embedDir "packages/browser/src")

browserElmJson :: BS.ByteString
browserElmJson = $(embedFile "packages/browser/elm.json")


httpSrc :: [(FilePath, BS.ByteString)]
httpSrc = $(embedDir "packages/http/src")

httpElmJson :: BS.ByteString
httpElmJson = $(embedFile "packages/http/elm.json")



-- IS FORK


isFork :: Pkg.Name -> Bool
isFork pkg =
  pkg == Pkg.virtualDom || pkg == Pkg.browser || pkg == Pkg.http



-- INSTALL FORK
--
-- Write the complete forked package to the cache directory.
-- Returns True if any file was written (new install or content changed).


installFork :: Stuff.PackageCache -> Pkg.Name -> V.Version -> IO Bool
installFork cache pkg vsn =
  case getForkContent pkg of
    Nothing ->
      return False

    Just (elmJson, srcFiles) ->
      do  let pkgDir = Stuff.package cache pkg vsn
          Dir.createDirectoryIfMissing True (pkgDir </> "src")
          jsonChanged <- writeIfChanged pkgDir ("elm.json", elmJson)
          srcChanged <- mapM (writeIfChanged (pkgDir </> "src")) srcFiles
          return (jsonChanged || or srcChanged)


getForkContent :: Pkg.Name -> Maybe (BS.ByteString, [(FilePath, BS.ByteString)])
getForkContent pkg
  | pkg == Pkg.virtualDom = Just (virtualDomElmJson, virtualDomSrc)
  | pkg == Pkg.browser    = Just (browserElmJson, browserSrc)
  | pkg == Pkg.http       = Just (httpElmJson, httpSrc)
  | otherwise             = Nothing



-- WRITE HELPERS


writeIfChanged :: FilePath -> (FilePath, BS.ByteString) -> IO Bool
writeIfChanged dir (relPath, content) =
  do  let fullPath = dir </> relPath
      fileExists <- Dir.doesFileExist fullPath
      if fileExists
        then
          do  existing <- BS.readFile fullPath
              if existing == content
                then return False
                else do BS.writeFile fullPath content
                        return True
        else
          do  Dir.createDirectoryIfMissing True (takeDirectory fullPath)
              BS.writeFile fullPath content
              return True

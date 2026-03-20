{-# LANGUAGE TemplateHaskell #-}
module Lynx.Patches
  ( installFork
  , installAllForks
  , isFork
  , forkSuggestion
  , injectRegistry
  , forkContentHash
  )
  where


import qualified Data.ByteString as BS
import Data.FileEmbed (embedDir, embedFile)
import qualified Data.Map as Map
import Data.Word (Word64)
import qualified System.Directory as Dir
import System.FilePath ((</>), takeDirectory)

import qualified Deps.Registry as Registry
import qualified Elm.Package as Pkg
import qualified Elm.Version as V
import qualified Stuff



-- EMBEDDED PACKAGE CONTENT
--
-- Complete source trees from our forked/custom packages, baked into
-- the compiler binary at compile time.


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


uiSrc :: [(FilePath, BS.ByteString)]
uiSrc = $(embedDir "packages/ui/src")

uiElmJson :: BS.ByteString
uiElmJson = $(embedFile "packages/ui/elm.json")


cryptoSrc :: [(FilePath, BS.ByteString)]
cryptoSrc = $(embedDir "packages/crypto/src")

cryptoElmJson :: BS.ByteString
cryptoElmJson = $(embedFile "packages/crypto/elm.json")



-- FORK CONTENT HASH
--
-- A hash of all embedded package content, used to invalidate the project
-- cache (elm-stuff) when the compiler is rebuilt with updated packages.


forkContentHash :: Word64
forkContentHash =
  let
    hashBS :: Word64 -> BS.ByteString -> Word64
    hashBS acc bs = BS.foldl' (\h b -> h * 31 + fromIntegral b) acc bs

    allBytes :: [BS.ByteString]
    allBytes = concat
      [ virtualDomElmJson : map snd virtualDomSrc
      , browserElmJson : map snd browserSrc
      , httpElmJson : map snd httpSrc
      , uiElmJson : map snd uiSrc
      , cryptoElmJson : map snd cryptoSrc
      ]
  in
  foldl' hashBS 0 allBytes



-- IS FORK


isFork :: Pkg.Name -> Bool
isFork pkg =
  pkg == Pkg.virtualDom || pkg == Pkg.browser || pkg == Pkg.http || pkg == Pkg.ui || pkg == Pkg.crypto


-- FORK SUGGESTION
--
-- When a user tries to install elm/browser, elm/virtual-dom, or elm/http,
-- suggest the lynxjs-elm fork instead.


forkSuggestion :: Pkg.Name -> Maybe Pkg.Name
forkSuggestion pkg
  | chars == "elm/virtual-dom" = Just Pkg.virtualDom
  | chars == "elm/browser"     = Just Pkg.browser
  | chars == "elm/http"        = Just Pkg.http
  | otherwise                  = Nothing
  where
    chars = Pkg.toChars pkg



-- INSTALL ALL FORKS
--
-- Pre-install all embedded packages so their elm.json is available
-- for the dependency solver before it tries to fetch from the network.


installAllForks :: Stuff.PackageCache -> IO ()
installAllForks cache =
  do  _ <- installFork cache Pkg.virtualDom (V.Version 1 0 0)
      _ <- installFork cache Pkg.browser    (V.Version 1 0 0)
      _ <- installFork cache Pkg.http       (V.Version 1 0 0)
      _ <- installFork cache Pkg.ui         (V.Version 1 0 0)
      _ <- installFork cache Pkg.crypto    (V.Version 1 0 0)
      return ()



-- INSTALL FORK
--
-- Write the complete package to the cache directory.
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
  | pkg == Pkg.ui         = Just (uiElmJson, uiSrc)
  | pkg == Pkg.crypto     = Just (cryptoElmJson, cryptoSrc)
  | otherwise             = Nothing



-- INJECT REGISTRY
--
-- Add our custom packages (lynx/ui) to the package registry so the
-- dependency solver can resolve them. Forked packages (virtual-dom,
-- browser, http) are already in the upstream registry.


injectRegistry :: Registry.Registry -> Registry.Registry
injectRegistry (Registry.Registry count versions) =
  let
    newPkgs =
      [ (Pkg.virtualDom, Registry.KnownVersions (V.Version 1 0 0) [])
      , (Pkg.browser,    Registry.KnownVersions (V.Version 1 0 0) [])
      , (Pkg.http,       Registry.KnownVersions (V.Version 1 0 0) [])
      , (Pkg.ui,         Registry.KnownVersions (V.Version 1 0 0) [])
      , (Pkg.crypto,     Registry.KnownVersions (V.Version 1 0 0) [])
      ]
    additions = filter (\(k, _) -> not (Map.member k versions)) newPkgs
    newVersions = foldr (\(k, v) m -> Map.insert k v m) versions additions
    newCount = count + length additions
  in
  Registry.Registry newCount newVersions



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

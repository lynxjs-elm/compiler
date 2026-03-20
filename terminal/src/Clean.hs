module Clean
  ( run
  )
  where


import Control.Monad (when)
import qualified System.Directory as Dir

import qualified Stuff



-- RUN


run :: () -> () -> IO ()
run () () =
  do  maybeRoot <- Stuff.findRoot
      case maybeRoot of
        Nothing ->
          putStrLn "I cannot find an elm.json file. There is nothing to clean here."

        Just root ->
          do  let elmStuff = root ++ "/elm-stuff"
              exists <- Dir.doesDirectoryExist elmStuff
              when exists $
                do  Dir.removeDirectoryRecursive elmStuff
                    putStrLn "Removed elm-stuff/"
              home <- Stuff.getElmHome
              let bundlerDir = home ++ "/bundler"
              bundlerExists <- Dir.doesDirectoryExist bundlerDir
              when bundlerExists $
                do  Dir.removeDirectoryRecursive bundlerDir
                    putStrLn "Removed bundler cache."
              if exists || bundlerExists
                then putStrLn "All clean!"
                else putStrLn "Already clean — nothing to remove."

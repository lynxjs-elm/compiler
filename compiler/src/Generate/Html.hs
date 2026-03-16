{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
module Generate.Html
  ( sandwich
  )
  where


import qualified Data.ByteString.Builder as B
import qualified Data.Name as Name
import Text.RawString.QQ (r)



-- SANDWICH


sandwich :: Name.Name -> B.Builder -> B.Builder
sandwich moduleName javascript =
  let name = Name.toBuilder moduleName in
  javascript <> [r|
var app = Elm.|] <> name <> [r|.init({});
|]

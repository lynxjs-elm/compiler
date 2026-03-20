{-# LANGUAGE OverloadedStrings, PatternGuards #-}
module Generate.JavaScript
  ( generate
  , generateForRepl
  , generateForReplEndpoint
  )
  where


import Prelude hiding (cycle, print)
import qualified Data.ByteString as BS
import qualified Data.ByteString.Builder as B
import qualified Data.List as List
import Data.Map ((!))
import qualified Data.Map as Map
import qualified Data.Name as Name
import qualified Data.Set as Set
import qualified Data.Utf8 as Utf8

import qualified AST.Canonical as Can
import qualified AST.Optimized as Opt
import qualified Data.Index as Index
import qualified Elm.Kernel as K
import qualified Elm.ModuleName as ModuleName
import qualified Generate.JavaScript.Builder as JS
import qualified Generate.JavaScript.Expression as Expr
import qualified Generate.JavaScript.Functions as Functions
import qualified Generate.JavaScript.Name as JsName
import qualified Generate.Mode as Mode
import qualified Reporting.Doc as D
import qualified Reporting.Render.Type as RT
import qualified Reporting.Render.Type.Localizer as L



-- GENERATE


type Graph = Map.Map Opt.Global Opt.Node
type Mains = Map.Map ModuleName.Canonical Opt.Main


generate :: Mode.Mode -> Opt.GlobalGraph -> Mains -> B.Builder
generate mode (Opt.GlobalGraph graph _) mains =
  let
    state = Map.foldrWithKey (addMain mode graph) emptyState mains
  in
  "(function(scope){\n'use strict';"
  <> Functions.functions
  <> perfNote mode
  <> stateToBuilder state
  <> toMainExports mode mains
  <> "}(globalThis));"


addMain :: Mode.Mode -> Graph -> ModuleName.Canonical -> Opt.Main -> State -> State
addMain mode graph home _ state =
  addGlobal mode graph state (Opt.Global home "main")


perfNote :: Mode.Mode -> B.Builder
perfNote mode =
  case mode of
    Mode.Prod _ ->
      ""

    Mode.Dev Nothing ->
      "console.warn('Compiled in DEV mode. Follow the advice at "
      <> B.stringUtf8 (D.makeNakedLink "optimize")
      <> " for better performance and smaller assets.');"

    Mode.Dev (Just _) ->
      "console.warn('Compiled in DEBUG mode. Follow the advice at "
      <> B.stringUtf8 (D.makeNakedLink "optimize")
      <> " for better performance and smaller assets.');"



-- GENERATE FOR REPL


generateForRepl :: Bool -> L.Localizer -> Opt.GlobalGraph -> ModuleName.Canonical -> Name.Name -> Can.Annotation -> B.Builder
generateForRepl ansi localizer (Opt.GlobalGraph graph _) home name (Can.Forall _ tipe) =
  let
    mode = Mode.Dev Nothing
    debugState = addGlobal mode graph emptyState (Opt.Global ModuleName.debug "toString")
    evalState = addGlobal mode graph debugState (Opt.Global home name)
  in
  "process.on('uncaughtException', function(err) { process.stderr.write(err.toString() + '\\n'); process.exit(1); });"
  <> Functions.functions
  <> stateToBuilder evalState
  <> print ansi localizer home name tipe


print :: Bool -> L.Localizer -> ModuleName.Canonical -> Name.Name -> Can.Type -> B.Builder
print ansi localizer home name tipe =
  let
    value = JsName.toBuilder (JsName.fromGlobal home name)
    toString = JsName.toBuilder (JsName.fromKernel Name.debug "toAnsiString")
    tipeDoc = RT.canToDoc localizer RT.None tipe
    bool = if ansi then "true" else "false"
  in
  "var _value = " <> toString <> "(" <> bool <> ", " <> value <> ");\n\
  \var _type = " <> B.stringUtf8 (show (D.toString tipeDoc)) <> ";\n\
  \function _print(t) { console.log(_value + (" <> bool <> " ? '\x1b[90m' + t + '\x1b[0m' : t)); }\n\
  \if (_value.length + 3 + _type.length >= 80 || _type.indexOf('\\n') >= 0) {\n\
  \    _print('\\n    : ' + _type.split('\\n').join('\\n      '));\n\
  \} else {\n\
  \    _print(' : ' + _type);\n\
  \}\n"



-- GENERATE FOR REPL ENDPOINT


generateForReplEndpoint :: L.Localizer -> Opt.GlobalGraph -> ModuleName.Canonical -> Maybe Name.Name -> Can.Annotation -> B.Builder
generateForReplEndpoint localizer (Opt.GlobalGraph graph _) home maybeName (Can.Forall _ tipe) =
  let
    name = maybe Name.replValueToPrint id maybeName
    mode = Mode.Dev Nothing
    debugState = addGlobal mode graph emptyState (Opt.Global ModuleName.debug "toString")
    evalState = addGlobal mode graph debugState (Opt.Global home name)
  in
  Functions.functions
  <> stateToBuilder evalState
  <> postMessage localizer home maybeName tipe


postMessage :: L.Localizer -> ModuleName.Canonical -> Maybe Name.Name -> Can.Type -> B.Builder
postMessage localizer home maybeName tipe =
  let
    name = maybe Name.replValueToPrint id maybeName
    value = JsName.toBuilder (JsName.fromGlobal home name)
    toString = JsName.toBuilder (JsName.fromKernel Name.debug "toAnsiString")
    tipeDoc = RT.canToDoc localizer RT.None tipe
    toName n = "\"" <> Name.toBuilder n <> "\""
  in
  "self.postMessage({\n\
  \  name: " <> maybe "null" toName maybeName <> ",\n\
  \  value: " <> toString <> "(true, " <> value <> "),\n\
  \  type: " <> B.stringUtf8 (show (D.toString tipeDoc)) <> "\n\
  \});\n"



-- GRAPH TRAVERSAL STATE


data State =
  State
    { _revKernels :: [B.Builder]
    , _revBuilders :: [B.Builder]
    , _seenGlobals :: Set.Set Opt.Global
    }


emptyState :: State
emptyState =
  State mempty [] Set.empty


stateToBuilder :: State -> B.Builder
stateToBuilder (State revKernels revBuilders _) =
  prependBuilders revKernels (extendedUtilsCmp <> prependBuilders revBuilders mempty)


prependBuilders :: [B.Builder] -> B.Builder -> B.Builder
prependBuilders revBuilders monolith =
  List.foldl' (\m b -> b <> m) monolith revBuilders


-- EXTENDED COMPARISON
--
-- Override _Utils_cmp from elm/core to support structural comparison
-- of all Elm values (custom types, records, etc.), not just the types
-- that satisfy the standard `comparable` constraint.
-- Placed after kernel code so it overwrites the original definition.


extendedUtilsCmp :: B.Builder
extendedUtilsCmp =
  "function _Utils_cmp(x, y, ord) {\
  \if (typeof x !== 'object') {\
    \return x === y ? 0 : x < y ? -1 : 1; }\
  \if (x instanceof String) {\
    \var a = x.valueOf(); var b = y.valueOf();\
    \return a === b ? 0 : a < b ? -1 : 1; }\
  \if (typeof x.$ === 'undefined' || (typeof x.$ === 'string' && x.$[0] === '#')) {\
    \var keys = Object.keys(x).sort();\
    \for (var i = 0; i < keys.length; i++) {\
      \var k = keys[i];\
      \if (k === '$') continue;\
      \ord = _Utils_cmp(x[k], y[k]);\
      \if (ord) return ord; }\
    \return 0; }\
  \if (x.$ === '::' || x.$ === '[]') {\
    \for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {}\
    \return ord || (x.b ? 1 : y.b ? -1 : 0); }\
  \if (x.$ !== y.$) {\
    \return x.$ < y.$ ? -1 : 1; }\
  \var keys = Object.keys(x);\
  \for (var i = 0; i < keys.length; i++) {\
    \var k = keys[i];\
    \if (k === '$') continue;\
    \ord = _Utils_cmp(x[k], y[k]);\
    \if (ord) return ord; }\
  \return 0; }\n"


-- ADD DEPENDENCIES


addGlobal :: Mode.Mode -> Graph -> State -> Opt.Global -> State
addGlobal mode graph state@(State revKernels builders seen) global =
  if Set.member global seen then
    state
  else
    addGlobalHelp mode graph global $
      State revKernels builders (Set.insert global seen)


addGlobalHelp :: Mode.Mode -> Graph -> Opt.Global -> State -> State
addGlobalHelp mode graph global state =
  let
    addDeps deps someState =
      Set.foldl' (addGlobal mode graph) someState deps
  in
  case graph ! global of
    Opt.Define expr deps ->
      addStmt (addDeps deps state) (
        var global (Expr.generate mode expr)
      )

    Opt.DefineTailFunc argNames body deps ->
      addStmt (addDeps deps state) (
        let (Opt.Global _ name) = global in
        var global (Expr.generateTailDef mode name argNames body)
      )

    Opt.Ctor index arity ->
      addStmt state (
        var global (Expr.generateCtor mode global index arity)
      )

    Opt.Link linkedGlobal ->
      addGlobal mode graph state linkedGlobal

    Opt.Cycle names values functions deps ->
      addStmt (addDeps deps state) (
        generateCycle mode global names values functions
      )

    Opt.Manager effectsType ->
      generateManager mode graph global effectsType state

    Opt.Kernel chunks deps ->
      if isDebugger global && not (Mode.isDebug mode) then
        state
      else
        addKernel (addDeps deps state) (generateKernel mode chunks)

    Opt.Enum index ->
      addStmt state (
        generateEnum mode global index
      )

    Opt.Box ->
      addStmt (addGlobal mode graph state identity) (
        generateBox mode global
      )

    Opt.PortIncoming decoder deps ->
      addStmt (addDeps deps state) (
        generatePort mode global "incomingPort" decoder
      )

    Opt.PortOutgoing encoder deps ->
      addStmt (addDeps deps state) (
        generatePort mode global "outgoingPort" encoder
      )


addStmt :: State -> JS.Stmt -> State
addStmt state stmt =
  addBuilder state (JS.stmtToBuilder stmt)


addBuilder :: State -> B.Builder -> State
addBuilder (State revKernels revBuilders seen) builder =
  State revKernels (builder:revBuilders) seen


addKernel :: State -> B.Builder -> State
addKernel (State revKernels revBuilders seen) kernel =
  State (kernel:revKernels) revBuilders seen


var :: Opt.Global -> Expr.Code -> JS.Stmt
var (Opt.Global home name) code =
  JS.Var (JsName.fromGlobal home name) (Expr.codeToExpr code)


isDebugger :: Opt.Global -> Bool
isDebugger (Opt.Global (ModuleName.Canonical _ home) _) =
  home == Name.debugger



-- GENERATE CYCLES


generateCycle :: Mode.Mode -> Opt.Global -> [Name.Name] -> [(Name.Name, Opt.Expr)] -> [Opt.Def] -> JS.Stmt
generateCycle mode (Opt.Global home _) names values functions =
  JS.Block
    [ JS.Block $ map (generateCycleFunc mode home) functions
    , JS.Block $ map (generateSafeCycle mode home) values
    , case map (generateRealCycle home) values of
        [] ->
          JS.EmptyStmt

        realBlock@(_:_) ->
            case mode of
              Mode.Prod _ ->
                JS.Block realBlock

              Mode.Dev _ ->
                JS.Try (JS.Block realBlock) JsName.dollar $ JS.Throw $ JS.String $
                  "Some top-level definitions from `" <> Name.toBuilder (ModuleName._module home) <> "` are causing infinite recursion:\\n"
                  <> drawCycle names
                  <> "\\n\\nThese errors are very tricky, so read "
                  <> B.stringUtf8 (D.makeNakedLink "bad-recursion")
                  <> " to learn how to fix it!"
    ]


generateCycleFunc :: Mode.Mode -> ModuleName.Canonical -> Opt.Def -> JS.Stmt
generateCycleFunc mode home def =
  case def of
    Opt.Def name expr ->
      JS.Var (JsName.fromGlobal home name) (Expr.codeToExpr (Expr.generate mode expr))

    Opt.TailDef name args expr ->
      JS.Var (JsName.fromGlobal home name) (Expr.codeToExpr (Expr.generateTailDef mode name args expr))


generateSafeCycle :: Mode.Mode -> ModuleName.Canonical -> (Name.Name, Opt.Expr) -> JS.Stmt
generateSafeCycle mode home (name, expr) =
  JS.FunctionStmt (JsName.fromCycle home name) [] $
    Expr.codeToStmtList (Expr.generate mode expr)


generateRealCycle :: ModuleName.Canonical -> (Name.Name, expr) -> JS.Stmt
generateRealCycle home (name, _) =
  let
    safeName = JsName.fromCycle home name
    realName = JsName.fromGlobal home name
  in
  JS.Block
    [ JS.Var realName (JS.Call (JS.Ref safeName) [])
    , JS.ExprStmt $ JS.Assign (JS.LRef safeName) $
        JS.Function Nothing [] [ JS.Return (JS.Ref realName) ]
    ]


drawCycle :: [Name.Name] -> B.Builder
drawCycle names =
  let
    topLine       = "\\n  ┌─────┐"
    nameLine name = "\\n  │    " <> Name.toBuilder name
    midLine       = "\\n  │     ↓"
    bottomLine    = "\\n  └─────┘"
  in
  mconcat (topLine : List.intersperse midLine (map nameLine names) ++ [ bottomLine ])



-- GENERATE KERNEL


generateKernel :: Mode.Mode -> [K.Chunk] -> B.Builder
generateKernel mode chunks =
  List.foldr (addChunk mode) mempty (stripDeadDefs mode chunks)


addChunk :: Mode.Mode -> K.Chunk -> B.Builder -> B.Builder
addChunk mode chunk builder =
  case chunk of
    K.JS javascript ->
      B.byteString javascript <> builder

    K.ElmVar home name ->
      JsName.toBuilder (JsName.fromGlobal home name) <> builder

    K.JsVar home name ->
      JsName.toBuilder (JsName.fromKernel home name) <> builder

    K.ElmField name ->
      JsName.toBuilder (Expr.generateField mode name) <> builder

    K.JsField int ->
      JsName.toBuilder (JsName.fromInt int) <> builder

    K.JsEnum int ->
      B.intDec int <> builder

    K.Debug ->
      case mode of
        Mode.Dev _ ->
          builder

        Mode.Prod _ ->
          "_UNUSED" <> builder

    K.Prod ->
      case mode of
        Mode.Dev _ ->
          "_UNUSED" <> builder

        Mode.Prod _ ->
          builder



-- STRIP DEAD DEFS
--
-- When kernel JS has __Debug/__Prod variants, the inactive one gets
-- renamed with _UNUSED. This strips those dead definitions entirely,
-- tracking brace/paren counts across chunk boundaries (since a single
-- definition body may be split across K.JS chunks interleaved with
-- K.JsEnum, K.ElmField, etc.).


stripDeadDefs :: Mode.Mode -> [K.Chunk] -> [K.Chunk]
stripDeadDefs mode = go
  where
    go [] = []
    go (K.JS before : marker : rest)
      | isDeadMarker mode marker
      , not (isInlineConditional before) =
          let before' = stripTrailingDef before
              rest' = skipDeadBody 0 0 rest
          in
          prependChunk before' $ go rest'
    go (chunk : rest) = chunk : go rest

    prependChunk bs rest
      | BS.null bs = rest
      | otherwise  = K.JS bs : rest


-- | Detect inline conditionals like /**__Prod/ which end with /*
-- These use comment-based wrapping, NOT definition-level stripping.
isInlineConditional :: BS.ByteString -> Bool
isInlineConditional bs =
  not (BS.null bs) && BS.index bs (BS.length bs - 1) == 0x2A {- * -}


isDeadMarker :: Mode.Mode -> K.Chunk -> Bool
isDeadMarker mode chunk =
  case (mode, chunk) of
    (Mode.Prod _, K.Debug) -> True
    (Mode.Dev _, K.Prod) -> True
    _ -> False


-- | Skip all chunks that form the body of a dead definition.
-- Tracks brace/paren counts across K.JS chunks. Non-JS chunks
-- (K.JsEnum, K.ElmField, etc.) don't affect the count.
-- Stops when a K.JS chunk contains a newline at brace=0, paren=0.
skipDeadBody :: Int -> Int -> [K.Chunk] -> [K.Chunk]
skipDeadBody _ _ [] = []
skipDeadBody bc pc (K.JS js : rest) =
  case scanForEnd bc pc js of
    Left (bc', pc') ->
      -- Didn't find statement end in this chunk; continue scanning
      skipDeadBody bc' pc' rest
    Right remaining
      -- If the remaining text starts with '{', the scanner stopped after
      -- a parameter list (e.g., "(value)\n") but the function body hasn't
      -- been consumed yet. Continue skipping from the body.
      | not (BS.null remaining) && BS.index remaining 0 == 0x7B {- { -} ->
          skipDeadBody 0 0 (K.JS remaining : rest)
      | BS.null remaining -> rest
      | otherwise -> K.JS remaining : rest
skipDeadBody bc pc (_ : rest) =
  -- Non-JS chunks (JsEnum, ElmField, etc.) don't affect brace/paren count
  skipDeadBody bc pc rest


-- | Scan a JS ByteString for the end of the current statement.
-- Returns Left (bc', pc') if the statement continues past this chunk,
-- or Right remaining if we found the end (remaining text after it).
scanForEnd :: Int -> Int -> BS.ByteString -> Either (Int, Int) BS.ByteString
scanForEnd bc0 pc0 bs = go 0 bc0 pc0
  where
    len = BS.length bs
    go i bc pc
      | i >= len = Left (bc, pc)
      | b == 0x7B {- { -} = go (i + 1) (bc + 1) pc
      | b == 0x7D {- } -} = go (i + 1) (bc - 1) pc
      | b == 0x28 {- ( -} = go (i + 1) bc (pc + 1)
      | b == 0x29 {- ) -} = go (i + 1) bc (pc - 1)
      | b == 0x0A {- \n -} && bc <= 0 && pc <= 0 = Right (BS.drop (i + 1) bs)
      | otherwise = go (i + 1) bc pc
      where b = BS.index bs i


-- | Strip trailing "var name" or "function name" from a JS chunk.
-- e.g., "...prev;\nvar name" -> "...prev;\n"
stripTrailingDef :: BS.ByteString -> BS.ByteString
stripTrailingDef bs =
  case BS.elemIndexEnd 0x0A {-\n-} bs of
    Just idx -> BS.take (idx + 1) bs
    Nothing -> BS.empty



-- GENERATE ENUM


generateEnum :: Mode.Mode -> Opt.Global -> Index.ZeroBased -> JS.Stmt
generateEnum mode global@(Opt.Global home name) index =
  JS.Var (JsName.fromGlobal home name) $
    case mode of
      Mode.Dev _ ->
        Expr.codeToExpr (Expr.generateCtor mode global index 0)

      Mode.Prod _ ->
        JS.Int (Index.toMachine index)



-- GENERATE BOX


generateBox :: Mode.Mode -> Opt.Global -> JS.Stmt
generateBox mode global@(Opt.Global home name) =
  JS.Var (JsName.fromGlobal home name) $
    case mode of
      Mode.Dev _ ->
        Expr.codeToExpr (Expr.generateCtor mode global Index.first 1)

      Mode.Prod _ ->
        JS.Ref (JsName.fromGlobal ModuleName.basics Name.identity)


{-# NOINLINE identity #-}
identity :: Opt.Global
identity =
  Opt.Global ModuleName.basics Name.identity



-- GENERATE PORTS


generatePort :: Mode.Mode -> Opt.Global -> Name.Name -> Opt.Expr -> JS.Stmt
generatePort mode (Opt.Global home name) makePort converter =
  JS.Var (JsName.fromGlobal home name) $
    JS.Call (JS.Ref (JsName.fromKernel Name.platform makePort))
      [ JS.String (Name.toBuilder name)
      , Expr.codeToExpr (Expr.generate mode converter)
      ]



-- GENERATE MANAGER


generateManager :: Mode.Mode -> Graph -> Opt.Global -> Opt.EffectsType -> State -> State
generateManager mode graph (Opt.Global home@(ModuleName.Canonical _ moduleName) _) effectsType state =
  let
    managerLVar =
      JS.LBracket
        (JS.Ref (JsName.fromKernel Name.platform "effectManagers"))
        (JS.String (Name.toBuilder moduleName))

    (deps, args, stmts) =
      generateManagerHelp home effectsType

    createManager =
      JS.ExprStmt $ JS.Assign managerLVar $
        JS.Call (JS.Ref (JsName.fromKernel Name.platform "createManager")) args
  in
  addStmt (List.foldl' (addGlobal mode graph) state deps) $
    JS.Block (createManager : stmts)


generateLeaf :: ModuleName.Canonical -> Name.Name -> JS.Stmt
generateLeaf home@(ModuleName.Canonical _ moduleName) name =
  JS.Var (JsName.fromGlobal home name) $
    JS.Call leaf [ JS.String (Name.toBuilder moduleName) ]



{-# NOINLINE leaf #-}
leaf :: JS.Expr
leaf =
  JS.Ref (JsName.fromKernel Name.platform "leaf")


generateManagerHelp :: ModuleName.Canonical -> Opt.EffectsType -> ([Opt.Global], [JS.Expr], [JS.Stmt])
generateManagerHelp home effectsType =
  let
    dep name = Opt.Global home name
    ref name = JS.Ref (JsName.fromGlobal home name)
  in
  case effectsType of
    Opt.Cmd ->
      ( [ dep "init", dep "onEffects", dep "onSelfMsg", dep "cmdMap" ]
      , [ ref "init", ref "onEffects", ref "onSelfMsg", ref "cmdMap" ]
      , [ generateLeaf home "command" ]
      )

    Opt.Sub ->
      ( [ dep "init", dep "onEffects", dep "onSelfMsg", dep "subMap" ]
      , [ ref "init", ref "onEffects", ref "onSelfMsg", JS.Int 0, ref "subMap" ]
      , [ generateLeaf home "subscription" ]
      )

    Opt.Fx ->
      ( [ dep "init", dep "onEffects", dep "onSelfMsg", dep "cmdMap", dep "subMap" ]
      , [ ref "init", ref "onEffects", ref "onSelfMsg", ref "cmdMap", ref "subMap" ]
      , [ generateLeaf home "command"
        , generateLeaf home "subscription"
        ]
      )



-- MAIN EXPORTS


toMainExports :: Mode.Mode -> Mains -> B.Builder
toMainExports mode mains =
  let
    export = JsName.fromKernel Name.platform "export"
    exports = generateExports mode (Map.foldrWithKey addToTrie emptyTrie mains)
  in
  JsName.toBuilder export <> "(" <> exports <> ");"


generateExports :: Mode.Mode -> Trie -> B.Builder
generateExports mode (Trie maybeMain subs) =
  let
    starter end =
      case maybeMain of
        Nothing ->
          "{"

        Just (home, main) ->
          "{'init':"
          <> JS.exprToBuilder (Expr.generateMain mode home main)
          <> end
    in
    case Map.toList subs of
      [] ->
        starter "" <> "}"

      (name, subTrie) : otherSubTries ->
        starter "," <>
        "'" <> Utf8.toBuilder name <> "':"
        <> generateExports mode subTrie
        <> List.foldl' (addSubTrie mode) "}" otherSubTries


addSubTrie :: Mode.Mode -> B.Builder -> (Name.Name, Trie) -> B.Builder
addSubTrie mode end (name, trie) =
  ",'" <> Utf8.toBuilder name <> "':" <> generateExports mode trie <> end



-- BUILD TRIES


data Trie =
  Trie
    { _main :: Maybe (ModuleName.Canonical, Opt.Main)
    , _subs :: Map.Map Name.Name Trie
    }


emptyTrie :: Trie
emptyTrie =
  Trie Nothing Map.empty


addToTrie :: ModuleName.Canonical -> Opt.Main -> Trie -> Trie
addToTrie home@(ModuleName.Canonical _ moduleName) main trie =
  merge trie $ segmentsToTrie home (Name.splitDots moduleName) main


segmentsToTrie :: ModuleName.Canonical -> [Name.Name] -> Opt.Main -> Trie
segmentsToTrie home segments main =
  case segments of
    [] ->
      Trie (Just (home, main)) Map.empty

    segment : otherSegments ->
      Trie Nothing (Map.singleton segment (segmentsToTrie home otherSegments main))


merge :: Trie -> Trie -> Trie
merge (Trie main1 subs1) (Trie main2 subs2) =
  Trie
    (checkedMerge main1 main2)
    (Map.unionWith merge subs1 subs2)


checkedMerge :: Maybe a -> Maybe a -> Maybe a
checkedMerge a b =
  case (a, b) of
    (Nothing, main) ->
      main

    (main, Nothing) ->
      main

    (Just _, Just _) ->
      error "cannot have two modules with the same name"

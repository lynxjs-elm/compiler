{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
module Generate.Html
  ( sandwich
  , sandwichReactor
  )
  where


import qualified Data.ByteString.Builder as B
import qualified Data.Name as Name
import Text.RawString.QQ (r)



-- SANDWICH


sandwich :: Name.Name -> B.Builder -> B.Builder
sandwich moduleName javascript =
  let name = Name.toBuilder moduleName in
  [r|<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>LynxJS-Elm</title>
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
</style>
</head>
<body>
<script>
|] <> polyfill <> [r|
</script>
<script>
|] <> javascript <> [r|
var app = Elm.|] <> name <> [r|.init({});
</script>
</body>
</html>
|]



-- REACTOR SANDWICH (with live reload)


sandwichReactor :: Name.Name -> B.Builder -> B.Builder
sandwichReactor moduleName javascript =
  let name = Name.toBuilder moduleName in
  [r|<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>LynxJS-Elm</title>
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
</style>
</head>
<body>
<script>
|] <> polyfill <> [r|
</script>
<script>
|] <> javascript <> [r|
var app = Elm.|] <> name <> [r|.init({});
</script>
<script>
|] <> reloadScript <> [r|
</script>
</body>
</html>
|]



-- LIVE RELOAD SCRIPT


reloadScript :: B.Builder
reloadScript = [r|
(function() {
  var lastMtime = null;
  function poll() {
    fetch('/_elm/watch')
      .then(function(r) { return r.text(); })
      .then(function(mtime) {
        if (lastMtime === null) { lastMtime = mtime; }
        else if (mtime !== lastMtime) { location.reload(); }
        setTimeout(poll, 500);
      })
      .catch(function() { setTimeout(poll, 2000); });
  }
  poll();
})();
|]



-- PAPI POLYFILL


polyfill :: B.Builder
polyfill = [r|
// LynxJS PAPI-to-DOM polyfill for browser preview
(function() {
  var eventMap = {
    'tap': 'click',
    'longpress': 'contextmenu',
    'touchstart': 'touchstart',
    'touchmove': 'touchmove',
    'touchend': 'touchend',
    'touchcancel': 'touchcancel',
    'input': 'input'
  };

  var g = typeof globalThis !== 'undefined' ? globalThis : window;

  function makeEl(domTag, lynxTag) {
    var el = document.createElement(domTag);
    el.setAttribute('data-lynx-tag', lynxTag);
    return el;
  }

  g.__CreatePage = function() {
    var page = document.createElement('div');
    page.id = 'lynx-page';
    document.body.appendChild(page);
    return page;
  };

  g.__CreateView = function() { return makeEl('div', 'view'); };
  g.__CreateText = function() { return makeEl('span', 'text'); };
  g.__CreateImage = function() { return makeEl('img', 'image'); };

  g.__CreateRawText = function(text) {
    var el = document.createElement('span');
    el.setAttribute('data-lynx-tag', 'raw-text');
    el.textContent = text;
    return el;
  };

  g.__AppendElement = function(parent, child) {
    parent.appendChild(child);
  };

  g.__RemoveElement = function(parent, child) {
    parent.removeChild(child);
  };

  g.__ReplaceElement = function(parent, newEl, oldEl) {
    parent.replaceChild(newEl, oldEl);
  };

  g.__InsertElementBefore = function(parent, child, ref) {
    parent.insertBefore(child, ref);
  };

  g.__SetAttribute = function(el, key, value) {
    if (key === 'text') {
      el.textContent = value;
    } else if (key === 'src' && el.tagName === 'IMG') {
      el.src = value;
    } else {
      el.setAttribute(key, value);
    }
  };

  g.__AddEvent = function(el, bindingName, eventName, handler) {
    var domEvent = eventMap[eventName] || eventName;
    var fn = typeof handler === 'function' ? handler : handler.value;
    el.addEventListener(domEvent, function(e) { fn(e); });
  };

  g.__SetInlineStyles = function(el, styles) {
    Object.assign(el.style, styles);
  };

  g.__GetChildren = function(el) {
    return Array.from(el.children);
  };

  g.__GetParent = function(el) {
    return el.parentNode;
  };

  g.__FlushElementTree = function() {};

  // Set up root page so _Browser_newPage() finds it
  g.page = g.__CreatePage();
})();
|]

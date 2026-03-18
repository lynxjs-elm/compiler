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
  var tagMap = {
    'view': 'div',
    'text': 'span',
    'image': 'img',
    'scroll-view': 'div',
    'input': 'input',
    'textarea': 'textarea',
    'list': 'div'
  };

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

  g.__CreatePage = function() {
    var page = document.createElement('div');
    page.id = 'lynx-page';
    document.body.appendChild(page);
    return page;
  };

  g.__CreateElement = function(tag) {
    var domTag = tagMap[tag] || 'div';
    var el = document.createElement(domTag);
    if (tag === 'scroll-view') { el.style.overflow = 'auto'; }
    el.setAttribute('data-lynx-tag', tag);
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
    if (key === 'content' && el.getAttribute('data-lynx-tag') === 'text') {
      el.textContent = value;
    } else if (key === 'src' && el.tagName === 'IMG') {
      el.src = value;
    } else {
      el.setAttribute(key, value);
    }
  };

  g.__AddEvent = function(el, bindingName, eventName, callback) {
    var domEvent = eventMap[eventName] || eventName;
    el.addEventListener(domEvent, function(e) {
      callback(e);
    });
  };

  g.__SetInlineStyles = function(el, styles) {
    Object.assign(el.style, styles);
  };

  g.__AddInlineStyle = function(el, key, value) {
    el.style[key] = value;
  };

  g.__GetChildren = function(el) {
    return Array.from(el.children);
  };

  g.__GetParent = function(el) {
    return el.parentNode;
  };
})();
|]

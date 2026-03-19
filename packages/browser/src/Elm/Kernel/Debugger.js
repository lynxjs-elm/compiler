/*

import Debugger.Expando as Expando exposing (S, Primitive, Sequence, Dictionary, Record, Constructor, ListSeq, SetSeq, ArraySeq)
import Debugger.Main as Main exposing (getUserModel, wrapInit, wrapUpdate, wrapSubs, cornerView, popoutView, NoOp, UserMsg, Up, Down, toBlockerType, initialWindowWidth, initialWindowHeight)
import Debugger.Overlay as Overlay exposing (BlockNone, BlockMost)
import Elm.Kernel.Browser exposing (makeAnimator)
import Elm.Kernel.Debug exposing (crash)
import Elm.Kernel.Json exposing (wrap)
import Elm.Kernel.List exposing (Cons, Nil)
import Elm.Kernel.Platform exposing (initialize)
import Elm.Kernel.Scheduler exposing (binding, succeed)
import Elm.Kernel.Utils exposing (Tuple0, Tuple2, ap)
import Elm.Kernel.VirtualDom exposing (node, applyPatches, diff, render, map)
import Json.Decode as Json exposing (map)
import List exposing (map, reverse)
import Maybe exposing (Just, Nothing)
import Set exposing (foldr)
import Dict exposing (foldr, empty, insert)
import Array exposing (foldr)

*/



// LYNXJS PAPI WRAPPERS

var _Debugger_lynx = (typeof globalThis !== 'undefined' ? globalThis : scope);
var _Debugger_createPage = _Debugger_lynx['_' + '_CreatePage'] || function() { return {}; };
var _Debugger_appendChild = _Debugger_lynx['_' + '_AppendElement'] || function() {};



// HELPERS


function _Debugger_unsafeCoerce(value)
{
	return value;
}



// PROGRAMS
//
// LynxJS debugger: runs the app without debug overlay since LynxJS
// has no popout windows or DOM-based debug UI. The debug wrapping
// (message history, model snapshots) still works for potential
// port-based debugging tools.


var _Debugger_element = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return __Platform_initialize(
		flagDecoder,
		args,
		A3(__Main_wrapInit, __Json_wrap(debugMetadata), _Debugger_popout(), impl.__$init),
		__Main_wrapUpdate(impl.__$update),
		__Main_wrapSubs(impl.__$subscriptions),
		function(sendToApp, initialModel)
		{
			var view = impl.__$view;

			// Create root element
			var domNode = args['node'] || _Debugger_createPage();

			// Render initial view
			var currNode = A2(__VirtualDom_map, __Main_UserMsg, view(__Main_getUserModel(initialModel)));
			var currDomNode = __VirtualDom_render(currNode, sendToApp);
			_Debugger_appendChild(domNode, currDomNode);

			initialModel.__$popout.__sendToApp = sendToApp;

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = A2(__VirtualDom_map, __Main_UserMsg, view(__Main_getUserModel(model)));
				var patches = __VirtualDom_diff(currNode, nextNode);
				currDomNode = __VirtualDom_applyPatches(currDomNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});


var _Debugger_document = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return __Platform_initialize(
		flagDecoder,
		args,
		A3(__Main_wrapInit, __Json_wrap(debugMetadata), _Debugger_popout(), impl.__$init),
		__Main_wrapUpdate(impl.__$update),
		__Main_wrapSubs(impl.__$subscriptions),
		function(sendToApp, initialModel)
		{
			var view = impl.__$view;

			// Create root element
			var rootNode = args['node'] || _Debugger_createPage();

			// Render initial view
			var doc = view(__Main_getUserModel(initialModel));
			var currNode = __VirtualDom_node('view')(__List_Nil)(
				A2(__List_map, __VirtualDom_map(__Main_UserMsg), doc.__$body)
			);
			var currDomNode = __VirtualDom_render(currNode, sendToApp);
			_Debugger_appendChild(rootNode, currDomNode);

			initialModel.__$popout.__sendToApp = sendToApp;

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var doc = view(__Main_getUserModel(model));
				var nextNode = __VirtualDom_node('view')(__List_Nil)(
					A2(__List_map, __VirtualDom_map(__Main_UserMsg), doc.__$body)
				);
				var patches = __VirtualDom_diff(currNode, nextNode);
				currDomNode = __VirtualDom_applyPatches(currDomNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});


function _Debugger_popout()
{
	return {
		__doc: undefined,
		__sendToApp: undefined
	};
}

function _Debugger_isOpen(popout)
{
	return false;
}

function _Debugger_open(popout)
{
	return __Scheduler_binding(function(callback)
	{
		// No popout windows in LynxJS
		callback(__Scheduler_succeed(__Utils_Tuple0));
	});
}


// SCROLL (no-ops in LynxJS)


function _Debugger_scroll(popout)
{
	return __Scheduler_binding(function(callback)
	{
		callback(__Scheduler_succeed(__Utils_Tuple0));
	});
}


var _Debugger_scrollTo = F2(function(id, popout)
{
	return __Scheduler_binding(function(callback)
	{
		callback(__Scheduler_succeed(__Utils_Tuple0));
	});
});



// UPLOAD / DOWNLOAD (no-ops in LynxJS)


function _Debugger_upload(popout)
{
	return __Scheduler_binding(function(callback)
	{
		// File upload not available in LynxJS
		callback(__Scheduler_succeed(''));
	});
}


var _Debugger_download = F2(function(historyLength, json)
{
	return __Scheduler_binding(function(callback)
	{
		// File download not available in LynxJS
		callback(__Scheduler_succeed(__Utils_Tuple0));
	});
});



// POPOUT CONTENT


function _Debugger_messageToString(value)
{
	if (typeof value === 'boolean')
	{
		return value ? 'True' : 'False';
	}

	if (typeof value === 'number')
	{
		return value + '';
	}

	if (typeof value === 'string')
	{
		return '"' + _Debugger_addSlashes(value, false) + '"';
	}

	if (value instanceof String)
	{
		return "'" + _Debugger_addSlashes(value, true) + "'";
	}

	if (typeof value !== 'object' || value === null || !('$' in value))
	{
		return '...';
	}

	if (typeof value.$ === 'number')
	{
		return '...';
	}

	var code = value.$.charCodeAt(0);
	if (code === 0x23 /* # */ || /* a */ 0x61 <= code && code <= 0x7A /* z */)
	{
		return '...';
	}

	if (['Array_elm_builtin', 'Set_elm_builtin', 'RBNode_elm_builtin', 'RBEmpty_elm_builtin'].indexOf(value.$) >= 0)
	{
		return '...';
	}

	var keys = Object.keys(value);
	switch (keys.length)
	{
		case 1:
			return value.$;
		case 2:
			return value.$ + ' ' + _Debugger_messageToString(value.a);
		default:
			return value.$ + ' ... ' + _Debugger_messageToString(value[keys[keys.length - 1]]);
	}
}


function _Debugger_init(value)
{
	if (typeof value === 'boolean')
	{
		return A3(__Expando_Constructor, __Maybe_Just(value ? 'True' : 'False'), true, __List_Nil);
	}

	if (typeof value === 'number')
	{
		return __Expando_Primitive(value + '');
	}

	if (typeof value === 'string')
	{
		return __Expando_S('"' + _Debugger_addSlashes(value, false) + '"');
	}

	if (value instanceof String)
	{
		return __Expando_S("'" + _Debugger_addSlashes(value, true) + "'");
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (tag === '::' || tag === '[]')
		{
			return A3(__Expando_Sequence, __Expando_ListSeq, true,
				A2(__List_map, _Debugger_init, value)
			);
		}

		if (tag === 'Set_elm_builtin')
		{
			return A3(__Expando_Sequence, __Expando_SetSeq, true,
				A3(__Set_foldr, _Debugger_initCons, __List_Nil, value)
			);
		}

		if (tag === 'RBNode_elm_builtin' || tag == 'RBEmpty_elm_builtin')
		{
			return A2(__Expando_Dictionary, true,
				A3(__Dict_foldr, _Debugger_initKeyValueCons, __List_Nil, value)
			);
		}

		if (tag === 'Array_elm_builtin')
		{
			return A3(__Expando_Sequence, __Expando_ArraySeq, true,
				A3(__Array_foldr, _Debugger_initCons, __List_Nil, value)
			);
		}

		if (typeof tag === 'number')
		{
			return __Expando_Primitive('<internals>');
		}

		var char = tag.charCodeAt(0);
		if (char === 35 || 65 <= char && char <= 90)
		{
			var list = __List_Nil;
			for (var i in value)
			{
				if (i === '$') continue;
				list = __List_Cons(_Debugger_init(value[i]), list);
			}
			return A3(__Expando_Constructor, char === 35 ? __Maybe_Nothing : __Maybe_Just(tag), true, __List_reverse(list));
		}

		return __Expando_Primitive('<internals>');
	}

	if (typeof value === 'object')
	{
		var dict = __Dict_empty;
		for (var i in value)
		{
			dict = A3(__Dict_insert, i, _Debugger_init(value[i]), dict);
		}
		return A2(__Expando_Record, true, dict);
	}

	return __Expando_Primitive('<internals>');
}

var _Debugger_initCons = F2(function initConsHelp(value, list)
{
	return __List_Cons(_Debugger_init(value), list);
});

var _Debugger_initKeyValueCons = F3(function(key, value, list)
{
	return __List_Cons(
		__Utils_Tuple2(_Debugger_init(key), _Debugger_init(value)),
		list
	);
});

function _Debugger_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');
	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}



// BLOCK EVENTS (no-ops in LynxJS)


function _Debugger_updateBlocker(oldBlocker, newBlocker)
{
	// Event blocking not applicable in LynxJS
}

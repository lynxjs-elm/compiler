/*

import Dict exposing (empty, update)
import Elm.Kernel.Scheduler exposing (binding, fail, rawSpawn, succeed)
import Elm.Kernel.Utils exposing (Tuple2)
import Http exposing (BadUrl_, Timeout_, NetworkError_, BadStatus_, GoodStatus_, Sending, Receiving)
import Maybe exposing (Just, Nothing, isJust)
import Platform exposing (sendToApp, sendToSelf)
import Result exposing (map, isOk)

*/


// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return __Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.__$expect.__toValue(response)));
		}

		var controller = new AbortController();
		var isAborted = false;

		// Timeout
		var timeoutMs = request.__$timeout.a || 0;
		var timeoutId = 0;
		if (timeoutMs > 0)
		{
			timeoutId = setTimeout(function() {
				isAborted = true;
				controller.abort();
				done(__Http_Timeout_);
			}, timeoutMs);
		}

		// Headers
		var headers = {};
		for (var h = request.__$headers; h.b; h = h.b) // WHILE_CONS
		{
			headers[h.a.a] = h.a.b;
		}
		if (request.__$body.a)
		{
			headers['Content-Type'] = request.__$body.a;
		}

		// Options
		var options = {
			method: request.__$method,
			headers: headers,
			signal: controller.signal
		};
		if (request.__$body.b)
		{
			options.body = request.__$body.b;
		}

		// Validate URL
		var url = request.__$url;
		try { new URL(url, 'http://localhost'); }
		catch (e) { return done(__Http_BadUrl_(url)); }

		// Fetch
		fetch(url, options).then(function(response)
		{
			var bodyPromise = request.__$expect.__type === 'arraybuffer'
				? response.arrayBuffer()
				: response.text();

			return bodyPromise.then(function(body)
			{
				if (timeoutId) { clearTimeout(timeoutId); }

				var metadata = {
					__$url: response.url || url,
					__$statusCode: response.status,
					__$statusText: response.statusText,
					__$headers: _Http_parseHeaders(response.headers)
				};

				var toBody = request.__$expect.__toBody;
				done(A2(
					200 <= response.status && response.status < 300 ? __Http_GoodStatus_ : __Http_BadStatus_,
					metadata,
					toBody(body)
				));
			});
		}).catch(function(e)
		{
			if (timeoutId) { clearTimeout(timeoutId); }
			if (!isAborted)
			{
				done(__Http_NetworkError_);
			}
		});

		// Tracker
		__Maybe_isJust(request.__$tracker) && _Http_track(router, controller, request.__$tracker.a);

		return function() { isAborted = true; controller.abort(); };
	});
});


// HEADERS

function _Http_parseHeaders(headers)
{
	var dict = __Dict_empty;
	headers.forEach(function(value, key)
	{
		dict = A3(__Dict_update, key, function(oldValue) {
			return __Maybe_Just(__Maybe_isJust(oldValue)
				? value + ', ' + oldValue.a
				: value
			);
		}, dict);
	});
	return dict;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		__type: type,
		__toBody: toBody,
		__toValue: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		__type: expect.__type,
		__toBody: expect.__toBody,
		__toValue: function(x) { return func(expect.__toValue(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, controller, tracker)
{
	// fetch does not support upload/download progress events natively.
	// Progress subscriptions will not fire, but the tracker still enables
	// cancellation via Http.cancel.
}

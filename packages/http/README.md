# lynxjs-elm/http

HTTP requests for Elm on LynxJS. Replaces XMLHttpRequest with the Fetch API and AbortController.

## Setup

Add to your `elm.json`:

```json
{
    "dependencies": {
        "direct": {
            "lynxjs-elm/http": "1.0.0"
        }
    }
}
```

## Module: Http

```elm
import Http
```

### Basic Requests

```elm
get :
    { url : String
    , expect : Expect msg
    }
    -> Cmd msg
```

```elm
post :
    { url : String
    , body : Body
    , expect : Expect msg
    }
    -> Cmd msg
```

```elm
request :
    { method : String
    , headers : List Header
    , url : String
    , body : Body
    , expect : Expect msg
    , timeout : Maybe Float
    , tracker : Maybe String
    }
    -> Cmd msg
```

Full-control request. `timeout` is in milliseconds. `tracker` enables cancellation via `cancel`.

### Headers

```elm
type Header

header : String -> String -> Header
```

### Request Bodies

```elm
type Body

emptyBody     : Body
stringBody    : String -> String -> Body          -- MIME type, content
jsonBody      : Json.Value -> Body
bytesBody     : String -> Bytes -> Body           -- MIME type, bytes
fileBody      : File -> Body
multipartBody : List Part -> Body
```

```elm
type Part

stringPart : String -> String -> Part             -- name, value
filePart   : String -> File -> Part               -- name, file
bytesPart  : String -> String -> Bytes -> Part    -- name, MIME type, bytes
```

### Response Handling

```elm
type Expect msg
```

```elm
expectString   : (Result Error String -> msg) -> Expect msg
expectJson     : (Result Error a -> msg) -> Json.Decoder a -> Expect msg
expectBytes    : (Result Error a -> msg) -> Bytes.Decoder a -> Expect msg
expectWhatever : (Result Error () -> msg) -> Expect msg
```

For custom error handling:

```elm
expectStringResponse : (Result x a -> msg) -> (Response String -> Result x a) -> Expect msg
expectBytesResponse  : (Result x a -> msg) -> (Response Bytes -> Result x a) -> Expect msg
```

### Types

```elm
type Error
    = BadUrl String
    | Timeout
    | NetworkError
    | BadStatus Int
    | BadBody String
```

```elm
type Response body
    = BadUrl_ String
    | Timeout_
    | NetworkError_
    | BadStatus_ Metadata body
    | GoodStatus_ Metadata body
```

```elm
type alias Metadata =
    { url : String
    , statusCode : Int
    , statusText : String
    , headers : Dict String String
    }
```

### Progress Tracking

```elm
track : String -> (Progress -> msg) -> Sub msg
```

Subscribe to progress updates for a tracked request. Note: the Fetch API has limited progress support — tracking primarily enables cancellation.

```elm
type Progress
    = Sending { sent : Int, size : Int }
    | Receiving { received : Int, size : Maybe Int }

fractionSent     : { sent : Int, size : Int } -> Float
fractionReceived : { received : Int, size : Maybe Int } -> Float
```

```elm
cancel : String -> Cmd msg
```

Cancel a tracked request by its tracker name. Uses AbortController under the hood.

### Task API

```elm
task :
    { method : String
    , headers : List Header
    , url : String
    , body : Body
    , resolver : Resolver x a
    , timeout : Maybe Float
    }
    -> Task x a
```

```elm
type Resolver x a

stringResolver : (Response String -> Result x a) -> Resolver x a
bytesResolver  : (Response Bytes -> Result x a) -> Resolver x a
```

### Risky Requests

```elm
riskyRequest : { ... } -> Cmd msg
riskyTask    : { ... } -> Task x a
```

Same as `request`/`task` but allows cookies from other domains (CORS credentials).

### Example

```elm
import Http
import Json.Decode as D

type Msg
    = GotQuote (Result Http.Error String)

getQuote : Cmd Msg
getQuote =
    Http.get
        { url = "https://api.example.com/quote"
        , expect = Http.expectJson GotQuote (D.field "quote" D.string)
        }
```

---

## License

BSD-3-Clause

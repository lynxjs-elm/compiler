module Crypto.Cipher exposing
    ( Key, Nonce
    , keyFromHex, keyToHex
    , nonceFromHex, nonceToHex
    , encrypt, decrypt
    )

{-| Authenticated encryption using XSalsa20-Poly1305 (NaCl secretbox).
All data is hex-encoded.

Ciphertext includes the 16-byte authentication tag prepended automatically.
Decryption returns `Nothing` if authentication fails (tampered data or wrong key/nonce).

# Types
@docs Key, Nonce

# Key & Nonce Construction
@docs keyFromHex, keyToHex
@docs nonceFromHex, nonceToHex

# Encrypt / Decrypt
@docs encrypt, decrypt
-}

import Elm.Kernel.Crypto


{-| A 256-bit (32-byte) symmetric key. -}
type Key = Key


{-| A 192-bit (24-byte) nonce. Large enough for safe random generation
since collision probability is negligible.

**Important:** Never reuse a nonce with the same key.
-}
type Nonce = Nonce


{-| Parse a hex-encoded key (32 bytes / 64 hex chars). -}
keyFromHex : String -> Maybe Key
keyFromHex =
    Elm.Kernel.Crypto.cipherKeyFromHex


{-| Get the hex representation of a key. -}
keyToHex : Key -> String
keyToHex =
    Elm.Kernel.Crypto.cipherKeyToHex


{-| Parse a hex-encoded 24-byte nonce (48 hex chars). -}
nonceFromHex : String -> Maybe Nonce
nonceFromHex =
    Elm.Kernel.Crypto.cipherNonce24FromHex


{-| Get the hex representation of a nonce. -}
nonceToHex : Nonce -> String
nonceToHex =
    Elm.Kernel.Crypto.cipherNonce24ToHex


{-| Encrypt with XSalsa20-Poly1305. Returns hex-encoded ciphertext
with prepended 16-byte authentication tag.
-}
encrypt : Key -> Nonce -> String -> String
encrypt =
    Elm.Kernel.Crypto.encrypt


{-| Decrypt with XSalsa20-Poly1305. Returns `Nothing` if authentication fails. -}
decrypt : Key -> Nonce -> String -> Maybe String
decrypt =
    Elm.Kernel.Crypto.decrypt

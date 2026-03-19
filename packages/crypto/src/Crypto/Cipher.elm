module Crypto.Cipher exposing
    ( Key, Nonce12, Nonce24
    , keyFromHex, keyToHex
    , nonce12FromHex, nonce12ToHex
    , nonce24FromHex, nonce24ToHex
    , aesGcmEncrypt, aesGcmDecrypt
    , chacha20Encrypt, chacha20Decrypt
    , xchacha20Encrypt, xchacha20Decrypt
    )

{-| Authenticated encryption (AEAD) using AES-GCM, ChaCha20-Poly1305, and
XChaCha20-Poly1305. All data is hex-encoded.

Ciphertext includes the 16-byte authentication tag appended automatically.
Decryption returns `Nothing` if authentication fails (tampered data or wrong key/nonce).

# Types
@docs Key, Nonce12, Nonce24

# Key & Nonce Construction
@docs keyFromHex, keyToHex
@docs nonce12FromHex, nonce12ToHex
@docs nonce24FromHex, nonce24ToHex

# AES-256-GCM
@docs aesGcmEncrypt, aesGcmDecrypt

# ChaCha20-Poly1305
@docs chacha20Encrypt, chacha20Decrypt

# XChaCha20-Poly1305
@docs xchacha20Encrypt, xchacha20Decrypt
-}

import Elm.Kernel.Crypto


{-| A 256-bit (32-byte) symmetric key. Used by all ciphers. -}
type Key = Key


{-| A 96-bit (12-byte) nonce. Used by AES-GCM and ChaCha20-Poly1305.

**Important:** Never reuse a nonce with the same key. Each (key, nonce) pair
must be unique across all messages.
-}
type Nonce12 = Nonce12


{-| A 192-bit (24-byte) nonce. Used by XChaCha20-Poly1305.

Larger nonces are safer for random generation since collision probability
is negligible.
-}
type Nonce24 = Nonce24


{-| Parse a hex-encoded key (32 bytes / 64 hex chars). -}
keyFromHex : String -> Maybe Key
keyFromHex =
    Elm.Kernel.Crypto.cipherKeyFromHex


{-| Get the hex representation of a key. -}
keyToHex : Key -> String
keyToHex =
    Elm.Kernel.Crypto.cipherKeyToHex


{-| Parse a hex-encoded 12-byte nonce (24 hex chars). -}
nonce12FromHex : String -> Maybe Nonce12
nonce12FromHex =
    Elm.Kernel.Crypto.cipherNonce12FromHex


{-| Get the hex representation of a 12-byte nonce. -}
nonce12ToHex : Nonce12 -> String
nonce12ToHex =
    Elm.Kernel.Crypto.cipherNonce12ToHex


{-| Parse a hex-encoded 24-byte nonce (48 hex chars). -}
nonce24FromHex : String -> Maybe Nonce24
nonce24FromHex =
    Elm.Kernel.Crypto.cipherNonce24FromHex


{-| Get the hex representation of a 24-byte nonce. -}
nonce24ToHex : Nonce24 -> String
nonce24ToHex =
    Elm.Kernel.Crypto.cipherNonce24ToHex


{-| Encrypt with AES-256-GCM. Returns ciphertext with appended 16-byte auth tag.
-}
aesGcmEncrypt : Key -> Nonce12 -> String -> String
aesGcmEncrypt =
    Elm.Kernel.Crypto.aesGcmEncrypt


{-| Decrypt with AES-256-GCM. Returns `Nothing` if authentication fails. -}
aesGcmDecrypt : Key -> Nonce12 -> String -> Maybe String
aesGcmDecrypt =
    Elm.Kernel.Crypto.aesGcmDecrypt


{-| Encrypt with ChaCha20-Poly1305. Returns ciphertext with appended 16-byte auth tag.
-}
chacha20Encrypt : Key -> Nonce12 -> String -> String
chacha20Encrypt =
    Elm.Kernel.Crypto.chacha20Encrypt


{-| Decrypt with ChaCha20-Poly1305. Returns `Nothing` if authentication fails. -}
chacha20Decrypt : Key -> Nonce12 -> String -> Maybe String
chacha20Decrypt =
    Elm.Kernel.Crypto.chacha20Decrypt


{-| Encrypt with XChaCha20-Poly1305. Returns ciphertext with appended 16-byte auth tag.
Uses a 24-byte nonce which is safer for random nonce generation.
-}
xchacha20Encrypt : Key -> Nonce24 -> String -> String
xchacha20Encrypt =
    Elm.Kernel.Crypto.xchacha20Encrypt


{-| Decrypt with XChaCha20-Poly1305. Returns `Nothing` if authentication fails. -}
xchacha20Decrypt : Key -> Nonce24 -> String -> Maybe String
xchacha20Decrypt =
    Elm.Kernel.Crypto.xchacha20Decrypt

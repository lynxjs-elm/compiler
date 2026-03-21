module Crypto.X25519 exposing
    ( PrivateKey, PublicKey
    , privateKeyFromHex, privateKeyToHex
    , publicKeyFromHex, publicKeyToHex
    , getPublicKey
    , getSharedSecret
    )

{-| X25519 Diffie-Hellman key exchange (Curve25519 Montgomery form).

All byte data is represented as hex-encoded strings.

# Types
@docs PrivateKey, PublicKey

# Key Conversion
@docs privateKeyFromHex, privateKeyToHex
@docs publicKeyFromHex, publicKeyToHex

# Operations
@docs getPublicKey, getSharedSecret
-}

import Elm.Kernel.Crypto


{-| An opaque X25519 private key. -}
type PrivateKey = PrivateKey


{-| An opaque X25519 public key. -}
type PublicKey = PublicKey


{-| Parse a hex-encoded private key (32 bytes / 64 hex chars). -}
privateKeyFromHex : String -> Maybe PrivateKey
privateKeyFromHex =
    Elm.Kernel.Crypto.x25519PrivateKeyFromHex


{-| Get the hex representation of a private key. -}
privateKeyToHex : PrivateKey -> String
privateKeyToHex =
    Elm.Kernel.Crypto.x25519PrivateKeyToHex


{-| Parse a hex-encoded public key (32 bytes / 64 hex chars). -}
publicKeyFromHex : String -> Maybe PublicKey
publicKeyFromHex =
    Elm.Kernel.Crypto.x25519PublicKeyFromHex


{-| Get the hex representation of a public key. -}
publicKeyToHex : PublicKey -> String
publicKeyToHex =
    Elm.Kernel.Crypto.x25519PublicKeyToHex


{-| Derive the public key from a private key. -}
getPublicKey : PrivateKey -> PublicKey
getPublicKey =
    Elm.Kernel.Crypto.x25519GetPublicKey


{-| Compute an ECDH shared secret. Returns the hex-encoded shared point
(32 bytes / 64 hex chars). Both parties derive the same secret.
-}
getSharedSecret : PrivateKey -> PublicKey -> String
getSharedSecret =
    Elm.Kernel.Crypto.x25519GetSharedSecret

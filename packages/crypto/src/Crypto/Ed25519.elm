module Crypto.Ed25519 exposing
    ( PrivateKey, PublicKey, Signature
    , privateKeyFromHex, privateKeyToHex
    , publicKeyFromHex, publicKeyToHex
    , signatureFromHex, signatureToHex
    , getPublicKey
    , sign, verify
    )

{-| Elliptic curve operations for Ed25519 (EdDSA).

All byte data is represented as hex-encoded strings. Unlike secp256k1/P-256,
Ed25519 `sign` takes the raw message (not a pre-hash).

# Types
@docs PrivateKey, PublicKey, Signature

# Key Conversion
@docs privateKeyFromHex, privateKeyToHex
@docs publicKeyFromHex, publicKeyToHex

# Signature Conversion
@docs signatureFromHex, signatureToHex

# Operations
@docs getPublicKey, sign, verify
-}

import Elm.Kernel.Crypto


{-| An opaque Ed25519 private key. -}
type PrivateKey = PrivateKey


{-| An opaque Ed25519 public key. -}
type PublicKey = PublicKey


{-| An opaque Ed25519 signature. -}
type Signature = Signature


{-| Parse a hex-encoded private key (32 bytes / 64 hex chars). -}
privateKeyFromHex : String -> Maybe PrivateKey
privateKeyFromHex =
    Elm.Kernel.Crypto.ed25519PrivateKeyFromHex


{-| Get the hex representation of a private key. -}
privateKeyToHex : PrivateKey -> String
privateKeyToHex =
    Elm.Kernel.Crypto.ed25519PrivateKeyToHex


{-| Parse a hex-encoded public key (32 bytes / 64 hex chars). Returns
`Nothing` if the point is not on the curve.
-}
publicKeyFromHex : String -> Maybe PublicKey
publicKeyFromHex =
    Elm.Kernel.Crypto.ed25519PublicKeyFromHex


{-| Get the hex representation of a public key. -}
publicKeyToHex : PublicKey -> String
publicKeyToHex =
    Elm.Kernel.Crypto.ed25519PublicKeyToHex


{-| Parse a hex-encoded signature (64 bytes / 128 hex chars). -}
signatureFromHex : String -> Maybe Signature
signatureFromHex =
    Elm.Kernel.Crypto.ed25519SignatureFromHex


{-| Get the hex representation of a signature. -}
signatureToHex : Signature -> String
signatureToHex =
    Elm.Kernel.Crypto.ed25519SignatureToHex


{-| Derive the public key from a private key. -}
getPublicKey : PrivateKey -> PublicKey
getPublicKey =
    Elm.Kernel.Crypto.ed25519GetPublicKey


{-| Sign a message. The first argument is the hex-encoded message bytes
(raw message, not a hash -- Ed25519 hashes internally with SHA-512).
-}
sign : String -> PrivateKey -> Signature
sign =
    Elm.Kernel.Crypto.ed25519Sign


{-| Verify a signature against a message and public key. -}
verify : Signature -> String -> PublicKey -> Bool
verify =
    Elm.Kernel.Crypto.ed25519Verify

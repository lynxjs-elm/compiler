module Crypto.P256 exposing
    ( PrivateKey, PublicKey, Signature
    , privateKeyFromHex, privateKeyToHex
    , publicKeyFromHex, publicKeyToHex
    , signatureFromCompactHex, signatureFromDerHex
    , signatureToCompactHex, signatureToDerHex
    , getPublicKey
    , sign, verify
    , getSharedSecret
    )

{-| Elliptic curve operations for NIST P-256 (secp256r1, prime256v1).

All byte data is represented as hex-encoded strings.

# Types
@docs PrivateKey, PublicKey, Signature

# Key Conversion
@docs privateKeyFromHex, privateKeyToHex
@docs publicKeyFromHex, publicKeyToHex

# Signature Conversion
@docs signatureFromCompactHex, signatureFromDerHex
@docs signatureToCompactHex, signatureToDerHex

# Operations
@docs getPublicKey, sign, verify, getSharedSecret
-}

import Elm.Kernel.Crypto


{-| An opaque P-256 private key. -}
type PrivateKey = PrivateKey


{-| An opaque P-256 public key (compressed). -}
type PublicKey = PublicKey


{-| An opaque P-256 ECDSA signature. -}
type Signature = Signature


{-| Parse a hex-encoded private key (32 bytes / 64 hex chars). Returns
`Nothing` if the hex is invalid or not a valid scalar.
-}
privateKeyFromHex : String -> Maybe PrivateKey
privateKeyFromHex =
    Elm.Kernel.Crypto.p256PrivateKeyFromHex


{-| Get the hex representation of a private key. -}
privateKeyToHex : PrivateKey -> String
privateKeyToHex =
    Elm.Kernel.Crypto.p256PrivateKeyToHex


{-| Parse a hex-encoded public key (compressed 33 bytes or uncompressed 65
bytes). Returns `Nothing` if the point is not on the curve.
-}
publicKeyFromHex : String -> Maybe PublicKey
publicKeyFromHex =
    Elm.Kernel.Crypto.p256PublicKeyFromHex


{-| Get the hex representation of a public key (compressed). -}
publicKeyToHex : PublicKey -> String
publicKeyToHex =
    Elm.Kernel.Crypto.p256PublicKeyToHex


{-| Parse a compact signature (64 bytes / 128 hex chars, r||s). -}
signatureFromCompactHex : String -> Maybe Signature
signatureFromCompactHex =
    Elm.Kernel.Crypto.p256SignatureFromCompactHex


{-| Parse a DER-encoded signature. -}
signatureFromDerHex : String -> Maybe Signature
signatureFromDerHex =
    Elm.Kernel.Crypto.p256SignatureFromDerHex


{-| Get the compact hex representation (r||s, 128 hex chars). -}
signatureToCompactHex : Signature -> String
signatureToCompactHex =
    Elm.Kernel.Crypto.p256SignatureToCompactHex


{-| Get the DER-encoded hex representation. -}
signatureToDerHex : Signature -> String
signatureToDerHex =
    Elm.Kernel.Crypto.p256SignatureToDerHex


{-| Derive the public key from a private key. -}
getPublicKey : PrivateKey -> PublicKey
getPublicKey =
    Elm.Kernel.Crypto.p256GetPublicKey


{-| Sign a message hash. The first argument should be the hex-encoded hash
of the message (e.g., a SHA-256 hash). Uses deterministic RFC 6979 nonces.
-}
sign : String -> PrivateKey -> Signature
sign =
    Elm.Kernel.Crypto.p256Sign


{-| Verify a signature against a message hash and public key. -}
verify : Signature -> String -> PublicKey -> Bool
verify =
    Elm.Kernel.Crypto.p256Verify


{-| Compute an ECDH shared secret. Returns the hex-encoded shared point. -}
getSharedSecret : PrivateKey -> PublicKey -> String
getSharedSecret =
    Elm.Kernel.Crypto.p256GetSharedSecret

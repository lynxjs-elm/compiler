# lynxjs-elm/crypto

Elliptic curve cryptography and authenticated encryption for Elm on LynxJS.

Embeds [@noble/curves](https://github.com/paulmillr/noble-curves) 2.0.1 and [@noble/ciphers](https://github.com/paulmillr/noble-ciphers) as kernel JS. All byte data is represented as hex-encoded strings.

## Setup

Add to your `elm.json`:

```json
{
    "dependencies": {
        "direct": {
            "lynxjs-elm/crypto": "1.0.0"
        }
    }
}
```

## Modules

- [`Crypto.Secp256k1`](#cryptosecp256k1) — ECDSA signing, ECDH key exchange (Bitcoin, Ethereum)
- [`Crypto.Ed25519`](#cryptoed25519) — EdDSA signing (SSH, Signal)
- [`Crypto.P256`](#cryptop256) — ECDSA signing, ECDH key exchange (TLS, WebAuthn)
- [`Crypto.Cipher`](#cryptocipher) — AES-256-GCM, ChaCha20-Poly1305, XChaCha20-Poly1305

---

## Crypto.Secp256k1

```elm
import Crypto.Secp256k1 as Secp256k1
```

### Types

```elm
type PrivateKey
type PublicKey
type Signature
```

All are opaque. Construct with `fromHex`, extract with `toHex`.

### Key Conversion

```elm
privateKeyFromHex : String -> Maybe PrivateKey
```

Parse a hex-encoded private key (32 bytes / 64 hex chars). Returns `Nothing` if invalid or not a valid scalar on the curve.

```elm
privateKeyToHex : PrivateKey -> String
```

```elm
publicKeyFromHex : String -> Maybe PublicKey
```

Parse a hex-encoded public key (compressed 33 bytes or uncompressed 65 bytes). Returns `Nothing` if the point is not on the curve.

```elm
publicKeyToHex : PublicKey -> String
```

Returns the compressed representation.

### Signature Conversion

```elm
signatureFromCompactHex : String -> Maybe Signature
```

Parse a compact signature (r‖s, 64 bytes / 128 hex chars).

```elm
signatureFromDerHex : String -> Maybe Signature
```

Parse a DER-encoded signature.

```elm
signatureToCompactHex : Signature -> String
signatureToDerHex     : Signature -> String
```

### Operations

```elm
getPublicKey : PrivateKey -> PublicKey
```

Derive the compressed public key from a private key.

```elm
sign : String -> PrivateKey -> Signature
```

Sign a message hash. The first argument is the **hex-encoded hash** of the message (e.g. a SHA-256 hash). Uses deterministic RFC 6979 nonces.

```elm
verify : Signature -> String -> PublicKey -> Bool
```

Verify a signature against a message hash and public key.

```elm
getSharedSecret : PrivateKey -> PublicKey -> String
```

ECDH: compute a shared secret from your private key and their public key. Returns the hex-encoded shared point. Both parties derive the same secret.

### Example

```elm
import Crypto.Secp256k1 as Secp256k1

case Secp256k1.privateKeyFromHex "a665a459...7a27ae3" of
    Just priv ->
        let
            pub = Secp256k1.getPublicKey priv
            sig = Secp256k1.sign msgHashHex priv
        in
        Secp256k1.verify sig msgHashHex pub  -- True

    Nothing ->
        False
```

---

## Crypto.Ed25519

```elm
import Crypto.Ed25519 as Ed25519
```

### Types

```elm
type PrivateKey
type PublicKey
type Signature
```

### Key Conversion

```elm
privateKeyFromHex : String -> Maybe PrivateKey
```

Parse a hex-encoded private key (32 bytes / 64 hex chars).

```elm
privateKeyToHex : PrivateKey -> String
```

```elm
publicKeyFromHex : String -> Maybe PublicKey
```

Parse a hex-encoded public key (32 bytes / 64 hex chars). Returns `Nothing` if the point is not on the curve.

```elm
publicKeyToHex : PublicKey -> String
```

### Signature Conversion

```elm
signatureFromHex : String -> Maybe Signature
```

Parse a hex-encoded signature (64 bytes / 128 hex chars).

```elm
signatureToHex : Signature -> String
```

### Operations

```elm
getPublicKey : PrivateKey -> PublicKey
```

```elm
sign : String -> PrivateKey -> Signature
```

Sign a message. Unlike secp256k1/P-256, Ed25519 takes the **raw message bytes** (hex-encoded), not a pre-hash. Ed25519 hashes internally with SHA-512.

```elm
verify : Signature -> String -> PublicKey -> Bool
```

### Example

```elm
import Crypto.Ed25519 as Ed25519

case Ed25519.privateKeyFromHex "9d61b19d...cae7f60" of
    Just priv ->
        let
            pub = Ed25519.getPublicKey priv
            sig = Ed25519.sign messageHex priv
        in
        Ed25519.verify sig messageHex pub  -- True

    Nothing ->
        False
```

---

## Crypto.P256

```elm
import Crypto.P256 as P256
```

Identical API to `Crypto.Secp256k1` — same types and functions, different curve (NIST P-256 / secp256r1 / prime256v1).

### Types

```elm
type PrivateKey
type PublicKey
type Signature
```

### Key Conversion

```elm
privateKeyFromHex : String -> Maybe PrivateKey
privateKeyToHex   : PrivateKey -> String
publicKeyFromHex  : String -> Maybe PublicKey
publicKeyToHex    : PublicKey -> String
```

### Signature Conversion

```elm
signatureFromCompactHex : String -> Maybe Signature
signatureFromDerHex     : String -> Maybe Signature
signatureToCompactHex   : Signature -> String
signatureToDerHex       : Signature -> String
```

### Operations

```elm
getPublicKey     : PrivateKey -> PublicKey
sign             : String -> PrivateKey -> Signature
verify           : Signature -> String -> PublicKey -> Bool
getSharedSecret  : PrivateKey -> PublicKey -> String
```

---

## Crypto.Cipher

```elm
import Crypto.Cipher as Cipher
```

Authenticated encryption (AEAD). Ciphertext includes a 16-byte authentication tag appended automatically. Decryption returns `Nothing` if authentication fails (tampered data or wrong key/nonce).

### Types

```elm
type Key
```

A 256-bit (32-byte) symmetric key. Used by all three ciphers.

```elm
type Nonce12
```

A 96-bit (12-byte) nonce. Used by AES-GCM and ChaCha20-Poly1305.

```elm
type Nonce24
```

A 192-bit (24-byte) nonce. Used by XChaCha20-Poly1305. The larger nonce space makes random nonce generation safe (negligible collision probability).

### Key & Nonce Construction

```elm
keyFromHex     : String -> Maybe Key       -- 32 bytes / 64 hex chars
keyToHex       : Key -> String
nonce12FromHex : String -> Maybe Nonce12   -- 12 bytes / 24 hex chars
nonce12ToHex   : Nonce12 -> String
nonce24FromHex : String -> Maybe Nonce24   -- 24 bytes / 48 hex chars
nonce24ToHex   : Nonce24 -> String
```

### AES-256-GCM

```elm
aesGcmEncrypt : Key -> Nonce12 -> String -> String
```

Encrypt plaintext (hex). Returns ciphertext + 16-byte auth tag (hex).

```elm
aesGcmDecrypt : Key -> Nonce12 -> String -> Maybe String
```

Decrypt ciphertext + tag (hex). Returns `Nothing` if authentication fails.

### ChaCha20-Poly1305

```elm
chacha20Encrypt : Key -> Nonce12 -> String -> String
chacha20Decrypt : Key -> Nonce12 -> String -> Maybe String
```

### XChaCha20-Poly1305

```elm
xchacha20Encrypt : Key -> Nonce24 -> String -> String
xchacha20Decrypt : Key -> Nonce24 -> String -> Maybe String
```

### Example: Symmetric Encryption

```elm
import Crypto.Cipher as Cipher

case ( Cipher.keyFromHex keyHex, Cipher.nonce12FromHex nonceHex ) of
    ( Just key, Just nonce ) ->
        let
            ciphertext = Cipher.aesGcmEncrypt key nonce plaintextHex
        in
        case Cipher.aesGcmDecrypt key nonce ciphertext of
            Just decrypted ->
                decrypted == plaintextHex  -- True

            Nothing ->
                False  -- authentication failed

    _ ->
        False  -- invalid key or nonce
```

### Example: ECDH + Encryption (Public-Key Encryption)

Combine `Crypto.Secp256k1.getSharedSecret` with `Crypto.Cipher` for public-key encryption:

```elm
import Crypto.Secp256k1 as Secp256k1
import Crypto.Cipher as Cipher

-- Alice encrypts for Bob
encryptForBob : Secp256k1.PrivateKey -> Secp256k1.PublicKey -> String -> String -> Maybe String
encryptForBob alicePriv bobPub nonceHex plaintextHex =
    let
        shared = Secp256k1.getSharedSecret alicePriv bobPub
        sharedKeyHex = String.left 64 shared  -- first 32 bytes
    in
    case ( Cipher.keyFromHex sharedKeyHex, Cipher.nonce12FromHex nonceHex ) of
        ( Just key, Just nonce ) ->
            Just (Cipher.aesGcmEncrypt key nonce plaintextHex)

        _ ->
            Nothing

-- Bob decrypts from Alice
decryptFromAlice : Secp256k1.PrivateKey -> Secp256k1.PublicKey -> String -> String -> Maybe String
decryptFromAlice bobPriv alicePub nonceHex ciphertextHex =
    let
        shared = Secp256k1.getSharedSecret bobPriv alicePub
        sharedKeyHex = String.left 64 shared
    in
    case ( Cipher.keyFromHex sharedKeyHex, Cipher.nonce12FromHex nonceHex ) of
        ( Just key, Just nonce ) ->
            Cipher.aesGcmDecrypt key nonce ciphertextHex

        _ ->
            Nothing
```

Both sides derive the same shared secret, so Alice's encryption can be decrypted by Bob and vice versa.

---

## Nonce Safety

**Never reuse a (key, nonce) pair.** Reusing a nonce with the same key completely breaks the security of all three ciphers.

- For **AES-GCM** and **ChaCha20-Poly1305** (12-byte nonce): use a counter or derive nonces deterministically. Random 12-byte nonces have a non-negligible collision risk after ~2^32 messages.
- For **XChaCha20-Poly1305** (24-byte nonce): random nonces are safe. The 24-byte nonce space makes collision negligible even after billions of messages.

## Hex Encoding

All functions accept and return **lowercase hex strings**. One byte = two hex characters.

| Data | Hex length |
|---|---|
| Private key (32 bytes) | 64 chars |
| Public key, compressed (33 bytes) | 66 chars |
| Public key, uncompressed (65 bytes) | 130 chars |
| Ed25519 public key (32 bytes) | 64 chars |
| Signature, compact (64 bytes) | 128 chars |
| Cipher key (32 bytes) | 64 chars |
| Nonce12 (12 bytes) | 24 chars |
| Nonce24 (24 bytes) | 48 chars |

## License

MIT (noble-curves, noble-ciphers), BSD-3-Clause (lynxjs-elm/crypto)

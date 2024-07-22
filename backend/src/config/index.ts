import 'dotenv/config'
import { generateKeyPairSync } from 'crypto'
import { Algorithm } from 'jsonwebtoken'
import { IRateLimiterOptions } from 'rate-limiter-flexible'

let jwtPrivateKey = process.env.JWT_PRIVATE_KEY
let jwtPublicKey = process.env.JWT_PUBLIC_KEY

// create on the fly if none is presented
// ES256	ECDSA using P-256 curve and SHA-256 hash algorithm
if (!jwtPrivateKey || !jwtPublicKey) {
    const { privateKey, publicKey } = generateKeyPairSync('ec', {
        namedCurve: 'prime256v1'
    })
    jwtPrivateKey = privateKey.export({ type: 'sec1', format: 'pem' }) as string
    jwtPublicKey = publicKey.export({ type: 'spki', format: 'pem' }) as string
}

export default {
    app: {
        port: process.env.PORT ?? 3000
    },
    jwt: {
        expiresIn: '1h',
        privateKey: jwtPrivateKey,
        publicKey: jwtPublicKey,
        algorithm: 'ES256' as Algorithm
    },
    rateLimiter: {
        global: {
            points: 5,
            duration: 1 // seconds
        } as IRateLimiterOptions,
        authLogin: {
            points: 10,
            duration: 60 * 60 // 1 hour in secs
        } as IRateLimiterOptions,
    }
}
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import config from '@src/config'

export function Jwt(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'] ?? null

    if (authHeader) {
        const token = authHeader?.replace(/bearer/i, '').trim()
        if (token) {
            const payload = verify(token, config.jwt.publicKey);
            (req as any).user = payload;
        }
    }
    next()
}
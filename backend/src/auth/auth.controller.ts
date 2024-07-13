import { Request, Response, NextFunction } from 'express'
import { AuthService } from './auth.service'
import { formatResponse } from '@src/utils'

async function signIn(req: Request, res: Response, next: NextFunction) {
    try {
        res.json(formatResponse(req, res, await AuthService.signIn(req.body)))
    } catch(err) {
        next(err)
    }
}

export const AuthController = { signIn }
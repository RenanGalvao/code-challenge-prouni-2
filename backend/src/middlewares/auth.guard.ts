import { Request, Response, NextFunction } from 'express'
import { HTTP_ERROR_CODES } from '@src/const'
import { UserModel } from '@src/routes/users/model'

export function AuthGuard(req: Request, res: Response, next: NextFunction) {
    // set in JWT middleware if valid, JWT is (and should be) a global middleware
    const user: UserModel = (req as any).user
    if (!user) {
        throw new Error(HTTP_ERROR_CODES.UNAUTHORIZED)
    }

    next()
}
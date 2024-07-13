import { Request, Response, NextFunction } from 'express'
import { HTTP_ERROR_CODES } from '@src/const'
import { User } from '@prisma/client'

export function AuthGuard(req: Request, res: Response, next: NextFunction) {
    const user: User = (req as any).user
    if (!user) {
        throw new Error(HTTP_ERROR_CODES.UNAUTHORIZED)
    }

    next()
}
import { Request, Response, NextFunction } from 'express'
import { HTTP_ERROR_CODES } from '@src/const'
import { User, Role } from '@prisma/client'
import { AuthGuard } from './auth.guard'

export function RoleGuard(role: Role) {
    return function (req: Request, res: Response, next: NextFunction) {
        AuthGuard(req, res, () => { })

        const user: User = (req as any).user
        if (user.role !== role && user.role !== Role.ADMIN) {
            throw new Error(HTTP_ERROR_CODES.FORBIDDEN)
        }

        next()
    }
}
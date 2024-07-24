import { Request, Response, NextFunction } from 'express'
import { HTTP_ERROR_CODES } from '@src/const'
import { UserModel, Role } from '@src/routes/users/model'
import { AuthGuard } from './auth.guard'

export function RoleGuard(role: Role) {
    return function (req: Request, res: Response, next: NextFunction) {
        // dont pass next since the rest of the code needs to be executed
        AuthGuard(req, res, () => { })

        const user: UserModel = (req as any).user
        if (user.role !== role && user.role !== Role.ADMIN) {
            throw new Error(HTTP_ERROR_CODES.FORBIDDEN)
        }

        next()
    }
}
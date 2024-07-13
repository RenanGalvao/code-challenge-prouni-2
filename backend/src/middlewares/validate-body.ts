import { Request, Response, NextFunction } from 'express'
import { validateOrReject } from 'class-validator';

export function ValidateBody(dto: any) {
    return async function (req: Request, res: Response, next: NextFunction) {
        let post = new dto();
        for (const [key, value] of Object.entries(req.body)) {
            post[key] = value
        }

        try {
            await validateOrReject(post, { whitelist: true, transform: true, transformOptions: { enableImplicitConversion: true } }) 
            req.body = post // body reflects DTO, whitelisting...
        } catch (errs) {
            next(errs)
        }
        next()
    }
}
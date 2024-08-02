import { Request, Response, NextFunction } from 'express'
import { HTTP_ERROR_CODES } from '@src/const'
import { ValidationError } from 'class-validator'
import { logger } from '@src/utils'
import { DatabaseError } from 'pg'

export function ExceptionHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) {
        return next(err)
    }

    // Validation Body/Query
    if (Array.isArray(err) && err[0] instanceof ValidationError) {
        let data = {} as any

        // collects all error messages from class-validator in a [key: string]: string[] object
        for (const error of err as ValidationError[]) {
            data[error.property] = Object.entries(error.constraints!).reduce((prev: string[], curr) => {
                return [...prev, curr[1]]
            }, [])
        }

        res.status(400)
        res.json({
            message: 'Erro na validação!',
            data,
            timestamp: new Date().toISOString()
        })
        return
    }

    // node postgres
    if (err instanceof DatabaseError) {
        // duplicate key
        if (err.code === '23505') {
            res.status(400).json({
                message: 'E-mail já existe!',
                data: {},
                timestamp: new Date().toISOString()
            })
            return
        }
    }

    switch (err.message) {
        case 'invalid signature': //JsonWebTokenError
        case HTTP_ERROR_CODES.BAD_REQUEST:
            err.message = 'Requisição mal formada!'
            res.status(400)
            break
        case 'jwt not active': //NotBeforeError
        case 'jwt expired': //TokenExpiredError
        case HTTP_ERROR_CODES.UNAUTHORIZED:
            err.message = 'Sem autorização!'
            res.status(401)
            break
        case HTTP_ERROR_CODES.FORBIDDEN:
            err.message = 'Sem acesso!'
            res.status(403)
            break
        case HTTP_ERROR_CODES.NOT_FOUND:
            err.message = 'Não encontrado!'
            res.status(404)
            break
        case HTTP_ERROR_CODES.TOO_MANY_REQUESTS:
            err.message = 'Muitas requisições!'
            res.status(429)
            break;
        default:
            logger.warn(err)
            res.status(500)
    }
    if (err.message) {
        res.json({
            message: err.message,
            data: {},
            timestamp: new Date().toISOString()
        })
    }

    next()
}
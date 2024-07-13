import { Request, Response, NextFunction } from 'express'
import { HTTP_ERROR_CODES } from '@src/const'

export function ValidateParam(paramName: string, validation: RegExp) {
    return function (req: Request, res: Response, next: NextFunction) {
        const paramValue = req.params[paramName] ?? ''
        if (!paramValue || !validation.test(paramValue)) {
            throw new Error(HTTP_ERROR_CODES.BAD_REQUEST)
        }

        next()
    }
}
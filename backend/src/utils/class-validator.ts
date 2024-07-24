import {
    IsNotEmpty as _IsNotEmpty,
    IsString as _IsString,
    IsEmail as _IsEmail,
    MinLength as _MinLength,
    IsEnum as _IsEnum,
    IsInt as _IsInt,
    ValidationOptions,
} from 'class-validator'
import * as ValidatorJS from 'validator'

export const IsNotEmpty = (options?: ValidationOptions) =>
    _IsNotEmpty({
        ...options,
        message: (args) => `${args.property} é obrigatório.`,
    })
export const IsString = (options?: ValidationOptions) =>
    _IsString({
        ...options,
        message: (args) => `${args.property} deve ser um texto válido.`,
    })
export const IsEmail = (emailOptions?: ValidatorJS.IsEmailOptions, options?: ValidationOptions) =>
    _IsEmail(
        { ...emailOptions },
        {
            ...options,
            message: (args) => `${args.property} deve ser um e-mail válido.`,
        },
    )
export const MinLength = (min: number, options?: ValidationOptions) =>
    _MinLength(min, {
        ...options,
        message: (args) => `${args.property} deve ter o tamanho mínimo de ${min} caracteres ou items.`,
    })
export const IsEnum = (entity: object, values: string[], options?: ValidationOptions) =>
    _IsEnum(entity, {
        ...options,
        message: (args) => `${args.property} deve ser um dos seguintes valores: ${values}.`,
    })
export const IsInt = (options?: ValidationOptions) =>
    _IsInt({
        ...options,
        message: (args) => `${args.property} deve ser um inteiro válido.`,
    })
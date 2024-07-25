import { UserModel } from '@src/routes/users/model'
import { UsersService } from '@src/routes/users/users.service'
import * as argon2 from 'argon2'
import { sign, Algorithm } from 'jsonwebtoken'
import config from '@src/config'
import { HTTP_ERROR_CODES } from '@src/const'
import { SignInDto } from './dto'

async function signIn(body: SignInDto) {
    const { email, password } = body
    const user = await UsersService.findByEmail(email)

    if (!user || !(await argon2.verify(user.hashedPassword, password))) {
        throw new Error(HTTP_ERROR_CODES.UNAUTHORIZED)
    }

    const { id, name, role } = user

    return {
        user: {
            id,
            name,
            email,
            role,
        },
        // reduces JWT length
        token: await generateToken({ role, id })
    }
}

function generateToken(user: Partial<UserModel>) {
    return new Promise(resolve => {
        sign(user, config.jwt.privateKey, {
            algorithm: config.jwt.algorithm as Algorithm,
            expiresIn: config.jwt.expiresIn
        }, (err, token) => resolve(token))
    })
}

export const AuthService = { signIn }
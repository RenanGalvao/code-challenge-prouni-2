import { Router } from 'express'
import { AuthController } from './auth.controller'
import { ValidateBody } from '@src/middlewares'
import { SignInDto } from './dto'

const baseRoute = 'auth'
const router = Router()

router.post(`/${baseRoute}/sign-in`, ValidateBody(SignInDto), AuthController.signIn)

export const AuthRouter = router
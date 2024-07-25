import { Router } from 'express'
import { UsersController } from './users.controller'
import { RoleGuard, ValidateParam, ValidateBody, ValidateQuery } from '@src/middlewares'
import { Role } from './model'
import { uuid } from '@src/const'
import { CreateUserDto, UpdateUserDto } from './dto'
import { PaginationDto } from '@src/postgres/dto'

const baseRoute = 'users'
const router = Router()

router.get(`/${baseRoute}`, ValidateQuery(PaginationDto), UsersController.findMany)
router.get(`/${baseRoute}/:id`, ValidateParam('id', uuid), UsersController.findOne)
router.post(`/${baseRoute}`, RoleGuard(Role.ADMIN), ValidateBody(CreateUserDto), UsersController.create)
router.put(`/${baseRoute}/:id`, RoleGuard(Role.ADMIN), ValidateParam('id', uuid), ValidateBody(UpdateUserDto), UsersController.update)
router.delete(`/${baseRoute}/:id`, RoleGuard(Role.ADMIN), ValidateParam('id', uuid), UsersController.remove)

export const UsersRouter = router
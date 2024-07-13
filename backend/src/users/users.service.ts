import { PrismaService } from '@src/prisma'
import * as argon2 from 'argon2'
import { CreateUserDto, UpdateUserDto } from './dto'
import { PaginationDto } from '@src/prisma/dto'

async function findByEmail(email: string) {
    return await PrismaService.user.findUnique({
        where: { email }
    })
}

async function findMany(query?: PaginationDto) {
    return await PrismaService.paginatedQuery('user', query, {
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        }
    })
}

async function findOne(id: string) {
    return await PrismaService.user.findUniqueOrThrow({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        }
    })
}

async function create(body: CreateUserDto) {
    return await PrismaService.user.create({
        data: {
            name: body.name,
            email: body.email,
            role: body.role,
            hashedPassword: await argon2.hash(body.password)
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        }
    })
}

async function update(id: string, body: UpdateUserDto) {
    if (body.password) {
        (body as any).hashedPassword = await argon2.hash(body.password)
    }

    return await PrismaService.user.update({
        where: { id },
        data: body,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        }
    })
}

async function remove(id: string) {
    await PrismaService.user.delete({ where: { id } })
    return null
}

export const UsersService = { findByEmail, findMany, findOne, create, update, remove }
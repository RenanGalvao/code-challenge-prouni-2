import { pgService } from '@src/postgres'
import { PaginationDto } from '@src/postgres/dto'
import * as argon2 from 'argon2'
import { CreateUserDto, UpdateUserDto } from './dto'
import { UserModel } from './model'
import { throwValidationError } from '@src/utils'

async function findByEmail(email: string) {
    const query = {
        text: 'SELECT * FROM users WHERE email = $1;',
        values: [email],
    }
    return (await pgService.query<UserModel>(query)).rows[0]
}

async function findMany(query?: PaginationDto) {
    const sql = 'SELECT id, name, email, role, "createdAt", "updatedAt" FROM users'
    return await pgService.findManyAsync<UserModel[]>(sql, query)
}

async function findOne(id: string) {
    const query = {
        text: 'SELECT id, name, email, role, "createdAt", "updatedAt" FROM users WHERE id = $1;',
        values: [id]
    }
    return (await pgService.query<UserModel>(query)).rows[0]
}

async function create(body: CreateUserDto) {
    const query = {
        text: `INSERT INTO users (name, email, role, "hashedPassword") 
            VALUES ($1, $2, $3, $4) 
            RETURNING id, name, email, role, "createdAt", "updatedAt";`,
        values: [body.name, body.email, body.role, await argon2.hash(body.password)]
    }
    const res = (await pgService.query<UserModel>(query))
    return res.rows[0]
}

async function update(id: string, body: UpdateUserDto) {
    if (body.password) {
        (body as any).hashedPassword = await argon2.hash(body.password)
        delete body.password
    }

    let queryBuild = ['UPDATE users']
    let values: any[] = []

    if (Object.keys(body).length > 0) {
        queryBuild.push('SET')
        let index = 1
        for (const [key, value] of Object.entries(body)) {
            // comma needed after pair of key/value but not before WHERE clause
            const comma = index !== Object.keys(body).length ? ',' : ''

            queryBuild.push(`"${key}" = $${index}${comma}`)
            values.push(value)
            index++
        }
    } else {
        throwValidationError('Um campo ao menos deve ser atualizado', ['name', 'email', 'password', 'role'])
    }
    queryBuild.push(`WHERE id = $${Object.keys(body).length + 1} RETURNING id, name, email, role, "createdAt", "updatedAt";`)
    values.push(id)

    const query = {
        text: queryBuild.join(' '),
        values,
    }
    const res = (await pgService.query<UserModel>(query))
    return res.rows[0]
}

async function remove(id: string) {
    const query = {
        text: 'DELETE FROM users WHERE id = $1;',
        values: [id]
    }
    await pgService.query<UserModel>(query)
    return null
}

export const UsersService = { findByEmail, findMany, findOne, create, update, remove }
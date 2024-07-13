import { Prisma, PrismaClient } from '@prisma/client'
import { PaginationDto } from './dto'
import { readFileSync } from 'fs'

class _PrismaService extends PrismaClient {
    async paginatedQuery(model: Uncapitalize<Prisma.ModelName>, query?: PaginationDto, findManyArgs: any = {}) {
        query = Object.assign({}, { page: 1, itemsPerPage: 10 }, query)

        const page = +query.page!
        const take = +query.itemsPerPage!
        let skip = 0
        if (page !== 1) {
            skip = (page - 1) * take
        }

        const totalQuery = this[model].count()
        const findManyQuery = this[model].findMany({
            skip,
            take,
            ...findManyArgs
        })

        const [data, totalCount] = await this.$transaction([findManyQuery, totalQuery])
        const totalPages = Math.ceil(totalCount / take)
        return { data, totalCount, totalPages }
    }
}

export const PrismaService = process.env.NODE_ENV === 'production' ?
    new _PrismaService({
        datasources: {
            db: {
                url: readFileSync('/run/secrets/database_url', { encoding: 'utf-8' })
            }
        }
    })
    : new _PrismaService()
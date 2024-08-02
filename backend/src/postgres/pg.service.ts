import { Pool } from 'pg'
import config from '@src/config'
import { logger } from '@src/utils'
import { readFileSync } from 'fs'
import { PaginationDto } from './dto'

class PgService extends Pool {
    // used to paginate
    private getLimitOffsetFromQuery(query?: PaginationDto) {
        query = Object.assign({}, { page: 1, itemsPerPage: 10 }, query)

        const page = +query.page!
        const limit = +query.itemsPerPage!
        let offset = 0
        if (page !== 1) {
            offset = (page - 1) * limit
        }

        return { limit, offset }
    }

    findManyAsync<T>(sql: string, query?: PaginationDto) {
        return new Promise<{ data: any; totalCount: number; totalPages: number }>(async (resolve, reject) => {
            // table is the last word in the sql query (should be)
            const originalTable = sql.substring(sql.indexOf('FROM') + ('FROM'.length)).trim()
            const totalCountQuery = `SELECT COUNT(*) as "totalCount" FROM ${originalTable}`
            const { totalCount } = (await this.query<{ totalCount: number }>(totalCountQuery)).rows[0]

            // Append LIMIT
            sql += ' LIMIT $1 OFFSET $2'

            // LIMIT and OFFSET (pagination) params
            const { limit, offset } = this.getLimitOffsetFromQuery(query)
            const paginatedQuery = {
                text: sql,
                values: [limit, offset]
            }

            // actual data
            const rows = (await this.query(paginatedQuery)).rows as T[]

            // ensures 1 as min totalPages
            const totalPages = Math.max(Math.ceil(totalCount / limit), 1)
            resolve({ data: rows, totalCount, totalPages })
        })
    }
}

const pgService = new PgService(config.pg)
pgService.connect()

pgService.on('error', (err) => {
    logger.error(`Unexpected error on idle client: ${err}`)
    process.exit(-1)
})

pgService.once('connect', async (client) => {
    logger.info('Running migrations...')
    const sql = readFileSync('./migrations/migration.sql', { encoding: 'utf-8' })
    await client.query(sql)
    logger.info('Done.')
})

export { pgService }

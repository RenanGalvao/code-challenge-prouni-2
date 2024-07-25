import { Pool } from 'pg'
import config from '@src/config'
import { logger } from '@src/utils'
import { readFileSync } from 'fs'
import { PaginationDto } from './dto'

class PgService extends Pool {
    // used to paginate
    getLimitOffsetFromQuery(query?: PaginationDto) {
        query = Object.assign({}, { page: 1, itemsPerPage: 10 }, query)

        const page = +query.page!
        const limit = +query.itemsPerPage!
        let offset = 0
        if (page !== 1) {
            offset = (page - 1) * limit
        }

        return { limit, offset }
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

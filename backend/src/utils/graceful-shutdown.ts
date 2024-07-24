import { Server } from 'http'
import { logger } from '@src/utils'
import { pgService } from '@src/pg'

async function tasks(server: Server, signal: string) {
    logger.info(`${signal} signal received.`)
    server.close(async () => {
        logger.info('Closed out remaining connections.')
        try {
            await pgService.end()
        } finally {
            process.exit(0)
        }
    })
}

export function gracefulShutdown(server: Server) {
    process.on('SIGTERM', async () => {
        await tasks(server, 'SIGTERM')
    })

    process.on('SIGINT', async () => {
        await tasks(server, 'SIGINT')
    })
}


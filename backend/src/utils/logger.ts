import { createLogger, format, transports } from 'winston'

const myFormat = format.combine(
    format.colorize(),
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    format.printf(({ level, message, timestamp, service }) => {
        return `[${service}] ${timestamp} | ${level}: ${message}`;
    })
)

export const logger = createLogger({
    level: 'info',
    format: myFormat,
    defaultMeta: { service: 'API' },
})

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console());
} else {
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    logger.add(new transports.File({ filename: 'error.log', level: 'error' }))
    logger.add(new transports.File({ filename: 'combined.log' }))
}

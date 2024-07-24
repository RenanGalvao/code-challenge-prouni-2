import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import config from '@src/config'
import { UsersRouter } from '@src/users'
import { AuthRouter } from '@src/auth'
import { HealthRouter } from '@src/health'
import { RateLimiter, Jwt, ExceptionHandler } from '@src/middlewares'
import { HTTP_ERROR_CODES } from '@src/const'
import { logger, appInitLog, gracefulShutdown } from '@src/utils'

const app = express()

// Security
app.disable('x-powered-by')
app.use(helmet())
app.use(cors({
  exposedHeaders: [
    'X-Total-Count', 'X-Total-Pages',
    'Retry-After', 'X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'
  ]
}))

// Midlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(RateLimiter)
app.use(Jwt)

// Routes
app.use(HealthRouter)
app.use(AuthRouter)
app.use(UsersRouter)

app.use(function Custom404(req, res, next) {
  res.status(404).send(HTTP_ERROR_CODES.NOT_FOUND)
})
app.use(ExceptionHandler)

const server = app.listen(config.app.port, () => {
  appInitLog(app._router)
  logger.info(`Server is running at http://localhost:${config.app.port}`)
})
gracefulShutdown(server)
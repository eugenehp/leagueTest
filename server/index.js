import config from 'config'
import koa from 'koa'
import { fatal, error } from './services/bunyan'
import { redisPromise } from './services/redis'
import api from './api'
import mount from 'koa-mount'
import errorMiddleware from './services/error'
import bodyparser from 'koa-bodyparser'

async function main() {
  const port = config.get('server.port')
  const app = koa()

  app.on('error', (err, ctx) => {
    const { request: req, response: res } = ctx
    if (err.code) {
      error({ code: err.code }, err.message)
    } else {
      error({ err, req, res }, 'server error')
    }
  })
  app.use(errorMiddleware)
  app.use(bodyparser())
  app.use(mount('/api', api))

  await redisPromise
  app.listen(port, () => {
    const host = 'localhost'
    fatal('Server listening at http://%s:%s', host, port)
  })
}

main()

import config from 'config'
import koa from 'koa'
import { fatal } from './services/bunyan'
const app = koa()
const port = config.get('server.port')


app.listen(port, () => {
  const host = 'localhost'
  fatal('Server listening at http://%s:%s %s',
    host, port)
})

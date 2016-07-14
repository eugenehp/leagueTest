import koa from 'koa'
import mount from 'koa-mount'
import user from './user'
import smartError from '../services/smartError'

const app = koa()
app.use(smartError)
app.use(mount('/user', user))

export default app

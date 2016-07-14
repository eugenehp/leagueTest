import koa from 'koa'
import mount from 'koa-mount'
import signup from './signup'

const app = koa()
app.use(mount('/signup', signup))
export default app

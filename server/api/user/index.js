import koa from 'koa'
import mount from 'koa-mount'
import signup from './signup'
import like from './like'
import reject from './reject'
import match from './match'

const app = koa()
app.use(mount('/signup', signup))
app.use(mount('/match', match))
app.use(mount('/like', like))
app.use(mount('/reject', reject))
export default app

import client from '../../services/redis'
import koaRouter from 'koa-router'
const router = koaRouter()
router.put('/', function* handler() {
  console.log(1)
  this.body = 11
  // this.body = this.passport.user.toAPI()
})

export default router.routes()

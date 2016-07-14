import koaRouter from 'koa-router'
import Person from '../../models/person'

const router = koaRouter()
router.put('/', function* handler() {
  this.body = yield new Person(this.request.body).save()
})

export default router.routes()

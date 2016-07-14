import koaRouter from 'koa-router'
import Person from '../../models/person'

const router = koaRouter()
router.get('/:username', function* handler() {
  const { username } = this.params
  this.body = yield Person.get(username)
})

export default router.routes()

import client from '../../services/redis'
import koaRouter from 'koa-router'
import assert from 'assert'


const router = koaRouter()
router.post('/:username/:rejectedusername', function* handler() {
  const { username, rejectedusername } = this.params
  assert(username, 'No username given')
  assert(rejectedusername, 'No rejectedusername given')
  yield client.saddAsync(`rejects:${username}`, rejectedusername)
  this.status = 200
})

export default router.routes()

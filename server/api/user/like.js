import client from '../../services/redis'
import koaRouter from 'koa-router'
import assert from 'assert'


const router = koaRouter()
router.post('/:username/:likedusername', function* handler() {
  const { username, likedusername } = this.params
  assert(username, 'No username given')
  assert(likedusername, 'No likedusername given')
  yield client.saddAsync(`likes:${username}`, likedusername)
  this.status = 200
})

export default router.routes()

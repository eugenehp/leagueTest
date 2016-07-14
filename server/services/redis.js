import redis from 'redis'
import bluebird from 'bluebird'
import { fatal as fatalLog } from './bunyan'

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const client = redis.createClient()

const eventTypes = [
  'ready',
  'connect',
  'reconnecting',
  'error',
]
eventTypes.forEach(event => {
  client.on(event, msg => {
    if (msg) {
      fatalLog('Redis:', event, msg)
    } else {
      fatalLog('Redis:', event)
    }
  })
})

const redisPromise = new Promise((resolve, reject) => {
  client.once('ready', () => resolve(client))
  client.once('error', reject)
})

export default client
export { redisPromise }

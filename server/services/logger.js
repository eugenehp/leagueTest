import { info } from '../services/bunyan'
export default function *(next) {
  const start = new Date
  yield next
  const ms = new Date - start
  const params = [
    '%s %s  ms:%s',
    this.method,
    this.url,
    ms,
  ]
  if (Object.keys(this.request.body).length) {
    params.push('\n')
    params.push(JSON.stringify(this.request.body, null, 2))
  }
  info.apply(this, params)
}

export default function *(next) {
  try {
    yield next
  } catch (err) {
    this.status = err.status || 500
    this.body = 'Server error, sorry :('
    this.app.emit('error', err, this)
  }
}

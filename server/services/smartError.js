export default function *(next) {
  try {
    yield next
  } catch (err) {
    const status = err.status || 500
    this.status = status
    if (err.code) {
      this.body = { error: { message: err.message, code: err.code } }
    } else {
      this.body = { error: { message: 'Server error' } }
    }

    this.app.emit('error', err, this)
  }
}

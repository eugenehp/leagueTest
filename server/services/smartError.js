export default function *(next) {
  try {
    yield next
  } catch (err) {
    const status = err.status || 500
    this.status = status
    if (err.code) {
      this.body = { error: { message: err.message, code: err.code } }
    } else {
      // TODO add error codes across app
      this.body = { error: { message: err.message } }
    }

    this.app.emit('error', err, this)
  }
}

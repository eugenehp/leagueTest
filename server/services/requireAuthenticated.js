export default function* (next) {
  if (!this.passport.user) {
    this.throw('Not logged in', 403, { code: 1 })
  }
  yield next
}

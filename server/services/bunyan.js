import bunyan from 'bunyan'

const logger = bunyan.createLogger({
  name: 'server',
  src: true,
  level: 'trace',
  serializers: bunyan.stdSerializers,
})

const result = {}
const logLevels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace']
logLevels.forEach(fn => {
  result[fn] = logger[fn].bind(logger)
})

const { fatal, error, warn, info, debug, trace } = result
export { fatal, error, warn, info, debug, trace }

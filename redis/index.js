const Redis = require('redis')
const config = require('../config')
const bluebird = require('bluebird')
const logger = require('../logger')
bluebird.promisifyAll(Redis.RedisClient.prototype)

const redis = Redis.createClient({
  port: config.REDIS.PORT,
  host: config.REDIS.HOST,
  family: config.REDIS.FAMILY, // 4 (IPv4) or 6 (IPv6)
  db: config.REDIS.DB
})

redis.on('connect', () => {
  logger.accessLogger.trace('redis connected')
  console.log('redis connected')
})
redis.on('error', (err) => {
  logger.errorLogger.error(`redis error: ${err.message}`)
  console.log(err)
})
module.exports = redis

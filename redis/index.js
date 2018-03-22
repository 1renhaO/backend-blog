const Redis = require('redis')
const config = require('../config')

const redis = Redis.createClient({
  port: config.REDIS.PORT,
  host: config.REDIS.HOST,
  family: config.REDIS.FAMILY,           // 4 (IPv4) or 6 (IPv6)
  db: config.REDIS.DB
})

redis.on('connect', () => {
  console.log('redis connected')
})
redis.on('error', (err) => {
  console.log(err)
})

module.exports = redis

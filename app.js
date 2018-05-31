'use strict'

const Koa = require('koa')

const app = new Koa()

const path = require('path')
const router = require('./router')
const cors = require('kcors')
const koaLogger = require('koa-logger')
const koaBody = require('koa-body')
const config = require('./config')
const session = require('koa-session')
const redis = require('./redis')
const helmet = require('koa-helmet')
const redisStore = require('koa-redis')({
  client: redis
})
const passport = require('./auth/local/passport')
const logger = require('./logger')
app.keys = [config.secret]

// use() this middleware near the top to "wrap" all subsequent middleware
app.use(koaLogger((str, args) => {
  logger.accessLogger.trace(str)
}))

app.use(cors({
  credentials: true
}))

// https://helmetjs.github.io/docs/
app.use(helmet.xssFilter({ setOnOldIE: true }))
// app.use(helmet.contentSecurityPolicy({
//   imgSrc: ['']
// }))
// support `multipart/form-data`, `application/x-www-urlencoded`, `application/json`
// koa-bodyparse not support `multipart/form-data`
// but now i found it not work yet, do it later...
app.use(koaBody({
  patchNode: true,
  multipart: true
}))

// static file
app.use(require('koa-static')(path.resolve(__dirname, 'static')))

app.use(session({
  store: redisStore
}, app))

app.use(passport.initialize())
app.use(passport.session())

app.use(router.routes(), router.allowedMethods())

app.listen(config.port, () => {
  console.log(`app running at port ${config.port}`)
})

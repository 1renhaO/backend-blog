'use strict'

const Koa = require('koa')
const path = require('path')
const app = new Koa()
const router = require('./router')
const logger = require('koa-logger')
const config = require('./config')
const tokenRouter = require('./router/token')
const sequelize = require('./db/index.js')
// use() this middleware near the top to "wrap" all subsequent middleware
app.use(logger())
// static file
app.use(require('koa-static')(path.resolve(__dirname, 'static')))

// let router = new Router()

// router.use(tokenRouter.routes(), tokenRouter.allowedMethods())

// router.get('/test', async (ctx, next) => {
//   ctx.response.body = 'requset success...'
// })

app.use(router.routes(), router.allowedMethods())


app.listen(config.port, () => {
  console.log(`app running at port ${config.port}`)
})

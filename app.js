const Koa = require('koa')
const path = require('path')
const app = new Koa()
const Router = require('koa-router')
const config = require('./config')
const wechatRouter = require('./router/wechat')
// static file
app.use(require('koa-static')(path.resolve(__dirname, 'static')))

let router = new Router()

router.use(wechatRouter.routes(), wechatRouter.allowedMethods())

app.use(router.routes(), router.allowedMethods())

app.listen(config.port, () => {
    console.log(`app running at port ${config.port}`)
})

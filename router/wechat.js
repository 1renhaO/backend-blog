const Router = require('koa-router')
let wechatToken = require('../config').wecahtToken
let sha1 = require('sha1')
let keys = ['timestamp', 'nonce']
let wechatRouter = new Router()
wechatRouter.get('/wechat', async (ctx, next) => {
    let arr = []
    for (key in ctx.request.query) {
        if (!keys.includes(key)) continue
        arr.push(ctx.request.query[key])
    }
    arr.push(wechatToken)
    let _signature = sha1(arr.sort().join())
    if (_signature === ctx.request.query.signature) {
        ctx.response.body = ctx.request.query.echostr
    } else {
        ctx.response.body = {
            _signature,
            'echostr': ctx.request.query.echostr,
            'timestamp': ctx.request.query.timestamp,
            'nonce': ctx.request.query.nonce,
            'token': wechatToken
        }
    }
})

module.exports = wechatRouter
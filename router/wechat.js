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
    if (sha1(arr.sort().join()) === ctx.request.query.signature) {
        ctx.response.body = ctx.request.query.echostr
    } else {
        ctx.response.body = 'fail'
    }
})

module.exports = wechatRouter
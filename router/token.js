const Router = require('koa-router')
let wechatToken = require('../config').wechatToken
let sha1 = require('sha1')
let keys = ['timestamp', 'nonce']
let tokenRouter = new Router()
const fs = require('fs')
tokenRouter.get('/token', async (ctx, next) => {
    let arr = []
    for (key in ctx.request.query) {
        if (!keys.includes(key)) continue
        arr.push(ctx.request.query[key])
    }
    arr.push(wechatToken)
    console.log(arr.sort().join(''))
    let _signature = sha1(arr.sort().join(''))
    if (_signature === ctx.request.query.signature) {
        ctx.response.body = ctx.request.query.echostr
    } else {
        fs.writeFile('fail.txt', JSON.stringify({
            _signature,
            join: arr.sort().join(''),
            signature: ctx.request.query.signature,
            nonce: ctx.request.query.nonce,
            echostr: ctx.request.query.echostr,
            timestamp: ctx.request.query.timestamp,
            token: wechatToken
        }), () => { })
        ctx.response.body = 'fail'
    }
})

module.exports = tokenRouter
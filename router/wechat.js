const Router = require('koa-router')
let wechatToken = require('../config').wechatToken
let sha1 = require('sha1')
let keys = ['timestamp', 'nonce']
let wechatRouter = new Router()
const fs = require('fs')
wechatRouter.get('/wechat', async (ctx, next) => {
    let arr = []
    for (key in ctx.request.query) {
        if (!keys.includes(key)) continue
        arr.push(ctx.request.query[key])
    }
    arr.push(wechatToken)
    let _signature = sha1(arr.sort().join(''))
    if (_signature === ctx.request.query.signature) {
        ctx.response.body = ctx.request.query.echostr
    } else {
        let response = {
            _signature,
            signature: ctx.request.query.signature,
            'echostr': ctx.request.query.echostr,
            'timestamp': ctx.request.query.timestamp,
            'nonce': ctx.request.query.nonce,
            'token': wechatToken
        }
        fs.writeFile('fail.txt', JSON.stringify(response), (err) => { })
        fs.writeFile('token.txt', wechatToken, (err) => { })
        ctx.response.body = response
    }
})

module.exports = wechatRouter
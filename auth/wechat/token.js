let wechatToken = require('../../config').wechatToken
let sha1 = require('sha1')
let keys = ['timestamp', 'nonce']

const token = async (ctx, next) => {
  let arr = []
  for (let key in ctx.request.query) {
    if (!keys.includes(key)) continue
    arr.push(ctx.request.query[key])
  }
  arr.push(wechatToken)
  let _signature = sha1(arr.sort().join(''))
  if (_signature === ctx.request.query.signature) {
    ctx.response.body = ctx.request.query.echostr
  } else {
    ctx.response.body = 'fail'
  }
}

module.exports = token

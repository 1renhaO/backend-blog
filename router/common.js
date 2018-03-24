const Router = require('koa-router')
const commonManager = require('../manager/common')
const auth = require('../auth')
let commonRouter = new Router()

commonRouter.post('/file/store', auth.isLogin, commonManager.uploadFile)

module.exports = commonRouter

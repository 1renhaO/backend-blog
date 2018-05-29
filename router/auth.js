const auth = require('../auth')
const Router = require('koa-router')
const router = new Router()

// router.get('/wechat', auth.wechat)
// router.get('/wechat/token', auth.wechatToken)
router.get('/github', auth.github)
router.get('/github/callback', auth.githubCb)
router.post('/local', auth.local)

module.exports = router

const Router = require('koa-router')
const userRouter = require('./user')
const postRouter = require('./post')
const router = new Router()
const auth = require('../auth')
const commonRouter = require('./common')

router.use('/post', postRouter.routes(), postRouter.allowedMethods())
router.use('/user', userRouter.routes(), userRouter.allowedMethods())
router.use('/common', commonRouter.routes(), commonRouter.allowedMethods())
router.post('/login', auth.login)

module.exports = router

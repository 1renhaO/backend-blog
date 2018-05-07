const Router = require('koa-router')
const userRouter = require('./user')
const postRouter = require('./post')
const authRouter = require('./auth')
const router = new Router()

const commonRouter = require('./common')

router.use('/post', postRouter.routes(), postRouter.allowedMethods())
router.use('/user', userRouter.routes(), userRouter.allowedMethods())
router.use('/common', commonRouter.routes(), commonRouter.allowedMethods())
router.use('/auth', authRouter.routes(), authRouter.allowedMethods())
// router.post('/auth/local', auth.login)
// router.get('')

module.exports = router

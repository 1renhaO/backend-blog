const Router = require('koa-router')
const userManager = require('../manager/user')
const auth = require('../auth')
let userRouter = new Router()

userRouter.get('/all', auth.isLogin, userManager.getAll)
userRouter.post('/add', auth.isLogin, userManager.addUser)
userRouter.delete('/delete/:id', auth.isLogin, userManager.deleteUser)
userRouter.put('/update/:id', auth.isLogin, userManager.updateUser)

module.exports = userRouter

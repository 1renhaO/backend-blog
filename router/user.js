const Router = require('koa-router')
const userController = require('../controller/user')
let userRouter = new Router()

userRouter.get('/all', userController.getAll)
userRouter.post('add', userController.addUser)
userRouter.delete('/:id', userController.deleteUser)
userController.put('/:id/updateUser', userController.updateUser)

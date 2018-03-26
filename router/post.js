const Router = require('koa-router')
const postManager = require('../manager/post')
const auth = require('../auth')
let postRouter = new Router()

postRouter.get('/list', auth.isLogin, postManager.getPostList)
postRouter.get('/info/:id', auth.isLogin, postManager.getPostById)
postRouter.get('/indexImage', auth.isLogin, postManager.getIndexImage)
postRouter.get('/count', auth.isLogin, postManager.getPostById)
// postRouter.get('/count'.auth.login, postManager.getPostById)

// get pre page and next page
postRouter.get('/between/:id', auth.isLogin, postManager.getBetweenPostById)

postRouter.put('/add', auth.isLogin, postManager.addPost)

module.exports = postRouter

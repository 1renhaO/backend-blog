const LocalPassport = require('./local/passport')
const isLogin = async function (ctx, next) {
  if (await ctx.isAuthenticated()) {
    await next()
  } else {
    ctx.status = 401
    ctx.body = 'UnauthorizedError'
    // ctx.redirect('/login')
  }
}

const login = async function (ctx, next) {
  await LocalPassport.authenticate('local', { failureFlash: true }, (err, user, info, status) => {
    if (!user) {
      ctx.status = 401
      ctx.body = 'UnauthorizedError'
    } else {
      ctx.login(user)
      ctx.status = 200
      ctx.body = JSON.stringify(user)
    }
  })(ctx, next)
}


module.exports = {
  login,
  isLogin
}

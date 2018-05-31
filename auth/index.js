const passport = require('./passport')
const isLogin = async function (ctx, next) {
  if (await ctx.isAuthenticated()) {
    await next()
  } else {
    ctx.status = 401
    ctx.body = 'UnauthorizedError'
    // ctx.redirect('/login')
  }
}

const local = async function (ctx, next) {
  await passport.authenticate('local', { failureFlash: true }, (err, user, info, status) => {
    if (!user) {
      ctx.status = 401
      ctx.body = `UnauthorizedError: ${JSON.stringify(err)}`
    } else {
      ctx.login(user)
      ctx.status = 200
      ctx.body = JSON.stringify(user)
    }
  })(ctx, next)
}

const githubCb = async function (ctx, next) {
  await passport.authenticate('github', (err, user, info, status) => {
    if (!user) {
      ctx.status = 401
      ctx.body = `UnauthorizedError: ${JSON.stringify(err)}`
    } else {
      ctx.login(user)
      ctx.status = 200
      ctx.body = JSON.stringify(user)
    }
  })(ctx, next)
}

const github = async function (ctx, next) {
  await passport.authenticate('github')(ctx, next)
}

module.exports = {
  local,
  isLogin,
  github,
  githubCb,
  wechatToken: require('./wechat/token')
}

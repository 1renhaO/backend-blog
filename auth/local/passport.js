
const passport = require('koa-passport')

const LocalStrategy = require('passport-local').Strategy

const User = require('../../db/associations').User

passport.serializeUser(async (user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  let user = await User.findById(id)
  if (!user) {
    return done(null, false)
  }
  done(null, user)
})

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  const user = await User.findOne({ where: { 'email': email } })
  if (!user) {
    return done(null, false, { error_msg: '用户名错误.' })
  }
  if (!user.authenticate(password)) {
    return done(null, false, { error_msg: '密码错误.' })
  }
  done(null, user)
}))

module.exports = passport

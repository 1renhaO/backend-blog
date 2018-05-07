
require('./local/passport')

const passport = require('./github/passport')

const User = require('../db/associations').User

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

module.exports = passport

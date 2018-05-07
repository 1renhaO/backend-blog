const GitHubStrategy = require('passport-github').Strategy
const passport = require('koa-passport')
const config = require('../../config')
const User = require('../../db/associations').User
const crypto = require('crypto')
const {accessLoger, errorLoger} = require('../../logger')

passport.use(new GitHubStrategy({
  clientID: config.GITHUB.CLIENT_ID,
  clientSecret: config.GITHUB.CLINET_SECRET,
  callbackURL: config.GITHUB.CALLBACK_URL
},
async (accessToken, refreshToken, profile, cb) => {
  accessLoger.trace({
    accessToken,
    refreshToken,
    profile
  })
  try {
    let [user] = await User.findOrCreate({
      where: {
        githubId: profile.id
      },
      defaults: {
        nickname: profile.username,
        email: profile.emails[0].value,
        provider: profile.provider,
        avatar: profile.photos[0].value,
        password: crypto.randomBytes(4).toString('hex')
      }
    })
    cb(null, user)
  } catch (err) {
    errorLoger.error(err.message)
  }
}
))

module.exports = passport

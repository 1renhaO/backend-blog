const Sequelize = require('sequelize')
const sequelize = require('../index')
const crypto = require('crypto')

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: {
        msg: '邮箱格式不正确'
      },
      isLowercase: {
        msg: '邮箱需要小写格式'
      },
      async hasRegist (value) {
        let user = null
        try {
          user = await User.findOne({ where: { 'email': value } })
        } catch (err) {
          throw err
        }
        if (user) throw new Error('邮箱已经被注册过')
      }
    }
  },
  provider: {
    type: Sequelize.STRING,
    defaultValue: 'local'
  },
  avatar: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  salt: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  created: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
    get () {
      const value = this.getDataValue('created')
      return {
        jsStamp: new Date(value).getTime(),
        unix: new Date(value).getTime() / 1000
      }
    }
  },
  updated: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  hashedPassword: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.VIRTUAL,
    set (value) {
      // Remember to set the data value, otherwise it won't be validated
      this.setDataValue('password', value)
      const salt = this.getSalt()
      this.setDataValue('salt', salt)
      const hashedPassword = this.encryptPassword(value)
      this.setDataValue('hashedPassword', hashedPassword)
    },
    validate: {
      len: [6, 15]
    }
  }
})

User.prototype.authenticate = function (password) {
  return this.hashedPassword === this.encryptPassword(password)
}
User.prototype.getSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}
User.prototype.encryptPassword = function (password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha1').toString('base64')
}

module.exports = User

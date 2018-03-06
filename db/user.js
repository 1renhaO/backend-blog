const Sequelize = require('sequelize')
const sequelize = require('./index')
const crypto = require('crypto')

const User = sequelize.define('User', {
  nickname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true,
      isLowercase: true
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
    },
  },
  likeList: {
    type: Sequelize.STRING,
    get() {
      const stringList = this.getDataValue('likeList')
      return stringList.split(',')
    },
    set(value) {
      this.setDataValue('likeList', value.join(','))
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
    allowNull: false
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
    type: DataTypes.VIRTUAL,
    set(value) {
      // Remember to set the data value, otherwise it won't be validated
      this.setDataValue('password', value)
      const salt = this.getSalt()
      this.setDataValue('salt', salt)
      const hashedPassword = this.encryptPassword()
      this.setDataValue('hashedPassword', hashedPassword)
    },
    validate: {
      len: [6, 15]
    }
  }
})

User.prototype.authenticate = function () {
  return this.hashedPassword === this.encryptPassword()
}
User.prototype.getSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}
User.prototype.encryptPassword = function (password) {
  return crypto.pbkdf2Sync(value, salt, 10000, 64, 'sha1').toString('base64')
}

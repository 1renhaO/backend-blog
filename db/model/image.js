const Sequelize = require('sequelize')
const sequelize = require('../index')

const Image = sequelize.define('Image', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  path: {
    type: Sequelize.STRING,
    validate: {
      isUrl: {
        msg: '图片地址必须为 url 地址'
      }
    }
  }
})

module.exports = Image

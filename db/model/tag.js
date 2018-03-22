const Sequelize = require('sequelize')
const sequelize = require('../index')

const Tag = sequelize.define('Tag', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Tag

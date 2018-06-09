const Sequelize = require('sequelize')
const sequelize = require('../index')

const Topic = sequelize.define('Topic', {
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

module.exports = Topic

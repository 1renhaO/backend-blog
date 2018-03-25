
const Sequelize = require('sequelize')
const sequelize = require('../index')

const Post = sequelize.define('Post', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
    unique: true
  },
  visitCount: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  top: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  content: {
    type: Sequelize.STRING,
  },
  // createAt: {
  //   type: Sequelize.DATE,
  //   defaultValue: Sequelize.NOW
  // },
  publishTime: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  // updateTime: {
  //   type: Sequelize.DATE,
  //   defaultValue: Sequelize.NOW
  // }
})

module.exports = Post

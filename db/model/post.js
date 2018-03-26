
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
    unique: true,
    validate: {
      async hasUsed (value) {
        let post = null
        try {
          post = await Post.findOne({ where: { 'title': value } })
        } catch (err) {
          throw err
        }
        if (post) throw new Error('post[titile]: 名称已经被使用过')
      }
    }
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
    defaultValue: 1
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  publishTime: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
  // updateTime: {
  //   type: Sequelize.DATE,
  //   defaultValue: Sequelize.NOW
  // }
})

module.exports = Post

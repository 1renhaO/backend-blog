
const Sequelize = require('sequelize')
const sequelize = require('../index')
const Utils = require('../../utils/utils')
const MarkdownIt = require('markdown-it')
const markDown = new MarkdownIt({
  html: true // 启用html标记转换
})
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
        if (post) throw new Error(`${value}: 名称已经被使用过`)
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
    type: Sequelize.STRING(10000),
    allowNull: false,
    get () {
      let content = this.getDataValue('content')
      if (content) return markDown.render(content)
      return content
    }
  },
  publishTime: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get () {
      let value = this.getDataValue('publishTime')
      return Utils.sqlDate2Js(value)
    }
  }
})

module.exports = Post

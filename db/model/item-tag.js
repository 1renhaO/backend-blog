const Sequelize = require('sequelize')
const sequelize = require('../index')

const ItemTag = sequelize.define('item_tag', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tagId: {
    type: Sequelize.INTEGER,
    unique: 'item_tag_taggable',
    references: null
  },
  taggable: {
    type: Sequelize.STRING,
    unique: 'item_tag_taggable'
  },
  taggableId: {
    type: Sequelize.INTEGER,
    unique: 'item_tag_taggable',
    references: null
  }
})

module.exports = ItemTag

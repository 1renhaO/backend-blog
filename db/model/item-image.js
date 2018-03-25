const Sequelize = require('sequelize')
const sequelize = require('../index')

const ItemImage = sequelize.define('ItemImage', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  imageId: {
    type: Sequelize.INTEGER,
    unique: 'image_tag_taggable',
    references: null
  },
  imageAble: {
    type: Sequelize.STRING,
    unique: 'image_tag_taggable'
  },
  imageAbleId: {
    type: Sequelize.INTEGER,
    unique: 'image_tag_taggable',
    references: null
  }
})

module.exports = ItemImage

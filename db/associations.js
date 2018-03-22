const User = require('./model/user')
const Post = require('./model/post')
const Tag = require('./model/tag')
const ItemTag = require('./model/item-tag')

Post.belongsToMany(Tag, {
  through: {
    model: ItemTag,
    unique: 'item_tag_taggable',
    scope: {
      taggable: 'post'
    },
  },
  foreignKey: 'taggableId',
})

Tag.belongsToMany(Post, {
  through: {
    model: ItemTag,
    unique: 'item_tag_taggable'
  },
  foreignKey: 'tagId',
})

module.exports = {
  User,
  Post,
  Tag,
  ItemTag
}

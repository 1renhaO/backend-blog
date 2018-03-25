const User = require('./model/user')
const Post = require('./model/post')
const Tag = require('./model/tag')
const ItemTag = require('./model/item-tag')
const Image = require('./model/image')
const ItemImage = require('./model/item-image')

Post.belongsToMany(Image, {
  through: {
    model: ItemImage,
    unique: 'item_image_imageAble',
    scope: {
      imageAble: 'post'
    }
  },
  foreignKey: 'imageAbleId'
})

Image.belongsToMany(Post, {
  through: {
    model: ItemImage,
    unique: 'item_image_imageAlbe',
  },
  foreignKey: 'imageId'
})

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
  ItemTag,
  Image,
  ItemImage
}

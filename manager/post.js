const Associations = require('../db/associations')
const Post = Associations.Post
const Image = Associations.Image
const ItemImage = Associations.ItemImage
const Tag = Associations.Tag
const Op = require('sequelize').Op
const Utils = require('../utils/utils')
const sequelize = require('../db/index')
const _ = require('lodash')
const redis = require('../redis')
const REDIS_KEYS = require('../redis/keys')

const getArchiveFromRedis = async () => {
  let result = await redis.getAsync(REDIS_KEYS.ARCHIVE)
  return JSON.parse(result)
}

const setArchiveToRedis = async (archive) => {
  await redis.setAsync(REDIS_KEYS.ARCHIVE, archive)
}

const getArchiveFromDB = async () => {
  let result = {}
  const times = await Post.findAll({
    attributes: [[sequelize.fn('DATE_FORMAT', sequelize.col('publishTime'), '%Y-%m'), 'date']],
    group: sequelize.fn('DATE_FORMAT', sequelize.col('publishTime'), '%Y-%m')
  })

  const length = times.length
  for (let i = 0; i < length; i++) {
    let obj = await Post.findAll({
      where: sequelize.where(sequelize.fn('DATE_FORMAT', sequelize.col('publishTime'), '%Y-%m'), Op.eq, sequelize.literal(`"${times[i].dataValues.date}"`)),
      attributes: ['id', 'title', 'publishTime', 'status', 'visitCount']
    })
    const objLength = obj.length
    for (let i = 0; i < objLength; i++) {
      obj[i] = obj[i].get({
        plain: true
      })
    }
    result[times[i].dataValues.date] = obj
  }
  return result
}

const getArchive = async function (ctx, next) {
  try {
    let result = await getArchiveFromRedis()
    if (!result) {
      result = await getArchiveFromDB()
      await setArchiveToRedis(JSON.stringify(result))
    }
    ctx.status = 200
    ctx.body = {
      code: 0,
      data: result,
      msg: 'success'
    }
  } catch (err) {
    ctx.throw(500, err.message)
  }
}

const getPostList = async function (ctx, next) {
  let currentPage = parseInt(ctx.query.currentPage) > 0 ? parseInt(ctx.query.currentPage) : 1
  let pageSize = parseInt(ctx.query.pageSize) > 0 ? parseInt(ctx.query.pageSize) : 10
  try {
    let result = await Post.findAndCountAll({
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
      where: {
        status: {
          [Op.eq]: 1
        }
      }
    })
    ctx.status = 200
    result.currentPage = currentPage
    result.pageSize = pageSize
    ctx.body = {
      code: 0,
      data: result,
      msg: 'success'
    }
  } catch (err) {
    ctx.throw(500, err.message)
  }
}

const getPostByTitle = async function (ctx, next) {
  const title = ctx.params.title
  try {
    let post = await Post.findOne({
      where: {
        title: {
          [Op.like]: `%${title}%`
        }
      }
    })
    ctx.status = 200
    ctx.body = {
      code: 0,
      data: post,
      msg: 'success'
    }
  } catch (err) {
    ctx.throw(500, err.message)
  }
}

const getPostById = async function (ctx, next) {
  let id = ctx.params.id
  try {
    let post = await Post.findById(id)
    post.visitCount++
    await post.save()
    ctx.status = 200
    ctx.body = {
      code: 0,
      data: {
        title: post.title,
        content: post.content,
        visitCount: post.visitCount,
        top: post.top,
        publishTime: post.publishTime
      },
      msg: 'success'
    }
  } catch (err) {
    ctx.throw(500, err.message)
  }
}

const getBetweenPostById = async function (ctx, next) {
  let id = ctx.params.id
  let post = null
  let prePostId = null
  let nextPostId = null
  let max = null
  let min = null
  try {
    let all = await Post.findAll({order: [['id', 'ASC']]})
    if (_.isArray(all) && all.length > 0) {
      min = all[0].id
      max = all[all.length - 1].id
    }
    post = await Post.findById(id)
    prePostId = await Post.max('id', {
      where: {
        id: {
          [Op.lt]: post.id
        }
      }
    })
    nextPostId = await Post.min('id', {
      where: {
        id: {
          [Op.gt]: post.id
        }
      }
    })
    ctx.status = 200
    ctx.body = {
      msg: 'success',
      code: 0,
      data: {
        prePostId,
        nextPostId,
        max,
        min
      }
    }
  } catch (err) {
    ctx.throw(500, err.message)
  }
}

const getIndexImage = async function (ctx, next) {
  try {
    const imgUlr = await redis.get(REDIS_KEYS.INDEXIMG)
    if (imgUlr) {
      ctx.status = 200
      ctx.body = imgUlr
    } else {
      ctx.status = 200
      ctx.imgUlr = ''
    }
  } catch (err) {
    ctx.throw(500, err.message)
  }
}

const addPost = async function (ctx, next) {
  const content = ctx.request.body.content
  const title = ctx.request.body.title
  if (!content || !title) {
    ctx.status = 422
    ctx.body = {
      code: -1,
      msg: 'Title 和 Content 不能为空'
    }
  }

  let extractedImages = Utils.extractImage(content) // 提取 markdown 中的图片地址，供略缩图使用
  const t = await sequelize.transaction() // 开启一个事务
  try {
    let post = await Post.create({
      title,
      content
    },
    {
      transaction: t
    })
    let images = await Image.bulkCreate( // 将提取出来的图片地址放入数据库
      extractedImages,
      {
        transaction: t
      })

    if (_.isArray(images)) {
      let imageItems = images.map(image => {
        return {
          imageId: image.id,
          imageAbleId: post.id
        }
      })
      await ItemImage.bulkCreate(
        imageItems,
        {
          transaction: t
        }
      )
      t.commit()
      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: 'success',
        data: []
      }
    } else {
      t.rollback()
      throw new Error('error in Image.bulkCreate')
    }
  } catch (err) {
    t.rollback()
    ctx.throw(500, err.message)
  }
}

const getTopics = async (ctx, next) => {
  // const topic = ctx.params.topic
  // Post.findAll({
  //   where: {

  //   }
  // })
}

module.exports = {
  getTopics,
  getArchive,
  getPostList,
  getPostById,
  getBetweenPostById,
  getIndexImage,
  addPost,
  getPostByTitle
}

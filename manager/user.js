const User = require('../db/associations').User

const getUserList = async function (ctx, next) {
  let currentPage = parseInt(ctx.query.currentPage) > 0 ? parseInt(ctx.query.currentPage) : 1
  let pageSize = parseInt(ctx.query.pageSize) > 0 ? parseInt(ctx.query.pageSize) : 10
  let result = {}
  try {
    result = await User.findAndCountAll({
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
      attributes: ['nickname', 'email', 'provider', 'avatar', 'status', 'created']
    })
  } catch (err) {
    ctx.throw(500, err.message)
  }
  ctx.status = 200
  result.currentPage = currentPage
  result.pageSize = pageSize
  ctx.body = {
    code: 0,
    data: result,
    msg: 'success'
  }
}
const addUser = async function (ctx, next) {
  let nickname = ctx.request.body.nickname
  let email = ctx.request.body.email
  let password = ctx.request.body.password
  // TODO validation
  try {
    await User.create({
      nickname,
      email,
      password
    })
  } catch (err) {
    ctx.throw(422, err.message)
  }
  ctx.body = {
    code: 0,
    msg: 'success'
  }
}

const deleteUser = function (ctx, next) {

}
const updateUserById = async function (ctx, next) {
  let id = ctx.params.id
  let user = null
  try {
    user = await User.findById(id)
  } catch (err) {
    ctx.throw(500, err.message)
  }
  if (!user) {

  } else {
    for (let i in ctx.request.body) {
      if (ctx.request.body.hasOwnProperty(i)) {
        user[i] = ctx.request.body[i]
      }
    }
    try {
      user.updated = new Date()
      await user.save()
    } catch (err) {
      ctx.throw(422, err.message)
    }
    ctx.status = 200
    ctx.body = {
      code: 0,
      message: 'success',
      data: []
    }
  }
}

module.exports = {
  updateUserById,
  deleteUser,
  addUser,
  getUserList
}

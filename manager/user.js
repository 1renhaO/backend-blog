const User = require('../db/associations').User

const getAll = async function (ctx, next) {
  let currentPage = parseInt(ctx.query.currentPage) > 0 ? parseInt(ctx.query.currentPage) : 1
  let pageSize = parseInt(ctx.query.pageSize) > 0 ? parseInt(ctx.query.pageSize) : 10
  let result = await User.findAll({
    limit: pageSize,
    offset: (currentPage - 1) * pageSize,
    attributes: ['nickname', 'email', 'provider', 'avatar', 'status', 'created']
  })
  let count = await User.count()
  ctx.status = 200
  ctx.body = {
    data: result,
    count: count
  }
}
const addUser = function (ctx, next) {

}

const deleteUser = function (ctx, next) {

}
const updateUser = function (ctx, next) {

}

module.exports = {
  updateUser,
  deleteUser,
  addUser,
  getAll
}

const QINIU = require('../qiniu')

const uploadFile = async function (ctx, next) {
  let file = ctx.request.body.files.file
  let respBody = await QINIU.uploadFile(file.name, file.path)
  ctx.response.status = 200
  ctx.response.body = respBody
}

module.exports = {
  uploadFile
}

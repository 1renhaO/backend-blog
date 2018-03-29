
const qiniu = require('qiniu')
const config = require('../config')

const mac = new qiniu.auth.digest.Mac(config.QINIU.AK, config.QINIU.SK)

const putPolicy = new qiniu.rs.PutPolicy({
  scope: config.QINIU.BUCKET,
  returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
})

const upToken = putPolicy.uploadToken(mac)

const qiniuConfig = new qiniu.conf.Config()

qiniuConfig.zone = qiniu.zone.Zone_z0

const formUploader = new qiniu.form_up.FormUploader(qiniuConfig)

const putExtra = new qiniu.form_up.PutExtra()

const uploadFile = function (key, filePath) {
  return new Promise((resolve, reject) => {
    formUploader.putFile(upToken, key, filePath, putExtra, (err, respBody, respInfo) => {
      if (err) reject(err)
      if (respInfo.statusCode === 200) {
        respBody.url = config.QINIU.DOMAIN + respBody.key
        resolve(respBody)
      } else {
        reject(new Error(`error Status ${respInfo.statusCode} in ${JSON.stringify(respInfo.statusCode)}`))
      }
    })
  })
}

const uploadStream = function (key, readableStream) {
  return new Promise((resolve, reject) => {
    formUploader.putStream(upToken, key, readableStream, putExtra, (err, respBody, respInfo) => {
      if (err) reject(err)
      if (respInfo.statusCode === 200) {
        respBody.url = config.QINIU.DOMAIN + respBody.key
        resolve(respBody)
      } else {
        reject(new Error(`error Status ${respInfo.statusCode} in ${JSON.stringify(respInfo.statusCode)}`))
      }
    })
  })
}
const QINIU = {
  uploadFile,
  uploadStream
}

module.exports = QINIU

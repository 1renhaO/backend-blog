const _ = require('lodash')
const URL = require('url')
const cryptoRandomString = require('crypto-random-string')
const extractImage = function (content) {
  let results = []
  const images = content.match(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g)
  if (_.isArray(images) && images.length > 0) {
    for (let i = 0, j = images.length; i < j; i++) {
      var url = images[i].replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/, function ($1, m1, m2, m3, m4) {
        return m4 || ''
      })
      if (url !== '') {
        let pathname = new URL(url).pathname.split('/')
        let name = cryptoRandomString(10)
        if (_.isArray(pathname) && pathname.length !== 0) {
          name = pathname[pathname.length - 1]
        }
        results.push({
          path: url,
          name: name
        })
      }
    }
  }
  return results
}

const sqlDate2Js = function (value) {
  return {
    jsStamp: new Date(value).getTime(),
    unix: new Date(value).getTime() / 1000
  }
}
module.exports = {
  extractImage,
  sqlDate2Js
}

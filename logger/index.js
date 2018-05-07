const log4js = require('log4js')
const path = require('path')
log4js.configure({
  appenders: {
    accessLoger: { type: 'dateFile', filename: path.resolve(__dirname, '../app_log/log4js/access.log'), keepFileExt: true, daysToKeep: 30 },
    errorLoger: { type: 'dateFile', filename: path.resolve(__dirname, '../app_log/log4js/error.log'), keepFileExt: true, daysToKeep: 30 }
  },
  categories: {
    default: { appenders: ['accessLoger'], level: 'trace' },
    accessLoger: { appenders: ['accessLoger'], level: 'trace' },
    errorLoger: { appenders: ['errorLoger'], level: 'trace' }
  },
  pm2: false
})

const accessLoger = log4js.getLogger('accessLoger')
const errorLoger = log4js.getLogger('errorLoger')

// accessLoger.level = 'trace'
// errorLoger.level = 'trace'

module.exports = {
  accessLoger,
  errorLoger
}

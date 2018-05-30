const log4js = require('log4js')
const path = require('path')
log4js.configure({
  appenders: {
    accessLogger: { type: 'dateFile', filename: path.resolve(__dirname, '../app_logs/log4js/access.log'), keepFileExt: true, daysToKeep: 30 },
    errorLogger: { type: 'dateFile', filename: path.resolve(__dirname, '../app_logs/log4js/error.log'), keepFileExt: true, daysToKeep: 30 }
  },
  categories: {
    default: { appenders: ['accessLogger'], level: 'trace' },
    accessLogger: { appenders: ['accessLogger'], level: 'trace' },
    errorLogger: { appenders: ['errorLogger'], level: 'trace' }
  },
  pm2: false
})

const accessLogger = log4js.getLogger('accessLogger')
const errorLogger = log4js.getLogger('errorLogger')

module.exports = {
  accessLogger,
  errorLogger
}

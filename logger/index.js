const log4js = require('log4js')

log4js.configure({
  appenders: {
    accessLoger: { type: 'dateFile', filename: '../app_log/log4js/access.log', keepFileExt: true, daysToKeep: 30 },
    errorLoger: { type: 'dateFile', filename: '../app_log/log4js/error.log', keepFileExt: true, daysToKeep: 30 }
  },
  categories: {
    default: { appenders: ['accessLoger'], level: 'all' },
    accessLoger: { appenders: ['accessLoger'], level: 'all' },
    errorLoger: { appenders: ['errorLoger'], level: 'all' }
  },
  pm2: false
})

const accessLoger = log4js.getLogger('accessLoger')
const errorLoger = log4js.getLogger('errorLoger')

module.exports = {
  accessLoger,
  errorLoger
}

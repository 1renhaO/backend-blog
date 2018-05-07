const Sequelize = require('sequelize')
const config = require('../config')
const sequelize = new Sequelize('blog', config.DB.USER, config.DB.PASSWORD, {
  host: config.DB.HOST,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

module.exports = sequelize

require('./associations')

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

if (config.DB.SYNC) {
  sequelize.sync()
}

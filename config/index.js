module.exports = {
  port: process.env.NODE_ENV === 'develop' ? 8090 : 8081,
  wechatToken: 'lrh',
  secret: process.env.SECRET,
  QINIU: {
    AK: process.env.QINIU_AK,
    SK: process.env.QINIU_SK,
    BUCKET: process.env.QINIU_BUCKET,
    DOMAIN: process.env.QINIU_DOMAIN
  },
  DB: {
    SYNC: process.env.NODE_ENV === 'develop' ? true : false, // eslint-disable-line
    HOST: process.env.DB_HOST || '127.0.0.1',
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD
  },
  REDIS: {
    // HOST: process.env.REDIS_HOST || '127.0.0.1',
    HOST: '127.0.0.1',
    PORT: process.env.REDIS_PORT || 6379,
    FAMILY: process.env.REDIS_FAMILY || 4,
    DB: process.env.REDIS_DB || 0
  },
  GITHUB: {
    CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    CLINET_SECRET: process.env.GITHUB_CLIENT_SECRET,
    CALLBACK_URL: process.env.GITHUB_CALLBAK_URL
  }
}

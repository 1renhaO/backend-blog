module.exports = {
    port: process.env.NODE_ENV === 'develop' ? 8090 : 8081,
    wechatToken: process.env.WECHAT_TOKEN
}
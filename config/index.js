module.exports = {
    port: process.env.NODE_ENV === 'develop' ? 8082 : 8081,
    wecahtToken: process.env.WECHAT_TOKEN
}
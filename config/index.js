module.exports = {
    port: process.env.NODE_ENV === 'develop' ? 8080 : 80,
    wecahtToken: process.env.WECHAT_TOKEN
}
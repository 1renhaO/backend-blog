const qiniu = require("qiniu")
const config = require('../config')

qiniu.conf.ACCESS_KEY = config.QINIU.AK;
qiniu.conf.SECRET_KEY = config.QINIU.SK;

const fileStore = function () {

}

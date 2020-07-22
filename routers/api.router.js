const router = require('koa-router')();
const controller = require('../controller/api.controller')

router.get('/', controller.getWeather)

module.exports = router
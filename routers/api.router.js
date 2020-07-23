const router = require('koa-router')();
const controller = require('../controller/api.controller');
const auth = require('../middleware/auth');

router.get('/weather', auth, controller.getWeather)

module.exports = router
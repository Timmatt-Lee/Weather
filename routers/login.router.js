const router = require('koa-router')();
const controller = require('../controller/login.controller')

router.get('/login', controller.getLogin)
router.post('/login', controller.postLogin)

module.exports = router
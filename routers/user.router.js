const router = require('koa-router')();
const controller = require('../controller/user.controller')

router.get('/login', controller.getLogin)
router.post('/login', controller.postLogin)
router.post('/signup', controller.postSignup)
router.get('/logout', controller.getLogout)

module.exports = router
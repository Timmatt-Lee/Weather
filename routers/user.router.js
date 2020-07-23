const router = require('koa-router')();
const controller = require('../controller/user.controller')
const auth = require('../middleware/auth');

router.get('/login', auth, controller.getLogin)
router.get('/logout', auth, controller.getLogout)
router.post('/login', controller.postLogin)
router.post('/signup', controller.postSignup)

module.exports = router
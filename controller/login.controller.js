const md5 = require('md5')
const auth = require('../middleware/auth')
const exception = require('../exceptions');
const User = require('../models').User;

exports.getLogin = async ctx => {
	if (!auth(ctx))
		exception(ctx, "api", "insufficientPermission");
	else
		ctx.body = ctx.session.user;
}

exports.postLogin = async ctx => {

}
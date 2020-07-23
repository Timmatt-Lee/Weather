const auth = require('../middleware/auth')
const exception = require('../exceptions');
const User = require('../models').User;
var validator = require('validator');

exports.getLogin = async ctx => {
	if (!auth(ctx))
		return exception(ctx, 'user', 'insufficientPermission');
	else
		ctx.body = { name: ctx.session.user };
}

exports.getLogout = async ctx => {
	if (!auth(ctx))
		return exception(ctx, 'user', 'insufficientPermission');
	else {
		ctx.session = null;
		ctx.body = {};
	}
}

exports.postLogin = async ctx => {
	if (ctx.request.body == undefined)
		return exception(ctx, 'api', 'invalidParameter');

	let { name, password } = ctx.request.body;

	if (!validator.isHash(password, 'sha512') ||
		!validator.isAscii(name))
		return exception(ctx, 'api', 'invalidParameter');

	const user = await User.findOne({ where: { name: name } });
	if (user == null)
		return exception(ctx, 'user', 'nameNotExists');

	if (user.validatePassword(password)) {
		ctx.session = {
			id: user.id,
			user: user.name
		};

		ctx.body = { name: ctx.session.user };
	} else
		return exception(ctx, 'user', 'wrongPassword');
}

exports.postSignup = async ctx => {
	if (ctx.request.body == undefined)
		return exception(ctx, 'api', 'invalidParameter');

	let { name, password } = ctx.request.body;

	if (!validator.isHash(password, 'sha512') ||
		!validator.isAscii(name))
		return exception(ctx, 'api', 'invalidParameter');

	var user = await User.findOne({ where: { name: name } });
	if (user != null)
		return exception(ctx, 'user', 'nameExists');

	user = await User.create({ name: name, password: password });

	ctx.session = {
		id: user.id,
		user: user.name
	};

	ctx.body = { name: ctx.session.user };
}
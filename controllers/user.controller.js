const { request, summary, tags, body, middlewares } = require('koa-swagger-decorator');
const exception = require('../exceptions');
const auth = require('../middlewares/auth');
const User = require('../models').User;
var validator = require('validator');
const sha512 = require('js-sha512');

const tag = tags(['User']);

const userSchema = {
	name: { type: 'string', example: 'Timmatt', required: true },
	password: { type: 'string', example: sha512('test'), format: 'password', required: true }
}

class UserController {
	@request('post', '/signup')
	@summary('註冊')
	@tag
	@body(userSchema)
	async postSignup(ctx) {
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

	@request('post', '/login')
	@summary('登入')
	@tag
	@body(userSchema)
	async postLogin(ctx) {
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

	@request('get', '/login')
	@summary('獲取登入者姓名')
	@tag
	@middlewares(auth)
	async getLogin(ctx) {
		ctx.body = { name: ctx.session.user };
	}

	@request('get', '/logout')
	@summary('登出')
	@tag
	@middlewares(auth)
	async getLogout(ctx) {
		ctx.session = null;
		ctx.body = {};
	}
}

module.exports = UserController;
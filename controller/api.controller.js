const auth = require('../middleware/auth');
const exception = require('../exceptions');
const WeatherLog = require('../models').WeatherLog;

exports.getWeather = async ctx => {
	if (!auth(ctx))
		return exception(ctx, 'user', 'insufficientPermission');
	ctx.body = await WeatherLog.findAll();
}
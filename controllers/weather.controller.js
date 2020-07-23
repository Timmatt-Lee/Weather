const { request, summary, tags, middlewares } = require('koa-swagger-decorator');
const WeatherLog = require('../models').WeatherLog;
const auth = require('../middlewares/auth');

const tag = tags(['Weather'])

class WeatherController {
	@request('get', '/weather')
	@summary('獲取天氣')
	@tag
	@middlewares(auth)
	async getWeather(ctx) {
		ctx.body = await WeatherLog.findAll();
	}
}


module.exports = WeatherController;
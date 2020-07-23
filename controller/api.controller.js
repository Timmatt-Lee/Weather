const WeatherLog = require('../models').WeatherLog;

exports.getWeather = async ctx => {
	ctx.body = await WeatherLog.findAll();
}
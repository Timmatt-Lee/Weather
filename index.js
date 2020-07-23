require('dotenv').config();

const Koa = require('koa');
const path = require('path');
const cors = require('@koa/cors');
const requestId = require('koa-requestid');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const schedule = require('node-schedule');
const weatherService = require('./services/weather.service');
const { SwaggerRouter } = require('koa-swagger-decorator');

const app = new Koa();

// DEV: if you would like to auto migrate
// require("./models").sequelize.sync();

app.keys = [process.env.APP_KEY];

// fetch weather when the minute is 03  
schedule.scheduleJob('03 * * * *', weatherService);

const router = new SwaggerRouter();
router.swagger({
	title: 'Weather',
	description: 'api documentation',
	version: '1.0.0',
});
router.mapDir(path.resolve(__dirname + '/controllers/'));

app
	.use(session(app))
	.use(requestId())
	.use(bodyParser())
	.use(cors())// enable CORS policy
	.use(router.routes())
	.use(router.allowedMethods());

app.listen(process.env.APP_PORT);
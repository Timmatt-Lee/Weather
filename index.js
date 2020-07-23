require('dotenv').config();

const Koa = require('koa');
const cors = require('@koa/cors');
const requestId = require('koa-requestid');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const schedule = require('node-schedule');
const weatherService = require('./services/weather.service');

const app = new Koa();

// DEV: if you would like to auto migrate
// require("./models").sequelize.sync();

app.keys = [process.env.APP_KEY];

app.use(session(app));

app.use(requestId());

app.use(bodyParser());

// enable CORS policy
app.use(cors());

app.use(require('./routers/api.router.js').routes());
app.use(require('./routers/user.router.js').routes());

// fetch weather when the minute is 01  
schedule.scheduleJob('01 * * * *', weatherService);

app.listen(process.env.APP_PORT);
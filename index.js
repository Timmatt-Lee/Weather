require('dotenv').config();

const Koa = require('koa');
const cors = require('@koa/cors');
const requestId = require('koa-requestid');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');

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
app.use(require('./routers/login.router.js').routes());

app.listen(process.env.APP_PORT);
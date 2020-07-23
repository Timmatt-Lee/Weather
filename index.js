const Koa = require('koa');
const cors = require('@koa/cors');
const requestId = require('koa-requestid');
const session = require('koa-session');

const app = new Koa();

// DEV: if you would like to auto migrate
// require("./models").sequelize.sync();

app.use(session(app));

app.use(requestId());

// enable CORS policy
app.use(cors());

app.use(require('./routers/api.router.js').routes());
app.use(require('./routers/login.router.js').routes());

app.listen(3000);
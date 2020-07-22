const Koa = require('koa');
const cors = require('@koa/cors');

const app = new Koa();

// DEV: if you would like to auto migrate
// require("./models").sequelize.sync();

// enable CORS policy
app.use(cors());

app.use(require('./routers/api.router.js').routes())

app.listen(3000);
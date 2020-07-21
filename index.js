const Koa = require('koa');
const axios = require('axios');
const cors = require('@koa/cors');

const app = new Koa();

// enable CORS policy
app.use(cors());

app.use(async (ctx) => {
    // get data
    const url = '';
    const data = await axios.get(url);
});

app.listen(3000);
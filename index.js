const Koa = require('koa');
const axios = require('axios');
const cors = require('@koa/cors');

const app = new Koa();

// enable CORS policy
app.use(cors());

app.use(async (ctx) => {
    // get data
    const url = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-A0001-001?Authorization=CWB-42F0992A-D405-4D6B-AE5C-F9C09A49ABB5&downloadType=WEB&format=JSON';
    const result = await axios.get(url);

    const data = result.data.cwbopendata;

    // json to html table
    var html = '<table class="table table-striped">';
    html += '<tr>';
    // column name
    data.location[0].weatherElement.forEach(weather => {
        html += '<th>' + weather.elementName + '</th>';
    });
    html += '</tr>';
    // row value
    data.location.forEach(location => {
        html += '<tr>';
        location.weatherElement.forEach(weather => {
            html += '<td>' + weather.elementValue.value + '</td>';
        });
        html += '<tr>';
    });
    html += '</table>';

    ctx.body = html;
});

app.listen(3000);
require('dotenv').config();

const axios = require('axios');
const WeatherLog = require('../models').WeatherLog;

async function WeatherService() {
    rows = [];

    await WeatherLog.destroy({ truncate: true });

    // get data
    const url = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-A0001-001?Authorization='
        + process.env.WEATHER_API_KEY +
        '&downloadType=WEB&format=JSON';
    const result = await axios.get(url);

    const data = result.data.cwbopendata;

    const colName = [
        'elevation',
        'windDirection',
        'windSpeed',
        'temperature',
        'humidity',
        'pressure',
        'rain',
        'maxWindSpeed',
        'maxWindDirection',
        'maxWindTime',
        'maxTemperature',
        'maxTemperatureTime',
        'minTemperature',
        'minTemperatureTime',
    ];

    data.location.forEach(location => {
        // only process required cities
        var city = location.parameter[0].parameterValue;
        var town = location.parameter[2].parameterValue;
        if (city != "臺北市" &&
            city != "新北市" &&
            city != "桃園市")
            return;

        // row data
        var row = { city, town };
        location.weatherElement.forEach((weather, i) => {
            // skip N/A data
            if (weather.elementValue.value != -99)
                row[colName[i]] = weather.elementValue.value;
        });

        rows.push(row);
    });

    await WeatherLog.bulkCreate(rows);
}

module.exports = WeatherService;
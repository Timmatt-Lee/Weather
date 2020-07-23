const auth = require('../middleware/auth');
const axios = require('axios');

exports.getWeather = async ctx => {
	if (!auth(ctx))
		ctx.body = "Need Login";

	// get data
	const url = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-A0001-001?Authorization=CWB-42F0992A-D405-4D6B-AE5C-F9C09A49ABB5&downloadType=WEB&format=JSON';
	const result = await axios.get(url);

	const data = result.data.cwbopendata;

	// json to html table
	var html = '<table class="table table-striped">';
	html += '<tr>';
	// column name
	html += '<th>CITY</th>';
	data.location[0].weatherElement.forEach(weather => {
		html += '<th>' + weather.elementName + '</th>';
	});
	html += '</tr>';
	// row value
	data.location.forEach(location => {
		// only process required cities
		var city = location.parameter[0].parameterValue;
		var town = location.parameter[2].parameterValue;
		if (city != "臺北市" &&
			city != "新北市" &&
			city != "桃園市")
			return;

		html += '<tr>';

		// row data
		html += '<td>' + city + " " + town + '</td>';
		location.weatherElement.forEach(weather => {
			html += '<td>' + weather.elementValue.value + '</td>';
		});
		html += '<tr>';
	});
	html += '</table>';

	ctx.body = html;
}
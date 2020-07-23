'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataType) => {
	class WeatherLog extends Model { };

	WeatherLog.init({
		id: {
			type: DataType.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		city: DataType.STRING,
		town: DataType.STRING,
		elevation: DataType.FLOAT,
		windDirection: DataType.INTEGER,
		windSpeed: DataType.FLOAT,
		temperature: DataType.FLOAT,
		humidity: DataType.FLOAT,
		pressure: DataType.FLOAT,
		rain: DataType.FLOAT,
		maxWindSpeed: DataType.FLOAT,
		maxWindDirection: DataType.FLOAT,
		maxWindTime: DataType.DATE,
		maxTemperature: DataType.FLOAT,
		maxTemperatureTime: DataType.DATE,
		minTemperature: DataType.FLOAT,
		minTemperatureTime: DataType.DATE,
		createdAt: {
			allowNull: false,
			type: DataType.DATE
		},
		updatedAt: {
			allowNull: false,
			type: DataType.DATE
		}
	}, {
		sequelize
	});

	return WeatherLog;
}
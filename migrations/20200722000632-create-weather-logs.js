'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('WeatherLogs', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			elevation: Sequelize.FLOAT,
			windDirection: Sequelize.INTEGER,
			windSpeed: Sequelize.FLOAT,
			temperature: Sequelize.FLOAT,
			humidity: Sequelize.FLOAT,
			pressure: Sequelize.FLOAT,
			rain: Sequelize.FLOAT,
			maxWindSpeed: Sequelize.FLOAT,
			maxWindDirection: Sequelize.FLOAT,
			maxWindTime: Sequelize.DATE,
			maxTemperature: Sequelize.FLOAT,
			maxTemperatureTime: Sequelize.DATE,
			minTemperature: Sequelize.FLOAT,
			minTemperatureTime: Sequelize.DATE,
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('WeatherLogs');
	}
};

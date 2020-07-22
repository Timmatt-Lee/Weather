'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('weather_logs', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			elevation: Sequelize.FLOAT,
			wind_direction: Sequelize.INTEGER,
			wind_speed: Sequelize.FLOAT,
			temperature: Sequelize.FLOAT,
			humidity: Sequelize.FLOAT,
			pressure: Sequelize.FLOAT,
			rain: Sequelize.FLOAT,
			max_wind_speed: Sequelize.FLOAT,
			max_wind_direction: Sequelize.FLOAT,
			max_wind_time: Sequelize.DATE,
			max_temperature: Sequelize.FLOAT,
			max_temperature_time: Sequelize.DATE,
			min_temperature: Sequelize.FLOAT,
			min_temperature_time: Sequelize.DATE,

			created_at: Sequelize.DATE,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('weather_logs');
	}
};

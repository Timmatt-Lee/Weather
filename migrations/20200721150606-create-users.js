'use strict';

module.exports = {
	up: async (queryInterface, DataType) => {
		await queryInterface.createTable('Users', {
			id: {
				type: DataType.UUID,
				primaryKey: true
			},
			name: {
				type: DataType.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataType.STRING,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: DataType.DATE
			},
			updatedAt: {
				allowNull: false,
				type: DataType.DATE
			}
		});
	},

	down: async (queryInterface, DataType) => {
		await queryInterface.dropTable('Users');
	}
};

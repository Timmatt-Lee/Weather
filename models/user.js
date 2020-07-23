'use strict';
const bcrypt = require("bcrypt");
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class User extends Model { };

	User.init({
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			set(value) {
				this.setDataValue(
					'password',
					bcrypt.hashSync(value, bcrypt.genSaltSync(8))
				)
			},
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE
		}
	}, {
		sequelize,
		modelName: 'User',
	});

	User.prototype.validatePassword = function (password) {
		return bcrypt.compareSync(password, this.password);
	}

	return User;
}
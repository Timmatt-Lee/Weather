'use strict';
const bcrypt = require("bcrypt");
const { Model } = require('sequelize');

module.exports = (sequelize, DataType) => {
	class User extends Model { };

	User.init({
		id: {
			type: DataType.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: DataType.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataType.STRING,
			allowNull: false,
			set(value) {
				this.setDataValue(
					'password',
					bcrypt.hashSync(value, bcrypt.genSaltSync(8))
				)
			},
		},
		createdAt: {
			type: DataType.DATE,
			allowNull: false,
		},
		updatedAt: {
			allowNull: false,
			type: DataType.DATE
		}
	}, {
		sequelize
	});

	User.prototype.validatePassword = function (password) {
		return bcrypt.compareSync(password, this.password);
	}

	return User;
}
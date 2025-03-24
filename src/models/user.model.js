const sequelize = require('sequelize');
const connection = require('../config/db.config');

const user = connection.define(
	'user',
	{
		UserName: {
			type: sequelize.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		Password_Hash: {
			type: sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		FirstName: {
			type: sequelize.STRING,
			allowNull: false,
		},
		LastName: {
			type: sequelize.STRING,
			allowNull: true,
		},
		EmailId: {
			type: sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		County: {
			type: sequelize.STRING,
			allowNull: true,
		},
		PinCode: {
			type: sequelize.INTEGER,
			allowNull: true,
		},
		City: {
			type: sequelize.STRING,
			allowNull: true,
		},
		AccoutCreationDate: {
			type: sequelize.DATE,
			defaultValue: sequelize.NOW,
			allowNull: false,
		},
		LoginTime: {
			type: sequelize.DATE,
			defaultValue: sequelize.NOW,
			allowNull: false,
		},
	},
	{
		tableNamw: 'users',
		timestamps: false,
		// createdAt: 'CreatedAt',
		// updatedAt: 'UpdatedAt',
		// deletedAt: 'DeletedAt',
	}
);

module.exports = user;

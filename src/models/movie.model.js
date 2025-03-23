const Sequelize = require('sequelize');
const connection = require('../config/db.config');

const movie = connection.define(
	'movie',
	{
		MovieID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		MovieName: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		MovieDescription: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		Genre: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		Genre2: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		Genre3: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		Genre4: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		Language: {
			type: Sequelize.ENUM,
			allowNull: false,
			values: ['English', 'Hindi', 'Bengali'],
		},
		OriginalLanguage: {
			type: Sequelize.ENUM,
			allowNull: false,
			values: ['English', 'Hindi', 'Bengali'],
		},
		IMDBRating: {
			type: Sequelize.FLOAT,
			allowNull: true,
		},
		cast: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		Directors: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		ReleaseDate: {
			type: Sequelize.DATE,
			allowNull: true,
		},
		Thumbnail: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		FileName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		FileType: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		CarouselFile: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		Awards: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		Nominations: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		Duration: {
			type: Sequelize.TIME,
			allowNull: true,
		},
	},
	{
		tableName: 'moviedetails',
		timestamps: false,
		// createdAt: 'CreatedAt',
		// updatedAt: 'UpdatedAt',
		// deletedAt: 'DeletedAt',
	}
);

module.exports = movie;

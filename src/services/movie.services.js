const sequelize = require('sequelize');
const connection = require('../config/db.config');
const movie = require('../models/movie.model');
const { Op, Sequelize } = require('sequelize');

module.exports.getallmovies = async () => {
	try {
		const movies = await movie.findAll();
		return movies;
	} catch (err) {
		console.log(err);
	}
};

module.exports.getmoviesbygenre = async (genre) => {
	try {
		const movies = await movie.findAll({
			where: {
				Genre: genre,
			},
		});
		return movies;
	} catch (err) {
		console.log(err);
	}
};

module.exports.getmoviesbysearchparam = async (searchparam) => {
	const searchTerm = `%${searchparam.replace(/\s/g, '')}%`;
	try {
		const movies = await movie.findAll({
			where: {
				[Op.or]: [
					Sequelize.where(Sequelize.fn('REPLACE', Sequelize.col('Genre'), ' ', ''), { [Op.like]: searchTerm }),
					Sequelize.where(Sequelize.fn('REPLACE', Sequelize.col('MovieName'), ' ', ''), { [Op.like]: searchTerm }),
					Sequelize.where(Sequelize.fn('REPLACE', Sequelize.col('cast'), ' ', ''), { [Op.like]: searchTerm }),
					Sequelize.where(Sequelize.fn('REPLACE', Sequelize.col('Directors'), ' ', ''), { [Op.like]: searchTerm }),
				],
			},
		});
		return movies;
	} catch (err) {
		console.log(err);
	}
};

module.exports.getmoviesbyid = async (id) => {
	try {
		const movies = await movie.findAll({
			where: {
				MovieID: id,
			},
		});
		return movies;
	} catch (err) {
		console.log(err);
	}
};

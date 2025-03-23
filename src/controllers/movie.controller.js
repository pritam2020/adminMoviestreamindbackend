const { validationResult } = require('express-validator');
const movieServices = require('../services/movie.services');
const bcrypt = require('bcryptjs');

module.exports.actioncontroller = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	movieServices
		.getmoviesbygenre('Action')
		.then((movies) => {
			if (movies.length == 0) {
				return res.status(404).json({ message: 'No Action movies found' });
			}
			res.status(200).json(movies);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Internal Server Error', error: err });
		});
};

module.exports.adventurecontroller = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	movieServices
		.getmoviesbygenre('Adventure')
		.then((movies) => {
			if (movies.length == 0) {
				return res.status(404).json({ message: 'No Adventure movies found' });
			}
			res.status(200).json(movies);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Internal Server Error', error: err });
		});
};

module.exports.awardwinningcontroller = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	movieServices
		.getmoviesbygenre('Award-winning')
		.then((movies) => {
			if (movies.length == 0) {
				return res.status(404).json({ message: 'No Award-winning movies found' });
			}
			res.status(200).json(movies);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Internal Server Error', error: err });
		});
};

module.exports.biographycontroller = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	movieServices
		.getmoviesbygenre('Biography')
		.then((movies) => {
			if (movies.length == 0) {
				return res.status(404).json({ message: 'No Biography movies found' });
			}
			res.status(200).json(movies);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Internal Server Error', error: err });
		});
};

module.exports.comedycontroller = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	movieServices
		.getmoviesbygenre('Comedy')
		.then((movies) => {
			if (movies.length == 0) {
				return res.status(404).json({ message: 'No Comedy movies found' });
			}
			res.status(200).json(movies);
		})
		.catch((err) => {
			console.log('in controller call');
			console.log(err);
			res.status(500).json({ message: 'Internal Server Error', error: err });
		});
};

module.exports.documentarycontroller = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	movieServices
		.getmoviesbygenre('Documentary')
		.then((movies) => {
			if (movies.length == 0) {
				return res.status(404).json({ message: 'No documentary movies found' });
			}
			res.status(200).json(movies);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Internal Server Error', error: err });
		});
};

module.exports.dramacontroller = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	movieServices
		.getmoviesbygenre('Drama')
		.then((movies) => {
			if (movies.length == 0) {
				return res.status(404).json({ message: 'No Drama movies found' });
			}
			res.status(200).json(movies);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Internal Server Error', error: err });
		});
};

module.exports.fantasycontroller = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	movieServices
		.getmoviesbygenre('Fantasy')
		.then((movies) => {
			if (movies.length == 0) {
				return res.status(404).json({ message: 'No fantasy movies found' });
			}
			res.status(200).json(movies);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Internal Server Error', error: err });
		});
};

module.exports.horrorcontroller = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	movieServices
		.getmoviesbygenre('Horror')
		.then((movies) => {
			if (movies.length == 0) {
				return res.status(404).json({ message: 'No horror movies found' });
			}
			res.status(200).json(movies);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Internal Server Error', error: err });
		});
};

module.exports.mysterycontroller = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	movieServices
		.getmoviesbygenre('Mystery')
		.then((movies) => {
			if (movies.length == 0) {
				return res.status(404).json({ message: 'No Mystery movies found' });
			}
			res.status(200).json(movies);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Internal Server Error', error: err });
		});
};

module.exports.romancecontroller = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	movieServices
		.getmoviesbygenre('Romance')
		.then((movies) => {
			if (movies.length == 0) {
				return res.status(404).json({ message: 'No romance movies found' });
			}
			res.status(200).json(movies);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Internal Server Error', error: err });
		});
};

module.exports.scificontroller = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	movieServices
		.getmoviesbygenre('Sci-fi')
		.then((movies) => {
			if (movies.length == 0) {
				return res.status(404).json({ message: 'No Sci-fi movies found' });
			}
			res.status(200).json(movies);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Internal Server Error', error: err });
		});
};

module.exports.thrillercontroller = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	movieServices
		.getmoviesbygenre('Thriller')
		.then((movies) => {
			if (movies.length == 0) {
				return res.status(404).json({ message: 'No Thriller movies found' });
			}
			res.status(200).json(movies);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Internal Server Error', error: err });
		});
};

module.exports.warcontroller = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	movieServices
		.getmoviesbygenre('War')
		.then((movies) => {
			if (movies.length == 0) {
				return res.status(404).json({ message: 'No War movies found' });
			}
			res.status(200).json(movies);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Internal Server Error', error: err });
		});
};
module.exports.getmoviesbysearchparamcontroller = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	movieServices
		.getmoviesbysearchparam(req.query.SearchQuery)
		.then((movies) => {
			if (movies.length == 0) {
				return res.status(404).json({ message: 'No movies found for the search ' + req.query.searchTerm });
			}
			res.status(200).json(movies);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Internal Server Error', error: err });
		});
};

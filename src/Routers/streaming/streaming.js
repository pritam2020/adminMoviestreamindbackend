const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const connection = require('../../utils/DB_connection.js');

router.get('/', (req, res) => {
	connection.query(`SELECT * from moviedetails where MovieID=${req.query.movieID}`, (err, results) => {
		if (err) {
			res.status(500).json(err);
			console.log(err);
		} else {
			//console.log(results);
			if (results.length == 0) {
				res.status(404).json({
					messgae: ` movie details of ${req.query.movieID} not found`,
				});
				console.log(`movie details of ${req.movieID} not found`);
			} else {
				res.status(200).json(results);
				console.log(results);
			}
		}
	});
});

module.exports = router;

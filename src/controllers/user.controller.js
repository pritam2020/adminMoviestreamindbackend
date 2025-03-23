const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { localstrategy, googlestrategy } = require('../config/passport.strategies');
const userServices = require('../services/user.Services');
const dotenv = require('dotenv');
dotenv.config();
passport.use(localstrategy);
passport.use(googlestrategy);

passport.serializeUser((user, cb) => {
	cb(null, { username: user.UserName });
});

passport.deserializeUser((user, cb) => {
	cb(null, user);
});

module.exports.register = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		const { Username, Password, FirstName, LastName, EmailId, Country, Pincode, City } = req.body;
		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(Password, salt);
		const user = await userServices.createUser(Username, passwordHash, FirstName, LastName, EmailId, Country, Pincode, City);
		res.status(201).json(user);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

module.exports.login = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res.status(400).json({ errors: errors.array() });
	}
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			console.log(err);
			return res.status(500).json({ message: 'An error occurred', err: err });
		}
		if (!user) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}
		req.logIn(user, (err) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: 'An error occurred', err: err });
			}
			return res.status(200).json({ message: 'Login successful' });
		});
	})(req, res, next);
};

module.exports.googleLogin = async (req, res, next) => {
	passport.authenticate('google')(req, res, next);
};

exports.googleRedirect = async (req, res, next) => {
	passport.authenticate('google', {
		successRedirect: `https://${process.env.REACT_APP_SERVER}:${process.env.REACT_APP_PORT}/user/home`,
		failureRedirect: `https://${process.env.REACT_APP_SERVER}:${process.env.REACT_APP_PORT}/`,
	})(req, res, next);
};

exports.logout = async (req, res) => {
	req.logOut(function (err) {
		if (err) {
			return res.status(500).json({ message: 'An error occurred while logging', err: err });
		}
		console.log('logout successful');
		res.status(200).json({ message: 'successfully logged out', status: 'success' });
	});
};

exports.userinfo = async (req, res) => {
	const user = await userServices.getUserByUsername(req.user.username);
	if (user) {
		return res.status(200).json(user);
	} else {
		return res.status(404).json({ message: 'User not found' });
	}
};

const bcrypt = require('bcryptjs');
const passport = require('passport');
const userServices = require('../services/user.Services');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oidc');

module.exports.localstrategy = new LocalStrategy(async (username, password, cb) => {
	try {
		const user = await userServices.getUserByUsername(username);
		if (!user) {
			console.log('User does not exist');
			return cb(null, false);
		}
		const isMatch = await bcrypt.compare(password, user.Password_Hash);
		if (isMatch) {
			return cb(null, user);
		} else {
			console.log('Password does not match');
			return cb(null, false);
		}
	} catch (err) {
		console.log(err);
		return cb(err);
	}
});

module.exports.googlestrategy = new GoogleStrategy(
	{
		clientID: process.env['GOOGLE_CLIENT_ID'],
		clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
		callbackURL: 'https://movies4unow.online:3002/user/clientgooglelogin/oauth2/redirect/google',
		scope: ['profile', 'email'],
	},
	async function verify(issuer, profile, cb) {
		//check if user exists in the database
		try {
			const user = await userServices.getUserByUsername(profile.displayName);
			if (user) {
				return cb(null, user);
			}
			const passwordHash = await bcrypt.hash(profile.id, 10);
			console.log(passwordHash);
			const newUser = await userServices.createUser(profile.displayName, passwordHash, profile.name.givenName, profile.name.familyName, profile.emails[0].value, profile.country ? profile.country : '', profile.pincode ? profile.pincode : null, profile.city ? profile.city : '');
			if (!newUser) {
				return cb(null, false);
			}
			return cb(null, newUser);
		} catch (err) {
			console.log(err);
			return cb(err, null);
		}
	}
);

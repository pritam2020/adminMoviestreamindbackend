const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const user = require('../models/user.model');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use('/protected-route', (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.status(401).end('You must be logged in to access this resource');
	}
	next();
});
router.post(
	'/signup',
	[
		body('Username').isString().withMessage('Username must be a string'),
		body('Password').isString().withMessage('Password must be a string'),
		body('Password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
		body('Password')
			.matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
			.withMessage('Password must contain at least one letter and one number'),
		body('FirstName').isString().withMessage('FirstName must be a string'),
		body('LastName').isString().withMessage('LastName must be a string'),
		body('EmailId').isEmail().withMessage('EmailId must be a valid email'),
		body('Country').isString().withMessage('Country must be a string'),
		body('Pincode').isNumeric().withMessage('Pincode must be a number'),
		body('City').isString().withMessage('City must be a string'),
	],
	userController.register
);

router.post(
	'/login',
	[
		body('username').isString().withMessage('Username must be a string'),
		body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
		body('password').isString().withMessage('Password must be a string'),
		body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
		body('password')
			.matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
			.withMessage('Password must contain at least one letter and one number'),
	],
	userController.login
);

router.get('/clientgooglelogin/federated/google', userController.googleLogin);

router.get('/clientgooglelogin/oauth2/redirect/google', userController.googleRedirect);

router.get('/protected-route/logout', userController.logout);

router.get('/protected-route/useraccount', userController.userinfo);

module.exports = router;

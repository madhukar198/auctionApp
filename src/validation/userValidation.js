const { body, check } = require('express-validator');

exports.createUser_v = [
	// Custom validator to ensure either email or mobile is provided
	check().custom((value, { req }) => {
		if (!req.body.email && !req.body.mobile) {
			throw new Error('Please provide either email or mobile');
		}
		return true;
	}),
	body('email').optional().isEmail().trim().withMessage('Please provide a valid email'),
	body('mobile').optional().notEmpty().trim().withMessage('Please provide a valid mobile number'),
	body('password')
		.notEmpty()
        .trim()
		.withMessage('Please provide a password')
		.isLength({ min: 8 })
		.withMessage('Password should be at least 8 characters long')
];

exports.login_v = [
	// Custom validator to ensure either email or mobile is provided
	check().custom((value, { req }) => {
		if (!req.body.email && !req.body.mobile) {
			throw new Error('Please provide either email or mobile');
		}
		return true;
	}),
	body('email').optional().isEmail().trim().withMessage('Please provide a valid email'),
	body('mobile').optional().notEmpty().trim().withMessage('Please provide a valid mobile number'),
	body('password')
		.notEmpty()
        .trim()
		.withMessage('Please provide a password')
		.isLength({ min: 8 })
		.withMessage('Password should be at least 8 characters long')
];




exports.changePassword_v = [

	body('newPassword')
		.notEmpty()
        .trim()
		.withMessage('Please provide a password')
		.isLength({ min: 8 })
		.withMessage('Password should be at least 8 characters long'),
	
		body('oldPassword')
		.notEmpty()
        .trim()
		.withMessage('Please provide a password')
		.isLength({ min: 8 })
		.withMessage('Password should be at least 8 characters long')
];
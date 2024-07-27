const { body, check ,query} = require('express-validator');

exports.placeBid_v = [

	body('itemId').notEmpty().withMessage('Please provide a valid mobile itemId').trim(),
	body('amount')
	.notEmpty()
	.withMessage('Please provide a amount').isFloat({ gt: 0 }).withMessage('amount must be a positive number'),
];

exports.placeitem_v = [
	body('itemId').notEmpty().withMessage('Please provide a valid mobile itemId').trim(),
	body('quantity')
	.notEmpty()
	.withMessage('Please provide a quantity').isFloat({ gt: 0 }).withMessage('quantity must be a positive number'),
];

exports.getBidByItemId_v = [
	query('itemId').notEmpty().withMessage('Please provide a valid mobile itemId').trim(),
];

exports.getBookingsByItemId_v = [
	query('itemId').notEmpty().withMessage('Please provide a valid mobile itemId').trim(),
];
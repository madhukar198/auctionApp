
const { body } = require('express-validator');

exports.listItem_v = [
	body('name').notEmpty().withMessage('Please provide a name').trim(),
	body('description').notEmpty().withMessage('Please provide a description').trim(),
	body('startingBid').notEmpty().withMessage('Please provide a startingBid').isFloat({ gt: 0 }).withMessage('Starting bid must be a positive number'),
	body('auctionEnd').notEmpty().withMessage('Please provide a auctionEnd')
];

exports.listFixedPriceItem_v = [
	body('name').notEmpty().withMessage('Please provide a name').trim(),
	body('description').notEmpty().withMessage('Please provide a description').trim(),
	body('fixedPrice').notEmpty().withMessage('Please provide a fixedPrice').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
	body('totalQuantity').notEmpty().withMessage('Please provide a totalQuantity').isFloat({ gt: 0 }).withMessage('Quantity must be a positive number'),
];

exports.deleteItem_v = [
	body('item_id').notEmpty().withMessage('Please provide a item_id').trim()
];

//updateAuctionItem_v

exports.updateAuctionItem_v = [
	body('item_id').notEmpty().withMessage('Please provide a item_id').trim()
];
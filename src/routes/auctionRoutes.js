const express = require('express');
const { listItem, viewItems,listFixedPriceItem } = require('../controllers/auctionController');
// const { protect } = require('../middleware/authMiddleware');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/list', protect, listItem);
router.get('/view', viewItems);
router.post('/sale', protect, listFixedPriceItem);

module.exports = router;

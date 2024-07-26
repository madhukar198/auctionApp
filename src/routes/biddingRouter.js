const express = require('express');
const { placeBid } = require('../controllers/biddingController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/bid', protect, placeBid);


module.exports = router;

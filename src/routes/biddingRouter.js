const express = require('express');
const { placeBid, placeitem, getBidByItemId, getBookingsByItemId, getBookings_userId } = require('../controllers/biddingController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../utils/validator_auth')

const {placeBid_v, getBidByItemId_v, getBookingsByItemId_v, placeitem_v} = require('../validation/biddingBookingValidation');
const router = express.Router();



router.post('/placeBid', protect, placeBid_v, validate, placeBid);
router.post('/placeitem', protect, placeitem_v, validate, placeitem);
router.get('/getBidByItemId', protect, getBidByItemId_v, validate, getBidByItemId);
router.get('/getBookingsByItemId', protect, getBookingsByItemId_v, validate, getBookingsByItemId);
router.get('/getBookings_userId', protect, getBookings_userId);

module.exports = router;

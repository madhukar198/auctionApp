const express = require('express');
const router = express.Router();
const { listItem, viewItems,listFixedPriceItem ,viewFixedPriceItems,deleteItem, updateAuctionItem,updateFixedPriceItem} = require('../controllers/auctionController');
const { protect } = require('../middleware/authMiddleware');
const {listItem_v, listFixedPriceItem_v, deleteItem_v,updateAuctionItem_v} = require('../validation/auctionValidation');
const validate = require('../utils/validator_auth')


router.post('/list', protect,listItem_v,validate, listItem);
router.get('/view', viewItems);
router.get('/view', viewItems);
router.patch('/updateAuctionItem',protect,updateAuctionItem_v,validate,  updateAuctionItem);
router.delete('/deleteItem', protect,deleteItem_v,validate, deleteItem);


router.post('/sale', protect,listFixedPriceItem_v,validate, listFixedPriceItem);
router.patch('/updateSaleItem',protect,updateAuctionItem_v,validate,  updateFixedPriceItem);
router.get('/viewFixedPriceItems',  viewFixedPriceItems);

module.exports = router;

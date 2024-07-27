const express = require('express');
const router = express.Router();
const { listItem, viewItems,listFixedPriceItem ,viewFixedPriceItems,deleteItem, updateAuctionItem,updateFixedPriceItem, viewFixedPriceItems_userId, viewItems_userId} = require('../controllers/auctionController');
const { protect } = require('../middleware/authMiddleware');
const {listItem_v, listFixedPriceItem_v, deleteItem_v,updateAuctionItem_v} = require('../validation/auctionValidation');
const validate = require('../utils/validator_auth')


router.post('/list', protect,listItem_v,validate, listItem);
router.get('/view', viewItems);
router.patch('/updateListItems',protect,updateAuctionItem_v,validate,  updateAuctionItem);
router.delete('/deleteItem', protect,deleteItem_v,validate, deleteItem);


router.post('/sale', protect,listFixedPriceItem_v,validate, listFixedPriceItem);
router.patch('/updateSaleItem',protect,updateAuctionItem_v,validate,  updateFixedPriceItem);
router.get('/viewFixedPriceItems',  viewFixedPriceItems);
router.get('/viewFixedPriceItems_userId',protect,  viewFixedPriceItems_userId);
router.get('/viewItems_userId',protect,  viewItems_userId);

module.exports = router;

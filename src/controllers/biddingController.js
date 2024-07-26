const initModels = require('../models/index');
const { connectUserDB, connectAuctionDB } = require('../../config/db');


const response = require('../utils/appResponse')
const AppError = require("../utils/appError")
const catchAsync= require("../utils/catchAsync")
// exports.createAdmin = catchAsync(async(



exports.placeBid = catchAsync(async(req, res) => {
    const { itemId, amount } = req.body;
      const { Item, Bid  } = await initModels();
      const item = await Item.findById(itemId);
      if (!item) {
        return next(new AppError("Item not found", 404));
      }
      if (amount <= item.currentBid) {
        return next(new AppError("Bid must be higher than the current bid", 400));
      }
      const bid = new Bid({
        item: itemId,
        amount,
        bidder: req.user.id,
      });
      await bid.save();
      item.currentBid = amount;
      item.highestBidder = req.user.id;
      await item.save();
      res.json(bid);
      return response(res, 'Bid Placed Successfully..!', bid);
   
  })



  exports.placeBid = catchAsync(async(req, res) => {
    const { itemId, amount } = req.body;
    
      const { Item, Bid  } = await initModels();
      const item = await Item.findById(itemId);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      if (amount <= item.currentBid) {
        return res.status(400).json({ message: 'Bid must be higher than the current bid' });
      }
      const bid = new Bid({
        item: itemId,
        amount,
        bidder: req.user.id,
      });
      await bid.save();
      item.currentBid = amount;
      item.highestBidder = req.user.id;
      await item.save();
      return response(res, 'Bid Placed Successfully..!', bid);
   
  })
  
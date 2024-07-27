const initModels = require('../models/index');
const { connectUserDB, connectAuctionDB } = require('../../config/db');



const response = require('../utils/appResponse')
const AppError = require("../utils/appError")
const catchAsync= require("../utils/catchAsync")
const {fetchProduct,biddProduct, buyProduct, fetchInventory} = require('../services/biddingAndBookingServices');



exports.placeBid = catchAsync(async(req, res) => {
    const { itemId, amount } = req.body;
    let user_id = req.user.id

    let item = await fetchProduct({itemId})

      // const item = await Item.findById(itemId);
      if (!item) {
        return next(new AppError("Item not found", 404));
      }
      if (amount <= item.currentBid) {
        return next(new AppError("Bid must be higher than the current bid", 400));
      }
      const bid =await biddProduct({itemId,user_id, amount})
      return response(res, 'Bid Placed Successfully..!', bid);
  })


// booking 
  exports.placeitem = catchAsync(async(req, res) => {
    const { itemId, quantity} = req.body;
    let user_id = req.user.id
    

    let item = await fetchProduct({itemId})

    if(!item) return next(new AppError("Item not found", 404));

    let InventoryData = await fetchInventory({itemId});


    // check if the 
    if(InventoryData && InventoryData.quantityBooked + quantity > InventoryData.totalQuantity){
      return next(new AppError("Item not available", 400));
    }

    const amount = item.fixedPrice * quantity;
    const quantityBooked = InventoryData.quantityBooked + quantity
    

    let bookingData =await buyProduct({itemId, quantity, user_id,amount, quantityBooked})




    buyProduct({itemId})
    
      return response(res, 'Bid Placed Successfully..!', bid);
   
  })
  
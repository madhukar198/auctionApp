const response = require('../utils/appResponse')
const AppError = require("../utils/appError")
const catchAsync= require("../utils/catchAsync")
const {fetchProduct, fetchProduct_sale, biddProduct, buyProduct, fetchInventory, fetchbid, fetchBiddingData, fetchBookingData,fetchBookingData_userID} = require('../services/biddingAndBookingServices');



exports.placeBid = catchAsync(async(req, res, next) => {
    const { itemId, amount } = req.body;
    let user_id = req.user.id

    let item = await fetchProduct({itemId})

      // const item = await Item.findById(itemId);
      if (!item) {
        return next(new AppError("Item not found", 404));
      }

      console.log("item-->",item);
      if (item.itemType !== "auction")  return next(new AppError("Not A Valid itemId", 404));


      if (amount <= item.currentBid) {
        return next(new AppError(`Bid must be higher than the current bid $${item.currentBid}`, 400));
      }
      const bid =await biddProduct({itemId,user_id, amount})
      return response(res, 'Bid Placed Successfully..!', bid);
  })

  exports.placeitem = catchAsync(async(req, res, next) => {
    const { itemId, quantity} = req.body;
    let user_id = req.user.id

    let item = await fetchProduct({itemId})

    if(!item) return next(new AppError("Item not found", 404));
    
    if (item.itemType !== "sale")  return next(new AppError("Not A Valid itemId", 404));
    if (item.isSold == true)  return next(new AppError("Out of Stock", 404));
    
    let InventoryData = await fetchInventory({itemId});
    console.log("item-->",item);

    console.log("InventoryData-->",InventoryData);

    if(InventoryData && InventoryData.quantityBooked + quantity > InventoryData.totalQuantity){
      return next(new AppError("Item not available", 400));
    }

    const amount = item.fixedPrice * quantity;
    const quantityBooked = InventoryData.quantityBooked + quantity

    console.log("amount -->",amount);
    

    let bookingData = await buyProduct({itemId, quantity, user_id,amount, quantityBooked})
    
      return response(res, 'Item Placed Successfully..!', bookingData);
  })

  exports.getBidByItemId= catchAsync(async(req, res, next) => {
    const { itemId } = req.query;

    let bids = await fetchBiddingData({itemId})

      return response(res, 'Bidding fetched Successfully..!', bids);
  })

  exports.getBookingsByItemId = catchAsync(async(req, res, next) => {
    const { itemId } = req.query;
    const BookingData = await fetchBookingData({itemId})    
      return response(res, 'Item Placed Successfully..!', BookingData);
  })

  exports.getBookings_userId = catchAsync(async(req, res, next) => {
    let user_id = req.user.id
    const BookingData = await fetchBookingData_userID({user_id})    
      return response(res, 'Item Placed Successfully..!', BookingData);
  })

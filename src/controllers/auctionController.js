const response = require('../utils/appResponse')
const AppError = require("../utils/appError")
const catchAsync= require("../utils/catchAsync");
const { default: mongoose } = require('mongoose');
mongoose.set('strictPopulate', false);

const { addListItem, addSaleItem, deleteItemById, updateListItem, updateSaleItem, getLiveListItem, getSalesListItem, getSalesListItem_userId, getLiveListItem_userId} = require('../services/auctionServices');


exports.listItem = catchAsync(async(req, res, next) => {
  const { name, description, startingBid, auctionEnd } = req.body;
  let id = req.user.id

  let item = await addListItem({name, description, startingBid, auctionEnd, id})

    return response(res, `Item Added to bid Successfully..!`, item);
})

exports.viewItems = catchAsync(async(req, res, next) => {

  let productData = await getLiveListItem()
    return response(res, `Items Fetched Successfully..!`, productData);
})


exports.listFixedPriceItem = catchAsync(async(req, res, next) => {
  const { name, description, fixedPrice,  totalQuantity} = req.body;
  let id = req.user.id
  const item  = await addSaleItem({name, description, fixedPrice,  totalQuantity, id})
    // item._doc.inventry = inventry
    return response(res, `Sales Created Successfully..!`, item);
})


exports.viewFixedPriceItems = catchAsync(async(req, res, next) => {

  let salesProduct = await getSalesListItem()
    return response(res, `Sales Fetched Successfully..!`, salesProduct);
})


exports.deleteItem = catchAsync(async(req, res, next) => {
  const { item_id} = req.body;
  const id = req.user.id;

  let item = await deleteItemById({item_id, id})
    if(item){
      return response(res, 'Item Deleted Successfully..!');
    }else{
      return next(new AppError("User not Match", 400));
    }
})


exports.updateAuctionItem = catchAsync(async(req, res, next) => {
  const { item_id, name, description, startingBid, auctionEnd } = req.body;
  const user_id = req.user.id;

  let item = await updateListItem({ item_id, name, description, startingBid, auctionEnd, user_id })

    if(item){
      return response(res, 'Item Updated Successfully..!',item);
    }else{
      return next(new AppError("Invalid item/user_id", 400));
    }
})


exports.updateFixedPriceItem = catchAsync(async(req, res, next) => {
  const { item_id, name, description, fixedPrice,  totalQuantity } = req.body;
  const user_id = req.user.id;

  let item = await updateSaleItem({item_id, name, description, fixedPrice, totalQuantity , user_id})

  if(item){
    return response(res, 'Item Updated Successfully..!',item);
  }else{
    return next(new AppError("Invalid item/user_id", 400));
  }
})

exports.viewItems_userId = catchAsync(async(req, res, next) => {
  const user_id = req.user.id;
  let productData = await getLiveListItem_userId({user_id})
    return response(res, `Items Fetched Successfully..!`, productData);
})


exports.viewFixedPriceItems_userId = catchAsync(async(req, res, next) => {
  const user_id = req.user.id;
  let salesProduct = await getSalesListItem_userId({user_id})
    return response(res, `Sales Fetched Successfully..!`, salesProduct);
})
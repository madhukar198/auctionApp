// const  Item = require('../models/Item');
// const Bid = require('../models/Bid');
const initModels = require('../models/index');
const { connectUserDB, connectAuctionDB } = require('../../config/db');
// const mongoose = require('mongoose');




const response = require('../utils/appResponse')
const AppError = require("../utils/appError")
const catchAsync= require("../utils/catchAsync");
const { default: mongoose } = require('mongoose');
mongoose.set('strictPopulate', false);

const { addListItem, addSaleItem, deleteItemById, updateListItem, updateSaleItem} = require('../services/auctionServices');


exports.listItem = catchAsync(async(req, res, next) => {
  const { name, description, startingBid, auctionEnd } = req.body;
  let id = req.user.id

  let item = await addListItem({name, description, startingBid, auctionEnd, id})

     
    return response(res, `Item Added to bid Successfully..!`, item);
})

exports.viewItems = catchAsync(async(req, res, next) => {
  
    const { Item ,User,Inventory} = await initModels();
    // const { User } = await initModels();
   
    // const items = await Item.find().populate('listedBy');

    const currentDate = new Date();
    const items = await Item.find({itemType:"auction",auctionEnd:{$lte:currentDate } ,isDeleted: { $ne: true }}).populate({
      path: 'listedBy',
      model: User,
      select: 'email mobile'
    })

    // res.json(items);
    return response(res, `Items Fetched Successfully..!`, items);
  
})

exports.listFixedPriceItem = catchAsync(async(req, res, next) => {
  const { name, description, fixedPrice,  totalQuantity} = req.body;
  let id = req.user.id
  
  const item  = await addSaleItem({name, description, fixedPrice,  totalQuantity, id})
  
    // item._doc.inventry = inventry
    return response(res, `Sales Created Successfully..!`, item);

})


exports.viewFixedPriceItems = catchAsync(async(req, res, next) => {

    const { Item, Inventory ,User} = await initModels();
    

    const items = await Item.find({itemType:"sale", isSold:false, isDeleted: { $ne: true }}).populate({
      path: 'listedBy',
      model: User,
      select: 'email mobile'
    }).populate({
      path: 'item',
      model: Inventory
    });
    // item._doc.inventry = inventry
    return response(res, `Sales Fetched Successfully..!`, items);

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
      return response(res, 'Item Updated Successfully..!');
    }else{
      return next(new AppError("Failed to Update", 400));
    }
})


exports.updateFixedPriceItem = catchAsync(async(req, res, next) => {
  const { item_id, name, description, fixedPrice,  totalQuantity } = req.body;
  const user_id = req.user.id;

  let item = await updateSaleItem({item_id, name, description, fixedPrice, totalQuantity , user_id})

  if(item){
    return response(res, 'Item Updated Successfully..!');
  }else{
    return next(new AppError("Failed to Update", 400));
  }
})
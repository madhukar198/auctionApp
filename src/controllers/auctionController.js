// const  Item = require('../models/Item');
// const Bid = require('../models/Bid');
const initModels = require('../models/index');
const { connectUserDB, connectAuctionDB } = require('../../config/db');




const response = require('../utils/appResponse')
const AppError = require("../utils/appError")
const catchAsync= require("../utils/catchAsync")
// exports.createAdmin = catchcatchAsync(async(async(req, res, next, next)=>{
//     const{email, password} = req.body;
//     const createAdmin = await adminSchema.create({email, password});
//     return response(res, 'Admin created Successfully..!', createAdmin);
// })







exports.listItem = catchAsync(async(req, res, next) => {
  const { name, description, startingBid, auctionEnd } = req.body;
    const { Item } = await initModels();
    const item = new Item({
      name,
      description,
      startingBid,
      auctionEnd,
      listedBy: req.user.id,
    });
    await item.save();
    res.json(item);
    
    return response(res, `Item Added to bid Successfully..!`, item);
}
)

exports.viewItems = catchAsync(async(req, res, next) => {
  
    const { Item ,User,Inventory} = await initModels();
    // const { User } = await initModels();
   
    // const items = await Item.find().populate('listedBy');
    const items = await Item.find().populate({
      path: 'listedBy',
      model: User,
      select: 'email mobile'
    }).populate({
      path: '_id',
      model: Inventory
    });

    // res.json(items);
    return response(res, `Items Fetched Successfully..!`, items);
  
})

exports.listFixedPriceItem = catchAsync(async(req, res, next) => {
  const { name, description, fixedPrice,  totalQuantity, } = req.body;
  
    const { Item, Inventory } = await initModels();
    const item = new Item({
      name,
      description,
      fixedPrice,
      listedBy: req.user.id,
    });

    const inventry = new Inventory({
     item:item._id, 
     totalQuantity
    });
    await inventry.save();
    await item.save();
    item._doc.inventry = inventry
    return response(res, `Sales Created Successfully..!`, item);

})


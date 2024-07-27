const initModels = require('../models/index');
const { connectUserDB, connectAuctionDB } = require('../../config/db');



exports.addListItem =  async({name, description, startingBid, auctionEnd, id})=>{
    try {
        const { Item } = await initModels();
    const item = new Item({
      name,
      description,
      startingBid,
      auctionEnd,
      listedBy: id,
    });
    await item.save();
        return item;
    } catch (error) {
        throw new Error(error) 
    }

}


exports.addSaleItem =  async({name, description, fixedPrice,  totalQuantity, id})=>{
    try {
        const { Item, Inventory } = await initModels();

    const item = new Item({
      name,
      description,
      fixedPrice,
      listedBy: id,
      itemType:"sale",
      // inventory:inventry._id
    });
    const inventry = new Inventory({
      item:item._id, 
      totalQuantity
     });
     await inventry.save();
    await item.save();

    return item
    } catch (error) {
        throw new Error(error)
    }

}



exports.deleteItemById=  async({item_id, id})=>{
    try {
        const { Item } = await initModels();
        const item = await Item.find({item_id});

        if(item.listedBy.toString() === id){
          item.isDeleted = true;
          await item.save();
          return item
        }else{
            return null;
        }
    } catch (error) {
        throw new Error(error)
    }

}

exports.updateListItem =  async({item_id, name, description, startingBid, auctionEnd , user_id})=>{
    try {
        const { Item } = await initModels();
    const item = await Item.findOne({_id:item_id});

    if(item && item.listedBy.toString() === user_id){
        item.name = name;
        item.description = description;
        item.startingBid = startingBid;
        item.auctionEnd = auctionEnd;
        await item.save();
        return item;
    }
        return null;
    } catch (error) {
        throw new Error(error) 
    }

}

exports.updateSaleItem =  async({item_id, name, description, fixedPrice, totalQuantity , user_id})=>{
    try {
        const { Item } = await initModels();
    const item = await Item.findOne({_id:item_id});

    if(item && item.listedBy.toString() === user_id){
        item.name = name;
        item.description = description;
        item.startingBid = startingBid;
        item.fixedPrice = fixedPrice;
        await item.save();
        return item;
    }
        return null;
    } catch (error) {
        throw new Error(error) 
    }

}


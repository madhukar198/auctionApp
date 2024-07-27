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

     item.inventory = inventry._id
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
        const item = await Item.findOne({_id:item_id});

        if(item && item.listedBy.toString() === id){
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
    const item = await Item.findOne({_id:item_id, itemType:"auction"});

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
        const { Item, Inventory } = await initModels();
    const item = await Item.findOne({_id:item_id, itemType:"sale"});

    if(item && item.listedBy.toString() === user_id){

        let updatedInventory =await  Inventory.findOneAndUpdate({item:item_id}, {$set:{totalQuantity:totalQuantity}}, {new:true})
        
        item.name = name;
        item.description = description;
        item.fixedPrice = fixedPrice;
        updatedInventory.quantityBooked >= updatedInventory.totalQuantity  ? item.isSold = true :  item.isSold = false  
        await item.save();
        return item;
    }
        return null;
    } catch (error) {
        throw new Error(error) 
    }

}

exports.getLiveListItem =  async()=>{
    try {
    const { Item, User } = await initModels();
        const currentDate = new Date();
        const items = await Item.find({itemType:"auction",auctionEnd:{$gte:currentDate } ,isDeleted:false}).populate({
          path: 'listedBy',
          model: User,
          select: 'email mobile'
        }).populate({
          path: 'highestBidder',
          model: User,
          select: 'email mobile'
        });
        return items;
    } catch (error) {
        throw new Error(error) 
    }

}

exports.getSalesListItem =  async()=>{
    try {
        const { Item, Inventory ,User} = await initModels();
        const items = await Item.find({itemType:"sale", isSold:false, isDeleted: false }).populate({
            path: 'listedBy',
            model: User,
            select: 'email mobile'
          }).populate({
              path: 'inventory',
              model: Inventory
            });
            return items
    } catch (error) {
        throw new Error(error) 
    }
}

exports.getLiveListItem_userId =  async({user_id})=>{
    try {
    const { Item, User } = await initModels();
        const currentDate = new Date();
        const items = await Item.find({itemType:"auction",isDeleted:false,listedBy:user_id }).populate({
          path: 'listedBy',
          model: User,
          select: 'email mobile'
        }).populate({
          path: 'highestBidder',
          model: User,
          select: 'email mobile'
        });
        return items;
    } catch (error) {
        throw new Error(error) 
    }

}


exports.getSalesListItem_userId =  async()=>{
    try {
        const { Item, Inventory ,User} = await initModels();
        const items = await Item.find({itemType:"sale", isDeleted: false }).populate({
            path: 'listedBy',
            model: User,
            select: 'email mobile'
          }).populate({
              path: 'inventory',
              model: Inventory
            });
            return items
    } catch (error) {
        throw new Error(error) 
    }
}

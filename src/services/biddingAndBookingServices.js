const initModels = require('../models/index');

// itemType:"sale"

exports.fetchProduct =  async({itemId})=>{
    try {
        const { Item  } = await initModels();
        const item = await Item.findOne({_id:itemId});
        return item;
    } catch (error) {
        throw new Error(error) 
    }
}

exports.fetchBiddingData =  async({itemId})=>{
    try {
        const { Bid, User } = await initModels();
        const item = await Bid.find({item:itemId}).populate({
            path: 'bidder',
            model: User,
            select: 'email mobile'
          })
        return item;
    } catch (error) {
        throw new Error(error) 
    }
}

exports.fetchBookingData =  async({itemId})=>{
    try {
        const { book, User  } = await initModels();
        const item = await book.find({item:itemId}).populate({
            path: 'user',
            model: User,
            select: 'email mobile'
          })
        return item;
    } catch (error) {
        throw new Error(error) 
    }
}
// fetchBookingData_userID

exports.fetchBookingData_userID =  async({user_id})=>{
    try {
        const { book, Item  } = await initModels();
        const item = await book.find({user:user_id}).populate({
            path: 'item',
            model: Item
          })
        return item;
    } catch (error) {
        throw new Error(error) 
    }
}


exports.biddProduct =  async({itemId,user_id, amount})=>{
    try {
        const { Item ,Bid } = await initModels();
        const item = await Item.findOneAndUpdate({_id:itemId}, {$set:{currentBid:amount,highestBidder: user_id }});
        const bid = new Bid({
            item: itemId,
            amount,
            bidder: user_id,
          });
          await bid.save();
          item.currentBid = amount;
          item.highestBidder = user_id;
          await item.save();
        return bid;
    } catch (error) {
        throw new Error(error) 
    }

}

exports.fetchInventory =  async({itemId})=>{
    try {
        const { Inventory } = await initModels();
        const item = await Inventory.findOne({item:itemId});
        return item;
    } catch (error) {
        throw new Error(error) 
    }
}


exports.buyProduct =  async({itemId,user_id,amount, quantity, quantityBooked})=>{
    try {
        const { Item, book, Inventory} = await initModels();

        let bookItem = new book({item:itemId,amount:amount,quantity,  user:user_id})

        await bookItem.save()

        let updateInventory = await Inventory.findOneAndUpdate({item:itemId}, {$set:{quantityBooked:quantityBooked }}, {new:true})

        if(updateInventory.quantityBooked == updateInventory.totalQuantity){

            const item = await Item.findOneAndUpdate({_id:itemId}, {$set:{isSold:true}}, {new:true});

            console.log("item-updated->",item);
        }

        return bookItem;

    } catch (error) {
        console.log(error);
        throw new Error(error) 
    }
}

exports.fetchbid =  async({bidId})=>{
    try {
        const { Bid } = await initModels();
        const item = await Bid.findById(bidId);
        return item;
    } catch (error) {
        throw new Error(error) 
    }
}





const initModels = require('../models/index');



exports.fetchProduct =  async({itemId})=>{
    try {
        const { Item ,Bid } = await initModels();
        const item = await Item.findById(itemId);
        return item;
    } catch (error) {
        throw new Error(error) 
    }
}

exports.biddProduct =  async({itemId,quantity, user_id, amount})=>{
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
          item.highestBidder = req.user.id;
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
        const { Item ,Bid, book, Inventory} = await initModels();

        let bookItem = new book({item:itemId,amount:amount, user: user_id})

        await bookItem.save()


        let updateInventory = await Inventory.findOneAndUpdate({item:itemId}, {$set:{quantityBooked:quantityBooked }}, {new:true})

        if(updateInventory.quantityBooked == quantityBooked.totalQuantity){

            const item = await Item.findOneAndUpdate({_id:itemId}, {$set:{isSold:true}}, {new:true});

        }

        return bookItem;

    } catch (error) {
        throw new Error(error) 
    }
}



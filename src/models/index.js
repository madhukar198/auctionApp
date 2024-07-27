const { connectUserDB, connectAuctionDB ,connectBidersDB} = require('../../config/db');

const initModels = async () => {
  const userDB = await connectUserDB();
  const auctionDB = await connectAuctionDB();
  const biddingDB = await connectBidersDB();

  const UserSchema = require('./User');
  const ItemSchema = require('./Item');
  const BidSchema = require('./Bid');
  const bookSchema = require('./book');
  const InventorySchema = require('./Inventory');

  // Register models
  const User = userDB.model('User', UserSchema);
  const Item = auctionDB.model('Item', ItemSchema);
  const Inventory = auctionDB.model('Inventory', InventorySchema);
  const Bid = biddingDB.model('Bid', BidSchema);
  const book = biddingDB.model('bookSchema', bookSchema);

//   auctionDB.model('User', UserSchema);
  return { User, Item, Bid, Inventory, book};
};

module.exports = initModels;

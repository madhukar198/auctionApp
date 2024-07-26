const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startingBid: { type: Number, required: true },
  currentBid: { type: Number, default: 0 },
  highestBidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  auctionEnd: { type: Date, required: true },
  listedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemType:{		
  type: String,
		enum: ['auction', 'sale'],
		default: 'auction'
  },
  fixedPrice: { type: Number },
  isSold: { type: Boolean, default: false },
});

module.exports = itemSchema;

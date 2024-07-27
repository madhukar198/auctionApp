const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startingBid: { type: Number},
  currentBid: { type: Number, default: 0 },
  highestBidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  auctionEnd: { type: Date },
  listedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  inventory: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory'},
  itemType:{		
  type: String,
		enum: ['auction', 'sale'],
		default: 'auction'
  },
  fixedPrice: { type: Number },
  isSold: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
});

module.exports = itemSchema;

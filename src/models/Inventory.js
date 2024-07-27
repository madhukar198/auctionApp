const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  totalQuantity: { type: Number, required: true },
  quantityBooked: { type: Number, default: 0 },
}); 

module.exports = inventorySchema;
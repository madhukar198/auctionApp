const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  totalQuantity: { type: Number, required: true },
  quantityLeft: { type: Number, default: this.totalQuantity },
}); 

module.exports = itemSchema;
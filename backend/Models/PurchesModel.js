const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({

  paymantId: String,
  orderId: String,
  status: String,
  placed:String,
  userId: { type: Schema.Types.ObjectId },
  orderDetails: [],
  total: Number,
});

module.exports = mongoose.model('Order', orderSchema);
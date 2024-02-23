const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({

  title: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  discount: {
    type: String,
    require: true,
  },
  offer: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  }
})

module.exports = mongoose.model('Products', productSchema);
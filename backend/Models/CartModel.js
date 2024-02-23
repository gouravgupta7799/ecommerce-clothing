const mongoose = require('mongoose')
const schema = mongoose.Schema;

const CartSchema = new schema({

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
  quantity: {
    type: Number,
    require: true,
  },
  size: {
    type: String,
    require: true,
  },
  userId: {
    type: schema.Types.ObjectId,
    require: true,
  }
})

module.exports = mongoose.model('Cart', CartSchema);

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new schema({

  comment: {
    type: String,
    require: true
  },
  rateing: {
    type: Number,
    require: true
  },
  productId: {
    type: String,
    require: true,
  },
  user: {
    type: String,
    require: true,
  }

})

module.exports = mongoose.model('Comments', commentSchema);
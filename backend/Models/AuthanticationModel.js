const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userShema = new Schema({
  displayName: {
    type: String,
  },
  photoUrl: {
    type: String,
  },
  userEmail: {
    type: String,
    require: true
  },
  userPassword: {
    type: String,
    require: true
  },
  userNumber: {
    type: String,
  },
  userAddress: {
    type: String,
  },
  userTotalCart: {
    type: Number
  }

})

module.exports = mongoose.model('User', userShema);
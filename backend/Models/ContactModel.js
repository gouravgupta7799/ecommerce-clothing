const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ContactUsSchema = new schema({
  compaint: {
    type: String
  },
  userId: {
    type: schema.Types.ObjectId
  }
})

module.exports = mongoose.model('ContactUs', ContactUsSchema);
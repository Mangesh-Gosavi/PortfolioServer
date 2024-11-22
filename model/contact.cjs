const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:true,
  },
  message:{
    type: String,
    required: true,
  },
});

const Mails = mongoose.model('Mails', userSchema);

module.exports = Mails;
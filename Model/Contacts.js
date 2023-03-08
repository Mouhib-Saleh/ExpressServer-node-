const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
   
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  mail: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  }
 
});

module.exports = mongoose.model("Contacts", contactsSchema);
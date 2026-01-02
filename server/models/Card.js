const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  company: String,
  address: String,
  imageUrl: String,
}, { timestamps: true });

module.exports = mongoose.model("Card", cardSchema);

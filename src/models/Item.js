const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: [String],
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: false },
  image: { type: String, required: false },
  price: { type: Number, required: true },
  description:{ type: String, required: false },

});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
const mongoose = require('mongoose');

const sellerProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
});

const SellerProducts = mongoose.model('Seller Products', sellerProductSchema);

module.exports = SellerProducts;

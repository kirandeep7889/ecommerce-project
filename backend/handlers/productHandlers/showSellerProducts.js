const Product = require("../../models/Products");
const SellerProducts = require("../../models/sellerProduct");


async function showSellerProducts(req, res) {
    try {
      const products = await SellerProducts.find();
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }


  module.exports=showSellerProducts;
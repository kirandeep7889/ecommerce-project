const Product = require("../../models/Products");


async function showAllProducts(req, res) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }


  module.exports=showAllProducts;
const Products = require("../../models/Products");

async function categoryProduct(req, res) {
    const { category } = req.params;
  
    try {
      // Find products in the specified category
      const products = await Products.find({ category:category });
  
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
}

module.exports=categoryProduct;
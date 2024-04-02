const Products = require("../../models/Products");

async  function searchProduct(req, res) {
    const { keyword } = req.query;
  
    try {
      // Find products that match the keyword
      const products = await Products.find({ 
        $or: [
          { title: { $regex: keyword, $options: 'i' } }, // Case-insensitive search for product name
          { category: { $regex: keyword, $options: 'i' } }, // Case-insensitive search for category
        ]
      });
  
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };

  module.exports=searchProduct;
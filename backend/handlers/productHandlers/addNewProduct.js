const SellerProducts = require("../../models/sellerProduct");

async function addNewProduct(req, res)  {
    try {
      const { title, price, description, category, image} = req.body;
  
      const newProduct = new SellerProducts({
        title,
        price,
        description,
        category,
        image
      });
  
      await newProduct.save();
  
      res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports=addNewProduct;
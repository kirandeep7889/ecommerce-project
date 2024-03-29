const mongoose=require("mongoose");
const Order = require("../../models/Orders");

async function addUserOrder(req, res) {
    try {
      const { userId } = req;
      const product = req.body; 
  
  
      if (typeof product !== 'object' || product === null) {
        return res.status(400).json({ error: 'Invalid product data: Product must be an object' });
      }
  
      if (!product || !product.id) {
        return res.status(400).json({ error: 'Invalid product data: Product ID is missing' });
      }
  
      const validProductId = mongoose.Types.ObjectId.isValid(product.id);
      if (!validProductId) {
        return res.status(400).json({ error: 'Invalid product ID' });
      }
  
      const newOrder = new Order({ user: userId, products: [product] });
      await newOrder.save();
  
      res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
  

  module.exports=addUserOrder;
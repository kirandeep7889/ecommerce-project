const WishlistItem = require("../../models/wishListItem");

async function addToWishList(req, res)  {
    try {
        const product = req.body; 
            const existingItem = await WishlistItem.findOne({ product });
  
      if (existingItem) {
        return res.status(400).json({ message: 'Item already exists in the wishlist.' });
      }
  
      const newWishlistItem = new WishlistItem({
        product
      });
  
      await newWishlistItem.save();
  
      res.status(201).json({ message: 'Item added to the wishlist successfully.',
        product
    });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
  
  module.exports=addToWishList;
const WishlistItem = require("../../models/wishListItem");

async function getWishList(req,res) {
    const allWishListItems= await WishlistItem.find({})
                                              .populate("product")
      

    if(!allWishListItems) {
        return res.json({
            message:'error finding wishlist items'
        })
    }

    return res.json({
        allWishListItems
    })
}

module.exports=getWishList;
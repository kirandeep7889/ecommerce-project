
const SellerProducts = require("../../models/sellerProduct");

const deleteSellerProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await SellerProducts.findById({_id: productId});

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = deleteSellerProduct;

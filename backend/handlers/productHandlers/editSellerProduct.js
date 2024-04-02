// editProduct.js

const SellerProducts = require("../../models/sellerProduct");

const editSellerProduct = async (req, res) => {
  const productId = req.params.id;
  const { title,name, description, price,category } = req.body;

  try {
    const product = await SellerProducts.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (title) {
      product.title = title;
    }
    if (name) {
      product.name = name;
    }
    if (category) {
        product.category = category;
      }
    if (description) {
      product.description = description;
    }
    if (price) {
      product.price = price;
    }

    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error editing product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = editSellerProduct;

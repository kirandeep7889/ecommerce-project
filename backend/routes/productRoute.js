const express=require("express");
const auth = require("../middleware/auth");
const showAllProducts = require("../handlers/productHandlers/showAllProducts");
const searchProduct = require("../handlers/productHandlers/searchProduct");
const categoryProduct = require("../handlers/productHandlers/categoryProducts");
const addToWishList = require("../handlers/productHandlers/addToWishList");
const addNewProduct = require("../handlers/productHandlers/addNewProduct");
const isSeller = require("../middleware/isSeller");
const getWishList = require("../handlers/productHandlers/getWishList");
const productRoute=express.Router();

//user routes
productRoute.get("/bulk",showAllProducts);
productRoute.get("/search",searchProduct);
productRoute.get("/category/:category",categoryProduct);
productRoute.post("/wishlist", auth, addToWishList);
productRoute.get("/wishlist", getWishList)


module.exports=productRoute;
const express=require("express");
const auth = require("../middleware/auth");
const isSeller = require("../middleware/isSeller");
const addNewProduct = require("../handlers/productHandlers/addNewProduct");
const showSellerProducts = require("../handlers/productHandlers/showSellerProducts");
const editSellerProduct = require("../handlers/productHandlers/editSellerProduct");
const deleteSellerProduct = require("../handlers/productHandlers/deleteSellerProduct");
const sellerRoute=express.Router();

sellerRoute.post("/addProduct",auth,isSeller, addNewProduct);
sellerRoute.get("/displayProduct",auth,isSeller,showSellerProducts)
sellerRoute.put("/editProduct/:id",auth,isSeller,editSellerProduct)
sellerRoute.delete("/deleteProduct/:id",auth,isSeller, deleteSellerProduct)

module.exports=sellerRoute;
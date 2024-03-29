const express=require("express");
const auth = require("../middleware/auth");
const showAllProducts = require("../handlers/productHandlers/showAllProducts");
const productRoute=express.Router();

//user routes
productRoute.get("/bulk",showAllProducts);


module.exports=productRoute;
const express=require("express");
const auth = require("../middleware/auth");
const addUserOrder = require("../handlers/orderHandlers/addUserOrder");
const showUserOrders = require("../handlers/orderHandlers/showUserOrders");
const orderRoute=express.Router();

//user routes
orderRoute.post("/",auth,addUserOrder);
orderRoute.get("/",auth,showUserOrders);


module.exports=orderRoute;
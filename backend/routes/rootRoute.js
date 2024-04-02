const express=require("express");
const userRoute = require("./userRoute");
const orderRoute = require("./orderRoute");
const productRoute = require("./productRoute");
const sellerRoute = require("./sellerRoute");
const rootRoute=express.Router();


rootRoute.use("/user",userRoute);
rootRoute.use("/orders",orderRoute);
rootRoute.use("/products",productRoute)
rootRoute.use("/seller",sellerRoute)


module.exports=rootRoute;
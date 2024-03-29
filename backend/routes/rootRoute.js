const express=require("express");
const userRoute = require("./userRoute");
const orderRoute = require("./orderRoute");
const productRoute = require("./productRoute");
const rootRoute=express.Router();


rootRoute.use("/user",userRoute);
rootRoute.use("/orders",orderRoute);
rootRoute.use("/products",productRoute)

module.exports=rootRoute;
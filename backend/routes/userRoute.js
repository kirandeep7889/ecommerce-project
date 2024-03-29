const express=require("express");
const userSignup = require("../handlers/userHandlers/userSignup");
const userLogin = require("../handlers/userHandlers/userLogin");
const userRoute=express.Router();

//user routes
userRoute.post("/signup",userSignup)
userRoute.post("/login",userLogin)


module.exports=userRoute;
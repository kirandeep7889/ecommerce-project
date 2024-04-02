const express=require("express");
const userSignup = require("../handlers/userHandlers/userSignup");
const userLogin = require("../handlers/userHandlers/userLogin");
const userDetails = require("../handlers/userHandlers/userDetails");
const auth = require("../middleware/auth");
const userRoute=express.Router();

//user routes
userRoute.post("/signup",userSignup)
userRoute.post("/login",userLogin)
userRoute.get("/get-details", auth, userDetails);


module.exports=userRoute;
const User=require("../../models/User");
const jwt=require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


async function userSignup(req,res) {
    try{
    const body=req.body;
    const {name,email,password,phoneNumber,isSeller}=body;

    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User with the same email or phone number already exists' });
    }
    const newUser = new User({ name, email,password, phoneNumber ,isSeller});
      await newUser.save();

      const token=jwt.sign({userId:newUser._id}, process.env.jwt_secret);

      res.json({
        token,
        newUser
      })
  }catch (err) {
    console.log("erro creating user")
}

}
module.exports=userSignup;
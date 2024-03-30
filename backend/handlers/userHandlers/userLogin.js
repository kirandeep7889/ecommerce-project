const User = require("../../models/User");
const dotenv = require("dotenv");
const jwt=require("jsonwebtoken");
dotenv.config();



async function userLogin(req,res) {
    try {
        const { email,password } = req.body;

        if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required' });
      }
    
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret );
    
        res.json({ token,user });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
    

module.exports=userLogin;
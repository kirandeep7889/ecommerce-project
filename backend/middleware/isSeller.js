const User = require("../models/User");

// isInstructor
const isSeller = async(req, res, next) => {
    try{
        const userId=req.userId;

        const user= await User.findById({_id: userId})
        if(!user.isSeller){
            return res.status(401).json({
                success : false,
                message : 'SORRY THIS IS A SELLER ONLY ROUTE'
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "USER INSTRUCTOR ROLE CANT BE VERIFIED.....VERIFICATION FAILED",
            err : err.message
        })
    }
}

module.exports=isSeller;
const User = require("../../models/User");

async  function userDetails(req, res)  {
    try {
        const {userId} =req;
      const user = await User.findById(userId); 
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ userDetails: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  module.exports = userDetails;
  
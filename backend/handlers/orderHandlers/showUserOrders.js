const Order = require("../../models/Orders");

async function showUserOrders(req, res)  {
    try {
      const { userId } = req;
      const orders = await Order.find({ user: userId })
                                 .populate('products')
                                 .populate('user');
  
      res.json(orders);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
}  

module.exports = showUserOrders;

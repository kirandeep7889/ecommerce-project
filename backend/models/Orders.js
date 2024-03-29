const mongoose = require('mongoose');



const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]
});

const Order = mongoose.model('Order', orderSchema);

module.exports=Order;
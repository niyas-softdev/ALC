const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    }
  ],
  paymentMethod: { type: String, required: true },
  customerDetails: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    postalCode: String,
  },
  purchasedAt: { type: Date, required: true },
  status: { type: String, default: 'Pending' },  // Order status
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

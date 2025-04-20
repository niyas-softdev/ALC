const Order = require('../models/orderModel');
const User = require('../models/UserModel');
const Product = require('../models/ProductModel');

// Place Order
const placeOrder = async (req, res) => {
  const { userId, items, paymentMethod, customerDetails, purchasedAt } = req.body;

  try {
    // Validate User
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Validate Items
    const productIds = items.map((item) => item.productId);
    const products = await Product.find({ '_id': { $in: productIds } });
    if (products.length !== items.length) {
      return res.status(404).json({ success: false, message: 'Some products not found' });
    }

    // Create Order
    const order = new Order({
      userId,
      items,
      paymentMethod,
      customerDetails,
      purchasedAt,
      status: 'Pending',
    });

    await order.save();
    res.status(201).json({ success: true, message: 'Order placed successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
};


// Get All Orders
const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find()
        .populate("userId")
        .populate("items.productId")
        .sort({ createdAt: -1 }); // optional: newest first
  
      res.status(200).json({ success: true, orders });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
  };
  
// Get Order by ID
const getOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId)
      .populate('items.productId')
      .populate('userId');
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to retrieve order' });
  }
};

// Confirm Order
const confirmOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = 'Confirmed';
    await order.save();

    res.json({ success: true, message: 'Order confirmed', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to confirm order' });
  }
};

// Export Orders
const exportOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').populate('items.productId');

    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: 'No orders found' });
    }

    const ordersData = orders.map(order => ({
      orderId: order._id,
      user: order.userId.name,
      items: order.items.map(item => ({
        product: item.productId.name,
        quantity: item.quantity,
        price: item.productId.price,
      })),
      totalAmount: order.items.reduce((total, item) => total + item.productId.price * item.quantity, 0),
      status: order.status,
      purchasedAt: order.purchasedAt,
    }));

    // Assuming CSV export logic, you can modify this as needed
    const csv = ordersData.map(order => 
      `${order.orderId},${order.user},${order.items.map(item => `${item.product}:${item.quantity}`).join(';')},${order.totalAmount},${order.status},${order.purchasedAt}`
    ).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=orders.csv');
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to export orders' });
  }
};

module.exports = {
  placeOrder,
  getOrder,
  confirmOrder,
  exportOrders,
  getAllOrders
};

const express = require('express');
const router = express.Router();
const {
    placeOrder,
    getOrder,
    confirmOrder,
    getAllOrders,
    exportOrders,
} = require('../controllers/orderController');

// Place Order
router.post('/place', placeOrder);

router.get('/get', getAllOrders);

// Get Order by ID
router.get('/:orderId', getOrder);

// Confirm Order
router.put('/:orderId/confirm', confirmOrder);

// Export Orders
router.get('/export', exportOrders);

module.exports = router;

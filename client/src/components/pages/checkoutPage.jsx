import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion } from 'framer-motion';

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart);
  const userId = localStorage.getItem('userId');

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'COD',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5174/api/profile/get/${userId}`);
        if (data.success && data.data) {
          const user = data.data;
          setForm((prev) => ({
            ...prev,
            fullName: user.name || '',
            email: user.email || '',
            phone: user.phoneNumber || '',
            address: user.address || '',
            city: user.city || '',
            postalCode: user.postalCode || '',
          }));
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (userId) fetchUserProfile();
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!form.fullName || !form.address || !form.phone) {
      alert("Please fill all the details");
      return;
    }

    if (!cart || cart.items.length === 0) {
      alert("Cart is empty");
      return;
    }

    const items = cart.items.map((item) => ({
      productId: item._id,
      quantity: item.cartQuantity,
    }));

    try {
      await axios.post("http://localhost:5174/api/orders/place", {
        userId,
        items,
        paymentMethod: form.paymentMethod,
        customerDetails: form,
        purchasedAt: new Date(),
      });
      window.location.href = "/order-success";
    } catch (err) {
      console.error("COD order failed", err);
      alert("Order placement failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 px-4 sm:px-6 py-10 text-gray-800"
    >
      <h1 className="text-4xl font-bold mb-10 text-center text-pink-600">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* User Form */}
        <div className="flex flex-col bg-white rounded-xl p-6 shadow-lg space-y-5">
          {[
            { name: "fullName", placeholder: "Full Name" },
            { name: "email", placeholder: "Email" },
            { name: "phone", placeholder: "Phone Number" },
            { name: "address", placeholder: "Address" },
            { name: "city", placeholder: "City" },
            { name: "postalCode", placeholder: "Postal Code" },
          ].map((field) => (
            <input
              key={field.name}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full p-4 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          ))}

          <div className="p-4 rounded-lg bg-pink-50 border border-pink-200 text-pink-600 font-medium">
            Payment Method: <span className="font-semibold">Cash on Delivery</span>
          </div>
        </div>

        {/* Order Summary */}
        <div className="flex flex-col justify-between bg-white rounded-xl p-6 shadow-lg">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-pink-600">Order Summary</h2>
            {cart.items.length > 0 ? (
              <div className="space-y-5">
                {cart.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 border border-pink-100 p-4 rounded-lg"
                  >
                    <img
                      src={item.image || "/placeholder-image.png"}
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = "/placeholder-image.png";
                      }}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-pink-700">{item.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.cartQuantity}</p>
                      <p className="text-sm text-gray-500">
                        ₹{item.price.toFixed(2)} × {item.cartQuantity}
                      </p>
                    </div>
                    <div className="text-lg font-bold text-gray-700">
                      ₹{(item.price * item.cartQuantity).toFixed(2)}
                    </div>
                  </div>
                ))}
                <div className="flex justify-between border-t border-pink-300 pt-4 font-bold text-lg text-gray-700">
                  <span>Total:</span>
                  <span>₹{cart.subtotal.toFixed(2)}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-pink-600 hover:bg-pink-700 transition-colors duration-300 text-white font-semibold py-3 rounded-lg shadow-md"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;

import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminOrderController() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5174/api/orders/get");
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5174/api/orders/export", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "orders.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Failed to export orders:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-700">Orders Dashboard</h2>
        <button
          onClick={exportOrders}
          className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition duration-200"
        >
          Export Orders CSV
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full border-collapse border border-gray-200 rounded-lg">
            <thead className="bg-pink-100 text-gray-700 text-sm">
              <tr>
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">Customer</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Address</th>
                <th className="p-3 border">City</th>
                <th className="p-3 border">Postal Code</th>
                <th className="p-3 border">Items</th>
                <th className="p-3 border">Total</th>
                <th className="p-3 border">Payment</th>
                <th className="p-3 border">Purchased At</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {orders.map((order) => {
                const customer = order.customerDetails || {};
                const totalAmount = order.items.reduce(
                  (sum, item) =>
                    sum + (item.productId?.price || 0) * item.quantity,
                  0
                );

                return (
                  <tr key={order._id} className="hover:bg-pink-50 border-t">
                    <td className="p-3 border">{order._id}</td>
                    <td className="p-3 border">{customer.fullName || "N/A"}</td>
                    <td className="p-3 border">{customer.email || "N/A"}</td>
                    <td className="p-3 border">{customer.phone || "N/A"}</td>
                    <td className="p-3 border">{customer.address || "N/A"}</td>
                    <td className="p-3 border">{customer.city || "N/A"}</td>
                    <td className="p-3 border">{customer.postalCode || "N/A"}</td>
                    <td className="p-3 border space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex flex-col">
                          <span>
                            {item.productId?.name || "Product"} × {item.quantity}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="p-3 border text-green-600 font-semibold">
                      ${totalAmount.toFixed(2)}
                    </td>
                    <td className="p-3 border">{order.paymentMethod || "N/A"}</td>
                    <td className="p-3 border">
                      {new Date(order.purchasedAt).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminOrderController;

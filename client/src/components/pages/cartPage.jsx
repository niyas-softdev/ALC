import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDownIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom'; // ✅ Instead of next/router
import { removeFromCart, updateCartItemQuantity, fetchCartItem } from "../Redux/cart/cartAction";

const CartPage = () => {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartData = useSelector((state) => state.cart);
  const { items = [], subtotal = 0, cartCount = 0, totalCartQuantity = 0 } = cartData;

  useEffect(() => {
    if (!userId) {
      console.warn("User ID not found. Please log in.");
      return;
    }
    dispatch(fetchCartItem(userId));
  }, [userId, dispatch]);

  const handleRemoveFromCart = async (productId) => {
    try {
      await dispatch(removeFromCart(userId, productId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) {
      alert("Quantity cannot be less than 1.");
      return;
    }
    try {
      await dispatch(updateCartItemQuantity(userId, productId, quantity));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout'); // ✅ updated here
  };

  return (
    <div className="bg-gradient-to-b from-pink-100 to-pink-200 min-h-screen text-gray-800">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-pink-600 sm:text-4xl">Shopping Cart</h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          {/* Cart Items */}
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>
            {items.length === 0 ? (
              <p className="text-center text-gray-400">Your cart is empty.</p>
            ) : (
              <ul role="list" className="divide-y divide-pink-300 border-t border-b border-pink-300">
                {items.map((item) => {
                  return (
                    <li key={item._id} className="flex py-6 sm:py-10">
                      <div className="shrink-0">
                        <img
                          alt={item.name || "Unknown Product"}
                          src={item.image || "/placeholder-image.png"} // Fallback image
                          className="w-24 h-24 sm:w-48 sm:h-48 rounded-md object-cover" // Adjusted size for image
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm font-medium text-pink-600 hover:text-pink-700">
                                {item.name || "Unnamed Product"}
                              </h3>
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-500">
                              ₹{(item.price || 0).toFixed(2)}
                            </p>
                          </div>
                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <div className="grid w-full max-w-16 grid-cols-1">
                              <select
                                value={item.cartQuantity || 1}
                                onChange={(e) =>
                                  handleQuantityChange(item._id, parseInt(e.target.value, 10))
                                }
                                className="col-start-1 row-start-1 appearance-none rounded-md bg-pink-50 py-1.5 pr-8 pl-3 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-600 focus:outline-2 focus:-outline-offset-2 focus:outline-pink-500 sm:text-sm/6"
                              >
                                {Array.from({ length: 10 }, (_, i) => (
                                  <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                  </option>
                                ))}
                              </select>
                              <ChevronDownIcon
                                aria-hidden="true"
                                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-pink-400 sm:size-4"
                              />
                            </div>
                            <div className="absolute top-0 right-0">
                              <button
                                type="button"
                                onClick={() => handleRemoveFromCart(item._id)}
                                className="-m-2 inline-flex p-2 text-gray-400 hover:text-red-500"
                              >
                                <span className="sr-only">Remove</span>
                                <XMarkIcon aria-hidden="true" className="size-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <p className="mt-4 flex space-x-2 text-sm text-gray-400">
                          <CheckIcon aria-hidden="true" className="size-5 shrink-0 text-pink-500" />
                          <span>In stock</span>
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          {/* Order Summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-pink-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-pink-600">
              Order summary
            </h2>
            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-500">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-700">₹{subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-pink-300 pt-4">
                <dt className="text-sm text-gray-500">Total Quantity</dt>
                <dd className="text-sm font-medium text-gray-700">{totalCartQuantity}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-pink-300 pt-4">
                <dt className="text-base font-medium text-pink-600">Order Total</dt>
                <dd className="text-base font-medium text-gray-700">₹{subtotal.toFixed(2)}</dd>
              </div>
            </dl>
            <div className="mt-6">
              <button
                type="button"
                onClick={handleCheckout} // ✅ updated here
                className="w-full rounded-md bg-pink-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Checkout
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default CartPage;

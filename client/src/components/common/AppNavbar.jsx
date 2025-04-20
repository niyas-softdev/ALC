import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { Bars3Icon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Logo from "../../assets/logo.png";
import DefaultProfile from "../../assets/default.jpg";
import AuthPopup from "../common/AuthPopup";
import { fetchCartCount } from "../Redux/cart/cartAction";

function AppNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartCount = useSelector((state) => state.cart.cartCount);
  const [user, setUser] = useState(null);
  const [authPopupOpen, setAuthPopupOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp < currentTime) {
          handleLogout();
        } else {
          setUser({
            id: decoded.id || decoded.userId,
            name: decoded.name || "User",
            email: decoded.email || "",
            role: decoded.role || "user",
            image: DefaultProfile,
          });
          dispatch(fetchCartCount(decoded.id || decoded.userId)); // Fetch cart count when the user is logged in
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        handleLogout();
      }
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    setUser(null);
    navigate("/");
  };

  const handleAddToCart = (productId, quantity) => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      setAuthPopupOpen(true);  // Prompt login if the user is not logged in
      return;
    }

    const decoded = jwtDecode(token);
    dispatch(fetchCartCount(decoded.id || decoded.userId));  // Ensure cart count is updated after adding to cart
    // Dispatch action to add product to cart
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/20 backdrop-blur-md shadow-lg border-b border-pink-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <button className="text-gray-700 hover:text-[#D81B60] sm:hidden">
              <Bars3Icon className="h-6 w-6" />
            </button>

            <div className="flex items-center">
              <Link to="/">
                <img className="h-10 w-auto" src={Logo} alt="Logo" />
              </Link>
            </div>

            <div className="hidden sm:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-[#D81B60]">Home</Link>
              <Link to="/collections" className="text-gray-700 hover:text-[#D81B60]">Collections</Link>
              <Link to="/contactUs" className="text-gray-700 hover:text-[#D81B60]">Contact Us</Link>
              {user?.role === "admin" && (
                <Link to="/dashboard" className="text-[#D81B60] font-semibold hover:text-[#B2184E]">Dashboard</Link>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/cartPage" className="relative">
                <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-[#D81B60]" />
                {user && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs px-2 py-1 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="relative">
                  <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center rounded-full">
                    <span className="mr-2 text-gray-700">{user.role}</span>
                    <img className="h-8 w-8 rounded-full border border-pink-300" src={user?.image || DefaultProfile} alt="User profile" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setAuthPopupOpen(true)}
                  className="bg-gradient-to-r from-[#D81B60] to-[#FFC1E3] text-white px-4 py-2 rounded-md shadow-md hover:from-[#B2184E] hover:to-[#FF9CC7]">
                  Login / Signup
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {authPopupOpen && (
        <AuthPopup
          onClose={() => setAuthPopupOpen(false)}
          onLoginSuccess={(responseData) => {
            try {
              const { token } = responseData;
              if (!token) throw new Error("Missing token.");
              localStorage.setItem("userToken", token);
              const decoded = jwtDecode(token);
              setUser({
                id: decoded.id || decoded.userId,
                name: decoded.name || "User",
                email: decoded.email || "",
                role: decoded.role || "user",
                image: DefaultProfile,
              });
              dispatch(fetchCartCount(decoded.id || decoded.userId));  // Update cart count after login
              setAuthPopupOpen(false);
            } catch (error) {
              console.error("Login processing error:", error);
            }
          }}
        />
      )}
    </>
  );
}

export default AppNavbar;

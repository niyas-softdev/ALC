import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { Bars3Icon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Logo from "../../assets/logo.png";
import DefaultProfile from "../../assets/default.jpg"; // Default profile image
import AuthPopup from "../common/AuthPopup";

function AppNavbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authPopupOpen, setAuthPopupOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // ✅ Load user from `userToken` in `localStorage`
  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      try {
        console.log("Retrieved Token:", token);

        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);

        // Check token expiration
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
          console.warn("Token expired, logging out...");
          handleLogout();
        } else {
          // ✅ Extract and set user data from decoded token
          setUser({
            id: decoded.id,
            name: decoded.name || "User", // ✅ Ensure name is set
            email: decoded.email || "",
            role: decoded.role || "user",
            image: DefaultProfile, // Default image (modify if needed)
          });
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        handleLogout();
      }
    }
  }, [authPopupOpen]); // ✅ Runs when login/signup occurs

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
   
    navigate("/");
  };

  return (
    <>
      {/* ✅ ToastContainer for Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />

      <nav className="fixed top-0 left-0 w-full z-50 bg-white/20 backdrop-blur-md shadow-lg border-b border-pink-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Mobile Menu Button */}
            <button className="text-gray-700 hover:text-[#D81B60] sm:hidden">
              <Bars3Icon className="h-6 w-6" />
            </button>

            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                <img className="h-10 w-auto" src={Logo} alt="Logo" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-[#D81B60]">Home</Link>
              <Link to="/collections" className="text-gray-700 hover:text-[#D81B60]">Collections</Link>
              <Link to="/about" className="text-gray-700 hover:text-[#D81B60]">About Us</Link>

              {/* ✅ Show "Dashboard" link only if role is "admin" */}
              {user?.role === "admin" && (
                <Link to="/dashboard" className="text-[#D81B60] font-semibold hover:text-[#B2184E]">
                  Dashboard
                </Link>
              )}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <Link to="/cart">
                <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-[#D81B60]" />
              </Link>

              {user ? (
                <div className="relative">
                  <button className="flex items-center rounded-full" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <span className="mr-2 text-gray-700">
                      {user.name || "User"} {/* ✅ Now the name is correctly displayed */}
                    </span>
                    <img className="h-8 w-8 rounded-full border border-pink-300" src={user?.image || DefaultProfile} alt="User profile" />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
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
                  className="bg-gradient-to-r from-[#D81B60] to-[#FFC1E3] text-white px-4 py-2 rounded-md shadow-md hover:from-[#B2184E] hover:to-[#FF9CC7]"
                >
                  Login / Signup
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Render Auth Popup */}
      {authPopupOpen && (
        <AuthPopup
          onClose={() => setAuthPopupOpen(false)}
          onLoginSuccess={(responseData) => {
            try {
              const { token } = responseData;

              if (!token) {
                throw new Error("Invalid response: Missing token.");
              }

              localStorage.setItem("userToken", token);

              // ✅ Decode token and set user state
              const decoded = jwtDecode(token);
              setUser({
                id: decoded.id,
                name: decoded.name || "User", // ✅ Fixes missing name issue
                email: decoded.email || "",
                role: decoded.role || "user",
                image: DefaultProfile,
              });

              
              setAuthPopupOpen(false);
            } catch (error) {
              console.error("Error processing login:", error);
              
            }
          }}
        />
      )}
    </>
  );
}

export default AppNavbar;

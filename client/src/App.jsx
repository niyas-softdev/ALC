import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/mainLayout"; // Import MainLayout
import Home from "./components/pages/Home";
import Collection from "./components/pages/Collection";
import ProductController from "./components/pages/ProductController";
import DashboardLayout from "./components/pages/DashboardLayout";
import AuthPopup from "./components/common/AuthPopup";
import ProtectedRoute from "./components/common/ProtectedRoute"; // Import Protected Route
import CartPage from "./components/pages/cartPage";
import CheckoutPage from "./components/pages/checkoutPage";
import OrderSuccess from "./components/pages/order-success";
import AdminOrderController from "./components/pages/AdminOrderController";
import ContactUs from "./components/pages/ContactUs";
import ContactUsController from "./components/pages/ContactUsController";

// Update your routes
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes wrapped in MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collection />} />
          <Route path="/AuthPopup" element={<AuthPopup />} />
          <Route path="/cartPage" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/contactUs" element={<ContactUs />} />





        </Route>

        {/* Protected Dashboard Routes for Admins */}
        <Route element={<ProtectedRoute roles={["admin"]} />}>
          <Route path="/dashboard/*" element={<DashboardLayout />}>
            <Route index element={<div>Admin Home</div>} />
            <Route path="productController" element={<ProductController />} />
            <Route path="AdminOrderController" element={<AdminOrderController />} />
            <Route path="contactUsController" element={<ContactUsController />} />



          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

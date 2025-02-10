import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/common/AppNavbar";
import Home from "./components/pages/Home";
import Collection from "./components/pages/Collection";
import ProductController from "./components/pages/ProductController";
import DashboardLayout from "./components/pages/DashboardLayout";
import AuthPopup from "./components/common/AuthPopup";
import ProtectedRoute from "./components/common/ProtectedRoute"; // Import Protected Route
//import Unauthorized from "./components/pages/Unauthorized"; // Unauthorized page

const App = () => {
  return (
    <Router>
      <AppNavbar /> {/* Keep Navbar Outside Routes to Show on All Pages */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collection />} />
        <Route path="/AuthPopup" element={<AuthPopup />} />
        {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}

        {/* Protected Dashboard Routes for Admins & Users */}
        <Route element={<ProtectedRoute roles={[ "admin"]} />}>
          <Route path="/dashboard/*" element={<DashboardLayout />}>
            <Route index element={<div>Admin Home</div>} />
            <Route path="productController" element={<ProductController />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

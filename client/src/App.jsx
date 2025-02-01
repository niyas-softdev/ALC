import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/common/AppNavbar';
import Home from './components/pages/Home';
import Collection from './components/pages/Collection';
import ProductController from './components/pages/ProductController';
import DashboardLayout from './components/pages/DashboardLayout';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collection />} />
        <Route path="/navbar" element={<AppNavbar />} />

        {/* Dashboard Layout with Sidebar */}
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          <Route index element={<div>Admin Home</div>} /> {/* Default admin page */}
          <Route path="productController" element={<ProductController />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

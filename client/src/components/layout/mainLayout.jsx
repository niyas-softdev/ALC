import React from "react";
import { Outlet } from "react-router-dom";
import AppNavbar from "../common/AppNavbar";
import Footer from "../common/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-gray-900 shadow-md">
        <AppNavbar />
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-pink-50 text-gray-900">
        <div className=" mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;

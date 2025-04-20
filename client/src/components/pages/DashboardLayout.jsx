import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  BellIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import Logo from "../../assets/logo.png";

const navigation = [
  { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
  { name: "Orders", path: "/dashboard/AdminOrderController", icon: UsersIcon },
  { name: "Products", path: "/dashboard/productController", icon: FolderIcon },
  { name: "Contact Us", path: "/dashboard/contactUsController", icon: CalendarIcon }
  
];

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-pink-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-md flex flex-col">
        <div className="flex items-center justify-center h-20 border-b">
          <img src={Logo} alt="Logo" className="h-10" />
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                location.pathname === item.path
                  ? "bg-pink-100 text-pink-700"
                  : "text-gray-700 hover:bg-pink-50"
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t flex items-center justify-between text-sm text-gray-500">
          <span>&copy; ALC Admin</span>
          <Link to="/" className="text-pink-600 hover:underline">Exit</Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b shadow flex items-center justify-between px-6">
          <div className="text-lg font-semibold text-pink-600">Admin Dashboard</div>
          <div className="flex items-center gap-4">
            <BellIcon className="h-5 w-5 text-gray-500" />
            <Cog8ToothIcon className="h-5 w-5 text-gray-500" />
            <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/logo.png';

const navigation = [
  { name: "Admin Home", path: "/dashboard", icon: HomeIcon },
  { name: "User Controller", path: "/dashboard/userController", icon: UsersIcon },
  { name: "Product Controller", path: "/dashboard/ProductController", icon: FolderIcon },
  { name: "Expire User", path: "/dashboard/expireUser", icon: CalendarIcon },
  { name: "Documents", path: "/dashboard/documents", icon: DocumentDuplicateIcon },
  { name: "Reports", path: "/dashboard/reports", icon: ChartPieIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex">
      {/* Mobile Sidebar */}
      <Transition show={sidebarOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          {/* Overlay */}
          <Transition.Child
            as={React.Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" aria-hidden="true" />
          </Transition.Child>

          {/* Sidebar Panel */}
          <div className="fixed inset-0 flex">
            <Transition.Child
              as={React.Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col bg-gray-900 px-6 pb-4 overflow-y-auto">
                <div className="flex h-16 items-center justify-between">
                  <img
                    className="h-8 w-auto"
                    src={Logo}
                    alt="Your Company"
                  />
                  <button
                    type="button"
                    className="text-gray-400 hover:text-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <nav className="mt-6 flex-1">
                  <ul role="list" className="space-y-2">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.path}
                          className={classNames(
                            location.pathname === item.path
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:bg-gray-800 hover:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-gray-900">
        <div className="flex h-16 items-center justify-between px-6">
          <img
            className="h-8 w-auto"
            src={Logo}
            alt="Your Company"
          />
          <button
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-white"
            aria-label="Go to Home"
          >
            <HomeIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-6 flex-1 px-6">
          <ul role="list" className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={classNames(
                    location.pathname === item.path
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white",
                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  )}
                >
                  <item.icon
                    className="h-6 w-6 shrink-0"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64 bg-gray-100">
        <div className="sticky top-0 z-40 flex items-center bg-white shadow px-4 py-4 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-400"
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </div>
        </div>
        <main className="py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

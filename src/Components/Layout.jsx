import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import SmallScreenSidebar from "./SmallScreenSidebar.jsx";

const Layout = () => {
  const { isSidebarOpen } = useSelector((state) => state.sidebar);
  const location = useLocation();

  const hide = ["/login", "/register", "/forgot-password", "/reset-password", "/verify-email"];
  const hideLayout = hide.includes(location.pathname);

  return (
    <div>
      <div
        className={` transition-all duration-300 ${
          hideLayout
            ? ""
            : isSidebarOpen
            ? "sm:ml-40 md:ml-52 lg:ml-60"
            : "sm:ml-12 md:ml-16"
        }`}
      >
        <Navbar />
      </div>

      <SmallScreenSidebar />

      {/* Sidebar is conditionally hidden */}

      {!hideLayout && <Sidebar />}
      <div
        className={`flex-1 transition-all duration-300 ${
          hideLayout
            ? ""
            : isSidebarOpen
            ? "sm:ml-40 md:ml-52 lg:ml-60"
            : "sm:ml-12 md:ml-16"
        }`}
      >
        <main>
          <Outlet /> {/* This renders the matched route component */}
        </main>
      </div>
    </div>
  );
};

export default Layout;

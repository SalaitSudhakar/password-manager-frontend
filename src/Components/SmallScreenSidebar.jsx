import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toggleSmallScreenSidebar } from "../Redux/Slice/sidebarSlice";
import { FaHome, FaLock, FaUser } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";

const SmallScreenSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { isAuthenticated } = useSelector((state) => state.user);
  const { isSmallScreenSidebarOpen } = useSelector((state) => state.sidebar);

  // Hide sidebar on login and register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const menuItems = [
    { name: "Home", icon: <FaHome />, link: "/" },
    { name: "Passwords", icon: <FaLock />, link: "/passwords" },
    { name: "Profile", icon: <FaUser />, link: "/profile" },
  ];

  // Add "Login" only if the user is NOT authenticated
  if (!isAuthenticated) {
    menuItems.push({ name: "Login", icon: <LuLogIn />, link: "/login" });
  }

  const handleHamburgerClick = () => {
    dispatch(toggleSmallScreenSidebar());
  };

  const handleOverlayClick = () => {
    isSmallScreenSidebarOpen && dispatch(toggleSmallScreenSidebar());
  };
  return (
    <div>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-gray-500/20 transition-opacity duration-500 z-40 ${
          isSmallScreenSidebarOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-60 bg-teal-800 text-white transition-transform duration-700 z-50 sm:hidden
          ${
            isSmallScreenSidebarOpen
              ? "translate-x-0 ease-out"
              : "-translate-x-[110%] ease-in"
          }
        `}
        style={{ willChange: "transform" }}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-100">Menu</h2>
          <button
            onClick={handleHamburgerClick}
            className="p-2 rounded-full text-gray-300 hover:bg-red-500"
          >
            ✖
          </button>
        </div>

        <div className="mt-8">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.link} onClick={handleHamburgerClick}>
              <div className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
                <div className="text-xl text-teal-500">{item.icon}</div>
                <span className="ml-4 text-gray-100">{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmallScreenSidebar;

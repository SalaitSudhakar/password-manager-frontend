import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toggleSmallScreenSidebar } from "../Redux/Slice/sidebarSlice";
import { FaHome, FaLock, FaPlus, FaUser } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { MdClose } from "react-icons/md";

const SmallScreenSidebar = ({ hideComponent }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { isAuthenticated } = useSelector((state) => state.user);
  const { isSmallScreenSidebarOpen } = useSelector((state) => state.sidebar);

  const hide = ["/login", "/register", "/forgot-password", "/reset-password", "/verify-email"];

  // Hide sidebar on specific pages
  if (hide.includes(location.pathname)) {
    return null; // This will prevent rendering the sidebar
  }

  const menuItems = [];
  if (isAuthenticated) {
    menuItems.push({ name: "Home", icon: <FaHome />, link: "/" });
    menuItems.push({ name: "Passwords", icon: <FaLock />, link: "/passwords" });
    menuItems.push({ name: "Profile", icon: <FaUser />, link: "/profile" });
    menuItems.push({ name: "Add Passwords", icon: <FaPlus />, link: "/passwords/add" });
  }

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
    <div className="sm:hidden">
      {/* Overlay */}
      <div
        onClick={handleOverlayClick}
        className={`fixed inset-0 bg-black/10 bg-opacity-40 z-40 transition-opacity duration-300 ease-in-out ${
          isSmallScreenSidebarOpen ? "opacity-100 block" : "opacity-0 hidden"
        }`}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-teal-800 text-white z-50 transform transition-transform duration-300 ease-in-out ${
          isSmallScreenSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } shadow-lg`}
      >
        <div className="flex justify-between items-center p-4 bg-teal-700">
          <h2 className="text-xl font-bold text-teal-50">Menu</h2>
          <button
            onClick={handleHamburgerClick}
            className="p-2  text-gray rounded-full hover:bg-gray-700 transition-colors duration-100"
          >
            <MdClose
              size={24}
              title="close-icon"
              className="text-gray-200 font-bold"
            />{" "}
          </button>
        </div>

        <div className="mt-5">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              onClick={handleHamburgerClick}
              className="flex items-center p-3 hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="text-xl text-teal-300 mr-3">{item.icon}</div>
              <span className="text-teal-50">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmallScreenSidebar;

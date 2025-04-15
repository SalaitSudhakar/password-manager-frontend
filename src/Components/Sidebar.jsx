import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";
import { FaHome, FaUser, FaLock, FaAngleLeft, FaBars, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../Redux/Slice/sidebarSlice.js";

const Sidebar = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { isSidebarOpen } = useSelector((state) => state.sidebar);

  const dispatch = useDispatch();
  const location = useLocation();

  // Close sidebar when changing routes
  useEffect(() => {
    if (isSidebarOpen) {
      dispatch(toggleSidebar());
    }
  }, [location.pathname]);

  // Hide side bar on login and register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const menuItems = [{ name: "Home", icon: <FaHome />, link: "/" }];

  // Add "Login" only if the user is NOT authenticated
  if (!isAuthenticated) {
    menuItems.push({ name: "Login", icon: <LuLogIn />, link: "/login" });
  } else {
    menuItems.push({ name: "Passwords", icon: <FaLock />, link: "/passwords" });
    menuItems.push({ name: "Profile", icon: <FaUser />, link: "/profile" })
    menuItems.push({ name: "Add Passwords", icon: <FaPlus />, link: "/passwords/add" })
  }

  return (
    <div>
      <div
        className={`bg-teal-800 hidden sm:block text-white h-screen
        ${
          isSidebarOpen ? " w-40 md:w-52 lg:w-60" : "sm:w-12 md:w-16"
        } transition-width duration-300 ease-in-out fixed left-0 top-0 
        `}
      >
        <div className="p-4 flex justify-between items-center">
          {isSidebarOpen && (
            <h2 className=" text-xl font-bold text-gray-100">Menu</h2>
          )}
          <button
            onClick={() => dispatch(toggleSidebar())}
            className={`p-2 rounded-full hover:bg-gray-700 ${
              !isSidebarOpen && "mx-auto"
            }`}
          >
            {isSidebarOpen ? <FaAngleLeft /> : <FaBars />}
          </button>
        </div>

        <div className="mt-8">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.link}>
              <div className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
                <div
                  className={`${
                    !isSidebarOpen && "mx-auto"
                  } text-xl text-teal-500`}
                >
                  {item.icon}
                </div>
                {isSidebarOpen && (
                  <span className="ml-4 text-gray-100">{item.name}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

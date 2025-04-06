import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";

const Navbar = () => {
  const { isAuthenticated, userDetails } = useSelector((state) => state.user);

  axios.defaults.withCredentials = true;

  const handleLogout = () => {};
  return (
    <Navbar className=" bg-teal-800 p-4 ">
      <div className="flex items-center justify-between  max-w-6xl mx-auto">
        <div>
          <Link to="/" className="ml-2 flex gap-1 items-center justify-center">
            <img src={logo} alt="logo" className="w-10 h-10 " />
            <h1
              title="Home"
              className="text-xl sm:text-2xl text-gray-300 font-bold capitalize hover:text-gray-200"
            >
              SafePass
            </h1>
          </Link>
        </div>

        <ul className="flex items-center justify-center gap-4 text-teal-200">
          <Link to="/">
            <li className="hover:underline hover:text-teal-400">Home</li>
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/passwords">
                <li className="hover:underline hover:text-teal-400">
                  Passwords
                </li>
              </Link>

              <Link to="/profile">
                <img src={userDetails.user.profile} alt="user profile" className=" border border-gray-100  text-teal-400" />
              </Link>

              <li className="group flex gap-2 items-center justify-center p-3 border border-white bg-amber-400 rounded-lg font-semibold text-gray-800 duration-100  shadow-sm shadow-red-200 transition-all transform  hover:scale-105  ease-in-out hover:text-red-100">
                <span onClick={handleLogout}>Logout </span>
                <FaSignOutAlt
                  size={20}
                  className="text-red-600 group-hover:text-red-400"
                />
              </li>
            </>
          ) : (
            <Link to="/login" className="flex items-center justify-center">
              <li className="hover:underline hover:text-teal-400">Login</li>
            </Link>
          )}

          {/* <li className="group hidden md:block p-2 bg-gray-300 hover:bg-transparent border border-teal-800 hover:border-white rounded-full shadow-md shadow-gray-500 ">
            <GiHamburgerMenu className="text-teal-700 group-hover:text-gray-400"/>
          </li> */}
        </ul>
      </div>
    </Navbar>
  );
};

export default Navbar;

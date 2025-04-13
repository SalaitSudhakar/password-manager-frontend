import React from "react";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { toggleSmallScreenSidebar } from "../Redux/Slice/sidebarSlice";
import {
  apiRequestFail,
  apiRequestStart,
  logoutSuccess,
} from "../Redux/Slice/userSlice";
import api from "../services/axiosConfig";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, userDetails } = useSelector((state) => state.user);

  const fallBackProfile = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgGCgkGBwoHBwYGBg8UFQYWIB0WIhURHxMYHSggGBolGx8fITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAgEH/8QANBABAQACAAMGAgYLAQAAAAAAAAIBAwQREiEiMTJSYhNyBTNTgqHBI0FCUWFxgZGSk7EU/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD6oAqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8qpic1WcYmfNVM/fxV3nOIzmY/GwXNvEa9XZVc6+znxVb4+s57kTj5u1UAWP/bu/fH+t1PHbMeM6s/d5KoC/HHRnzxc/L2rWM4zjGceFMZJp33pz3c85+zrwBrDjVsnbGKn70+h2AAAAAAAAAAAAAAABnPLGc58J7wM/j9ma2/D59kT5f4qr26zV5rPjVdTxQAAAAABZ4C8zu6OfZctFkaKzO/XnHrlroAAAAAAAAAAAAAACPfnlo2fJSRHvxz0bMeygZICgAAAAADqM9NzXpqabDFbWPBAAAAAAAAAAAAAAARb9k69ec3z5V3e6lVuPxz0Yz6bkGcAoAAAAAA9xy545+DW1XOyMXPVyr1Mhp8Hjlw8e7qr8UE4AAAAAAAAAAAAACHip6+HvHpnq/smeVOKnM58KnpoGMJeI0fAqcdXVivL3USgAAAAAA19U9GqJ9MqHDcN8bHVnPKZr/JpIAAAAAAAAAAAAAAAAKv0hHVqm8fsV/wBZ7ZqcXOZrwqemmTu151bMxnt6fLXqwDgBQAABJw+v4u3E58vmr+QL/CR0aJxnxr9JX9U4IAAAAAAAAAAAAAAAADP+kfrp+T8167iJ53Uzj3MzitmNu3qnyzPTIIgFAABa+jvrq+T81VNwuzGrdiq8tT00DUHMXFzzisVj2ukAAAAAAAAAAAAAEezdr1+e5xn0z25BI52XGueq6xjClt47OeeNU8vdStV1ddVVnOfVQGy6u81Wc573d6nIKAAAAAAOtd1F4qc5x3u90tbXcbJ6orGcMd1N1FdU1nGfVKDYFDVx2ccsbZ5+6VvXu17PJc5z6a7MgkAAAAAABDxO74Mc8dt13YkHW3dGrHO6+WZ8aVL4+s/VxOPds7VWqq6zVZznNeaqeAkviNt+a88vTPYjBQAAAAAAAAAAAAABJHEbY8t55emu1PHH1j6yJz7tfYqANbVujbjnFfNNeMpGNNVFYqc5xmfLUtPht3xo557Lnu3KCYABm8dWa35x+qJmQBXAUAAAAAAAAAAAAAAAAAAFjgazO/GP1XNSCDSAB//Z"

  const PathTohide = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
  ];
  const hideHamburger = PathTohide.includes(location.pathname);

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(apiRequestStart());
    try {
      const response = await api.post("/auth/logout");

      toast.success(response?.data?.message || "Logout Successful");
      dispatch(logoutSuccess());
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went Wrong");
      dispatch(apiRequestFail(error));
    }
  };

  return (
    <nav className=" bg-teal-800 px-2 py-4 sm:px-4 ">
      <div className="flex items-center text-sm sm:text-lg justify-between  max-w-6xl mx-auto">
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

        <ul className="flex items-center justify-center gap-4 sm:gap-8 text-teal-200">
          <Link to="/">
            <li className="hidden sm:block hover:underline hover:text-teal-400">
              Home
            </li>
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/profile">
                <img
                  src={
                    userDetails?.user?.profile || fallBackProfile
                  }
                  alt="user profile"
                  className=" border-2 rounded-full w-8 sm:w-10 border-teal-400  text-teal-400"
                />
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-1 p-1.5 sm:p-3 text-gray-400 bg-gradient-to-b from-red-500 to-red-700  border-white bg-amber-400 rounded-lg font-semibold duration-100  shadow-sm shadow-red-200 transition-all transform  hover:scale-105  ease-in-out hover:text-red-100"
              >
                <FaSignOutAlt className="text-gray-400 group-hover:text-red-400 w-2 sm:w-4" />
                <span>Logout </span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="group flex gap-2 items-center justify-center p-1.5 sm:p-3 border border-white bg-emerald-600 rounded-lg font-semibold text-gray-300 duration-100  shadow-sm shadow-red-200 transition-all transform  hover:scale-105  ease-in-out hover:text-red-100"
            >
              <p className="flex items-center justify-center">Login</p>
              <FaSignOutAlt
                size={20}
                className="text-gray-300 group-hover:text-gray-100"
              />
            </Link>
          )}
          <button
            onClick={() => {
              dispatch(toggleSmallScreenSidebar());
            }}
            className={` ${
              hideHamburger ? "hidden" : "block"
            } text-white sm:hidden hover:border-gray-200 p-2 hover:bg-gray-700 cursor-pointer hover:text-white rounded-full`}
          >
            <FaBars />
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

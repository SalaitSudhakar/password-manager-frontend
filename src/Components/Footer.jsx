import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Footer = ({ hidecomponent }) => {
  const { isSidebarOpen } = useSelector((state) => state.sidebar);
  const location = useLocation();

  const hide = hidecomponent.includes(location.pathname);

  return (
    <div
      className={`bg-teal-100 text-gray-800 px-2 py-4 sm:p-4 transition-all duration-300 ${hide ? "" : 
        isSidebarOpen ? "sm:ml-60" : "sm:ml-16"
      }`}
    >
      <div className="flex flex-row flex-wrap justify-between items-center p-2 pb-0 max-w-6xl mx-auto gap-5 sm:gap-2">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <img src="logo.png" alt="logo" className="w-6 h-6 sm:w-10 sm:h-10" />
          <p className="sm:text-xl font-bold tracking-wide">SafePass</p>
        </div>

        {/* Author Info + Socials */}
        <div className="flex flex-col gap-1 text-sm sm:text-base">
          <p>
            Built by{" "}
            <span className="font-semibold text-teal-800 uppercase">
              Salait Sudhakar
            </span>
          </p>

          <div className="font-medium flex items-center gap-3">
            <Link
              to="https://github.com/SalaitSudhakar"
              className="hover:text-gray-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
            <span className="h-5 w-[1px] bg-gray-700"></span>
            <Link
              to="https://www.linkedin.com/in/salaitsudhakar"
              className="hover:text-gray-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2 sm:mt-0 p-2 text-center">
        © {new Date().getFullYear()} SafePass. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;

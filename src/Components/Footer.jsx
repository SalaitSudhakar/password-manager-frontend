import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  const { isSidebarOpen } = useSelector((state) => state.sidebar);

  return (
    <div
      className={`bg-teal-100 text-gray-800 p-4 transition-all duration-300 ${
        isSidebarOpen ? "sm:ml-60" : "sm:ml-16"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 max-w-6xl mx-auto gap-3">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <img src="logo.png" alt="logo" className="w-10 h-10" />
          <p className="text-xl font-bold tracking-wide">SafePass</p>
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
      <p className="text-xs text-gray-500 mt-2 text-center">
        © {new Date().getFullYear()} SafePass. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;

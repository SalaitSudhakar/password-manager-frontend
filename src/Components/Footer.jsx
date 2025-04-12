import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  const { isSidebarOpen } = useSelector((state) => state.sidebar);

  return (
    <div
      className={`bg-teal-100 text-gray-800 p-6 ${
        isSidebarOpen ? "sm:ml-60" : "sm:ml-16"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 max-w-6xl mx-auto ">
        <div className="flex gap-4 sm:gap-2 sm:items-center sm:justify-center">
          <img src="logo.png" alt="logo" className="w-10 h-10 " />
          <p className="text-lg font-bold">SafePass</p>
        </div>

        <div className="flex flex-col gap-2 ">
          <p className="font">
            Built By{" "}
            <span className="font-medium text-teal-800 uppercase">Salait Sudhakar</span>
          </p>

          <div className="font-semibold flex gap-2.5">
            <Link
              to={"https://github.com/SalaitSudhakar"}
              className="hover:text-gray-700"
              target="_blank"
            >
              GitHub
            </Link>
            <span className="h-5 w-[2px] bg-gray-700">{""}</span>
            <Link
              to={"https://www.linkedin.com/in/salaitsudhakar"}
              className="hover:text-gray-700"
              target="_blank"
            >
              Linkedin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

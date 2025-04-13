import React from "react";
import lock_icon from "../assets/Lock_icon.png";
import { Link } from "react-router-dom";
import { FaBolt, FaShieldAlt, FaLock } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-teal-50 text-gray-800 ">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto py-20 flex flex-col-reverse sm:flex-col items-center justify-center gap-10 ">
        {/* Text Content */}
        <div className=" sm:w-1/2 mt-10 mx-5 sm:mt-0 mb-5">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-teal-700">
            Secure. Simple. Strong.
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Manage all your passwords in one safe place. Your digital vault for
            strong, encrypted, and easily accessible credentials.
          </p>
          <Link
            to={"/passwords"}
            className="bg-gradient-to-br from-teal-600 to-teal-800 hover:from-teal-500 hover:to-teal-600 shadow-lg shadow-teal-200 border   text-white px-6 py-3 rounded-xl  transition-all duration-300"
          >
            Add Passwords
          </Link>
        </div>

        {/* Image */}
        <div className="relative font-semibold text-teal-100 text-lg">
          <img
            src={lock_icon}
            alt="Password Manager Screenshot"
            className="w-[200px] h-[300px] md:w-[400px] md:h-[500px] rounded-2xl "
          />
          {/* 3D Badge: Strong */}
          <div className="absolute top-[10%] -left-5">
            <div className="relative inline-block px-4 py-2 rounded-lg font-semibold text-gray-800 bg-amber-500 shadow-md -rotate-3">
              {/* Translated Shadow Layer */}

              <div className="flex items-center gap-2 relative z-10">
                <FaBolt />
                Strong
              </div>
            </div>
          </div>

          {/* 3D Badge: Safe */}
          <div className="absolute top-[35%] -right-5">
            <div className="relative inline-block px-4 py-2 rounded-lg font-semibold text-gray-800 bg-amber-500 shadow-md rotate-3">
              <div className="flex items-center gap-2 relative z-10">
                <FaShieldAlt />
                Safe
              </div>
            </div>
          </div>

          {/* 3D Badge: Simple */}
          <div className="absolute top-[70%] -left-5">
            <div className="relative inline-block px-4 py-2 rounded-lg font-semibold text-gray-800 bg-amber-500 shadow-md rotate-5">
              <div className="flex items-center gap-2 relative z-10">
                <FaLock />
                Simple
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

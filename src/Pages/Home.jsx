import React from "react";
import { FaClock, FaSearch, FaShieldAlt } from "react-icons/fa";
import lock_icon from "../assets/Lock_icon.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-teal-50 text-gray-800 ">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 flex flex-col-reverse lg:flex-col items-center justify-between">
        {/* Text Content */}
        <div className="lg:w-1/2 w-full mt-10 sm:mt-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-teal-700">
            Secure. Simple. Smart.
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Manage all your passwords in one safe place. Your digital vault for
            strong, encrypted, and easily accessible credentials.
          </p>
          <Link to={"/passwords"} className="bg-teal-600 hover:bg-teal-700  text-white px-6 py-3 rounded-xl shadow-lg transition duration-300">
            Get Started
          </Link>
        </div>

        {/* Image */}
        <div className="mt-0 sm:mt-10">
          <img
            src={lock_icon}
            alt="Password Manager Screenshot"
            className="w-[300px] h-[450px] md:w-[350px] md:h-[500px] rounded-2xl "
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

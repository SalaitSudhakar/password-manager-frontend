import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";

const AddPassword = () => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>Add Password - SafePass</title>
      </Helmet>
      <div></div>
      <div className="px-4 sm:px-8 py-6 my-10 w-[96%] sm:max-w-3xl mx-auto border border-teal-100  text-center bg-teal-50 rounded-xl shadow-lg shadow-emerald-300">
        <div className="flex gap-4 items-center font-bold text-gray-800">
          <IoArrowBackOutline size={25} className="" />
          <h1 className="text-3xl text-teal-700 mb-2"> Add Password</h1>
        </div>
        <form className="flex flex-col gap-4 my-10">
          <p className="text-gray-600 font-medium text-start -mb-2">
            Required Information 
          </p>
          {/* Site name */}
          <input
            type="text"
            name="siteName"
            value={formData.siteName}
            placeholder="Site Name"
            onChange={handleFormChange}
            className="w-full border border-gray-400 focus:border-teal-500 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 text-gray-700"
          />
          {/* Site Url */}
          <input
            type="text"
            name="siteUrl"
            value={formData.siteUrl}
            placeholder="Site URL"
            onChange={handleFormChange}
            className="w-full border border-gray-400 focus:border-teal-500 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 text-gray-700"
          />
          {/* user name (optional) */}
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder="username/email (optional)"
            onChange={handleFormChange}
            className="w-full border border-gray-400 focus:border-teal-500 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 text-gray-700"
          />
          {/* password  */}
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              placeholder="password"
              onChange={handleFormChange}
              className="w-full border border-gray-400 focus:border-teal-500 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 text-gray-700"
            />
            {showPassword ? (
              <FaEyeSlash
                size={20}
                className="absolute top-4 right-3"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEye
                size={20}
                className="absolute top-4 right-3"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
            <button className="group mt-3 bg-gradient-to-r from-teal-500 to-teal-700 p-3 rounded-lg text-white font-semibold transition-all duration-300 hover:from-teal-600 hover:to-teal-800 cursor-pointer">
              Generate Password
            </button>
          </div>

          <hr className="text-gray-400 mt-4"/>
        </form>
      </div>
    </>
  );
};

export default AddPassword;

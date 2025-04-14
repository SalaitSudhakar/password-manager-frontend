import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

console.log("hello add password")
const AddPassword = () => {
  console.log("Add Password")
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false)

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>Add Password - SafePass</title>
      </Helmet>
      <div className="px-3 sm:px-8 py-6 my-10 w-full sm:max-w-md mx-auto border border-teal-100  text-center bg-teal-50 rounded-xl shadow-lg shadow-emerald-300">
        <h1 className="text-4xl text-teal-700 text-center font-bold mb-2">
          {" "}
          Add Password
        </h1>
        <form>
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
              type={showPassword ? 'text' : 'password'}
              name="username"
              value={formData.username}
              placeholder="password"
              onChange={handleFormChange}
              className="w-full border border-gray-400 focus:border-teal-500 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 text-gray-700"
            />
            {showPassword ? <FaEyeSlash className="absolute right-0 top-1/2" onClick={() => setShowPassword(!showPassword)}/> : <FaEye className="absolute right-0 top-1/2" onClick={() => setShowPassword(!showPassword)}/>}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPassword;

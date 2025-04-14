import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import { generatePassword } from "./../utils/generatePassword.js";
import {
  barBackgrounColor,
  getPasswordStrengthText,
  passwordStrength,
} from "./../utils/checkPasswordStrength.js";
import { validatePassword } from "../utils/validatePassword.js";
import { toast } from 'react-toastify';

const AddPassword = () => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Validate password:
  if (formData.password) {
    const validPassword = validatePassword(formData.password)
    if (!validPassword.isValid) {
      return toast.error(validPassword.message)
    }
  }
  

  // Validate datas:
  

  // Generate password on button click
  const handleGeneratePasswordClick = (e) => {
    e.preventDefault();

    setFormData({ ...formData, password: generatePassword() });
  };

  // Password strength score

  let passwordStrengthScore = 0;
  if (formData.password)
    passwordStrengthScore = passwordStrength(formData.password);

  // Password strength text
  const textBasedOnPasswordStrength = getPasswordStrengthText(
    passwordStrengthScore
  );
  const passwordStrengthText = textBasedOnPasswordStrength.text;
  const passwordStrengthTextColor = textBasedOnPasswordStrength.color;

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>Add Password - SafePass</title>
      </Helmet>
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
          <div className="w-full flex justify-center items-center gap-2">
            <div className=" w-2/3 relative">
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
            </div>
            <button
              onClick={handleGeneratePasswordClick}
              className="w-1/3 group  bg-gradient-to-r text-sm sm:text-base from-teal-500 to-teal-700 p-2 sm:py-3  rounded-lg text-white font-semibold transition-all duration-300 hover:from-teal-600 hover:to-teal-800 cursor-pointer"
            >
              Generate Password
            </button>
          </div>

          {/* Password strength bar */}
          <div className="w-full">
            <div className="flex justify-between text-sm text-gray-600">
              <span className="">Password-strength</span>
              <span className={` uppercase ${passwordStrengthTextColor} font-medium`}>
                {passwordStrengthText}
              </span>
            </div>
            <div className="flex gap-2 my-3">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className={`flex flex-1 h-1 rounded-full ${barBackgrounColor(
                      passwordStrengthScore,
                      index
                    )}`}
                  ></div>
                ))}
            </div>
          </div>
          {/* Horizontal rule */}
          <hr className="text-gray-400 mt-4" />
        </form>
      </div>
    </>
  );
};

export default AddPassword;

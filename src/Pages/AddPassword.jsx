import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoArrowBackOutline, IoClose } from "react-icons/io5";
import { generatePassword } from "./../utils/generatePassword.js";
import {
  barBackgrounColor,
  getPasswordStrengthText,
  passwordStrength,
} from "./../utils/checkPasswordStrength.js";
import { validatePassword } from "../utils/validatePassword.js";
import { toast } from "react-toastify";

const AddPassword = () => {
  const [formData, setFormData] = useState({
    siteName: "",
    siteUrl: "",
    username: "",
    password: "",
    category: "personal",
    tags: [],
    notes: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [currentTag, setCurrentTag] = useState("");

  /* Category options */
  const categoryOptions = [
    "personal",
    "social",
    "work",
    "banking",
    "entertainment",
    "shopping",
    "others",
  ];
  // Validate password:
  if (formData.password) {
    const validPassword = validatePassword(formData.password);
    if (!validPassword.isValid) {
      return toast.error(validPassword.message);
    }
  }

  // Validate site url:
  const isValidUrl = (url) => {
    try {
      const parsed = new URL(url);
      // Ensure it correctly checks for both http:// and https://
      return parsed.protocol === "https:" || parsed.protocol === "http:";
    } catch (_) {
      return false;
    }
  };

  if (formData.siteUrl) {
    if (!isValidUrl(formData.siteUrl)) {
      toast.error("Enter valid Site URL");
      return;
    }
  }

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

  const handleTagChange = (e) => {
    const value = e.target.value;
    if (/[,\s]$/.test(value)) {
      //checks if theres is space and comma in the text
      const newTag = value.trim().replace(/[, ]+$/, "");
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData({
          ...formData,
          tags: [...formData.tags, newTag],
        });
      }
      setCurrentTag("");
      set;
    } else {
      setCurrentTag(value);
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(currentTag.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, currentTag.trim()],
        });
        setCurrentTag("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
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
            className="w-full border border-amber-400 focus:border-teal-500 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 text-gray-700"
          />

          {/* Site Url */}
          <input
            type="text"
            name="siteUrl"
            value={formData.siteUrl}
            placeholder="Site URL"
            onChange={handleFormChange}
            className="w-full border border-amber-400 focus:border-teal-500 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 text-gray-700"
          />

          {/* user name (optional) */}
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder="username/email (optional)"
            onChange={handleFormChange}
            className="w-full border border-amber-400 focus:border-teal-500 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 text-gray-700"
          />

          {/* password  */}
          <div className="w-full flex flex-wrap sm:flex-nowrap sm:justify-center sm:items-center gap-2">
            <div className="w-full sm:w-2/3 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder="password"
                onChange={handleFormChange}
                className="w-full border border-amber-400 focus:border-teal-500 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 text-gray-700"
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
              className="w-full sm:w-1/3 group  bg-gradient-to-r text-sm sm:text-base from-teal-500 to-teal-700 p-2 py-3  rounded-lg text-white font-semibold transition-all duration-300 hover:from-teal-600 hover:to-teal-800 cursor-pointer"
            >
              Generate Password
            </button>
          </div>

          {/* Password strength bar */}
          <div className="w-full">
            <div className="flex justify-between text-sm text-gray-600">
              <span className="">Password-strength</span>
              <span
                className={`text-sm capitalize ${passwordStrengthTextColor} font-medium`}
              >
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
          {/* Additional and Optional information */}
          <p className="text-gray-600 font-medium text-start -mb-2">
            Addition Information
          </p>

          {/*  Category selection */}
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleFormChange}
            className="w-full p-3 border text-gray-700 border-amber-400 bg-white/50 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {categoryOptions.map((option) => (
              <option key={option} value={option} className="hover:bg-gray-100">
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>

          {/* Tags */}
          <div className="flex flex-col">
            <input
              type="text"
              name="tags"
              value={currentTag}
              onChange={handleTagChange}
              onKeyDown={handleTagKeyDown}
              placeholder="Type and press space, comma or enter to add tags"
              className="w-full border border-amber-400 focus:border-teal-500 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 text-gray-700"
            />

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 my-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="group inline-flex items-center gap-1 pl-3 pr-0.5 py-1 rounded-full text-xs font-semibold bg-amber-200 text-gray-800 hover:bg-amber-500 hover:text-gray-100 transition-colors duration-200"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="p-1 rounded-full bg-teal-100 cursor-pointer group-hover:bg-teal-500"
                    >
                      <IoClose size={15} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPassword;

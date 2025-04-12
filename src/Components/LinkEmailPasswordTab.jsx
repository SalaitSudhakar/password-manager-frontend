import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  apiRequestStart,
  apiRequestFail,
  resetLoadingstate,
} from "../Redux/Slice/userSlice";
import api from "../services/axiosConfig";
import ClipLoader from "react-spinners/ClipLoader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LinkEmailPasswordTab = ({ selectedTab }) => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { isLoading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      dispatch(apiRequestStart());

      const res = await api.post("/user/google/link-email-password", {
        password: formData.password,
      });

      toast.success(res.data.message);
      dispatch(resetLoadingstate());
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
      dispatch(apiRequestFail(error));
    }
  };

  return (
    <div
      className={`transition-transform duration-300 p-3 md:p-8 ${
        selectedTab === "link-email-password" ? "block" : "hidden"
      } min-h-full w-full`}
    >
      <h1 className="font-bold text-center text-4xl mb-5 text-teal-800">
        Link Email & Password
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="font-semibold text-teal-800">New Password</label>
        <div className="relative w-full mt-1">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            required
            className="w-full border-b border-teal-700 py-3 pb-1 text-gray-700 focus:outline-none"
          />
          <span
            className="absolute right-3 top-3 text-lg cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <label className="font-semibold text-teal-800 mt-5">Confirm Password</label>
        <div className="relative w-full mt-1">
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            onChange={handleChange}
            required
            className="w-full border-b border-teal-700 py-3 pb-1 text-gray-700 focus:outline-none"
          />
          <span
            className="absolute right-3 top-3 text-lg cursor-pointer"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {error && (
          <p className="text-red-700 text-sm text-center my-1">
            {error?.response?.data?.message || "Something went wrong"}
          </p>
        )}

        <button
          disabled={isLoading}
          className="group mt-6 bg-gradient-to-r from-teal-500 to-teal-700 p-3 rounded-lg text-white font-semibold hover:from-teal-600 hover:to-teal-800 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex justify-center items-center gap-2">
              <span>Loading</span> <ClipLoader color={"#A7F3D0"} size={25} />
            </span>
          ) : (
            "Link Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default LinkEmailPasswordTab;

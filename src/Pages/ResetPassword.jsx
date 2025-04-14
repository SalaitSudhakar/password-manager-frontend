import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import {
  apiRequestFail,
  apiRequestStart,
  apiRequestSuccess,
} from "../Redux/Slice/userSlice";
import api from "../services/axiosConfig";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { validatePassword } from "../utils/validatePassword";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isLoading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(apiRequestFail("Passwords do not match"));
      toast.error("Passwords do not match");
      return;
    }

    const result = validatePassword(password);
    if (!result.isValid) {
      dispatch(apiRequestFail(result.message));
      toast.error(result.message);
      return;
    }

    dispatch(apiRequestStart());

    try {
      const response = await api.post(`/auth/reset-password?token=${token}`, {
        newPassword: password,
      });

      const data = response.data;

      dispatch(apiRequestSuccess(data));
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      dispatch(apiRequestFail(error));
      toast.error(
        error.response?.data?.message || "An error occurred. Try Again!"
      );
    }
  };

  return (
    <>
    
      <Helmet>
        <title>Reset Password - SafePass</title>
      </Helmet>


      <div className="px-5 sm:px-8 py-6 my-10 w-full sm:max-w-md mx-1.5 sm:mx-auto border border-teal-100 text-center bg-teal-50 rounded-xl shadow-lg shadoteal-200">
        <h1 className="text-4xl text-teal-700 text-center font-bold mb-2">
          Reset Password
        </h1>
        <p className="mb-8 text-gray-500 text-sm">
          Enter your new password below.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full mx-auto"
        >
          {" "}
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="New Password"
              value={password}
              className="w-full border border-gray-400 focus:border-teal-500 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 text-gray-700"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-4 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>
        
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              className="w-full border border-gray-400 focus:border-teal-500 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 text-gray-700"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-4 cursor-pointer text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <FaEyeSlash size={20} />
              ) : (
                <FaEye size={20} />
              )}
            </span>
          </div>
        
          {error && (
            <p className="text-red-700 text-sm text-center my-1">
              {error.response?.data?.message || "Something Went Wrong. Try Again"}
            </p>
          )}
         
          <button
            disabled={isLoading}
            className="group mt-3 cursor-pointer bg-gradient-to-r from-teal-500 to-teal-700 p-3 rounded-lg text-white font-semibold transition-all duration-300 hover:from-teal-600 hover:to-teal-800 transform hover:scale-105 shadow-md hover:shadow-lg shadow-teal-600 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? (
              <span className="flex justify-center items-center gap-2">
                <span>Loading</span>
                <ClipLoader color={"#A7F3D0"} size={25} />
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;

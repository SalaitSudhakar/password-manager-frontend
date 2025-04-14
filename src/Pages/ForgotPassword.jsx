import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import {
  apiRequestFail,
  apiRequestStart,
  apiRequestSuccess,
} from "../Redux/Slice/userSlice";
import api from "../services/axiosConfig";
import { FaMailBulk } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { isLoading, error } = useSelector((state) => state.user); // Get state from user slice

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(apiRequestStart());

    try {
      const response = await api.post("/auth/forgot-password", { email });

      const data = response.data;

      dispatch(apiRequestSuccess(data));
      toast.success(data?.message);
      setIsEmailSent(true);
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
        <title>Forgot Password - SafePass</title>
      </Helmet>
      {isEmailSent ? ( // After Email Sent
        <div className="bg-white mx-auto mt-8 rounded-lg shadow-lg shadow-teal-200 p-8 max-w-md w-full flex flex-col items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <div className="bg-teal-100 p-4 rounded-full mb-4">
              <FaMailBulk className="text-teal-600 w-8 h-8" />
            </div>

            <h2 className="text-2xl font-bold text-teal-800 mb-2">
              Email Sent!
            </h2>

            <p className="text-gray-600 mb-6">
              We've sent a password reset link to your email address. Please
              check your inbox and follow the instructions to reset your
              password.
            </p>
          </div>
          <p className="text-teal-600 mt-6 text-sm">
            Didn't receive an email?{" "}
            <Link
              to={"/forgot-password"}
              className="text-teal-600 hover:text-teal-800"
            >
              Resend the Request
            </Link>
          </p>
        </div>
      ) : (
        // Email Send component
        <div className="px-5 sm:px-8 py-6 my-10 w-full sm:max-w-md mx-1.5 sm:mx-auto border border-teal-100  text-center bg-teal-50 rounded-xl shadow-lg shadow-teal-200 ">
          <h1 className="text-4xl text-teal-700 text-center font-bold mb-2">
            Forgot Password
          </h1>
          <p className="mb-8 text-gray-500 text-sm ">
            A password reset Link will be sent to Email address
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 w-full mx-auto"
          >
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                className="w-full border border-amber-400 focus:border-teal-500 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 text-gray-700"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-700 text-sm text-center my-1 ">
                {error?.response?.data?.message ||
                  "Something Went Wrong. Try Again"}
              </p>
            )}

            <button
              disabled={isLoading}
              className="group mt-3 cursor-pointer bg-gradient-to-r from-teal-500 to-teal-700 p-3 rounded-lg text-white font-semibold transition-all duration-300 hover:from-teal-600 hover:to-teal-800 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoading ? (
                <span className="flex justify-center items-center gap-2">
                  <span>Loading</span>{" "}
                  <ClipLoader color={"#A7F3D0"} size={25} />
                </span>
              ) : (
                "Send Email"
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;

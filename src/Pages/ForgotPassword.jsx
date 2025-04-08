import React, { useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import ClipLoader from "react-spinners/ClipLoader";

const ForgotPassword = () => {
  const [email, setEmail] = useState(null);
  const { isLoading, error } = useSelector((state) => state.user); // Get state from user slice

  const handleSubmit = () => {};
  return (
    <>
      <Helmet>
        <title>Forgot Password - SafePass</title>
      </Helmet>

      <div className="px-3 sm:px-8 py-6 my-10 w-full sm:max-w-md mx-auto border border-teal-100  text-center bg-teal-50 rounded-xl shadow-lg shadow-emerald-300">
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
              className="w-full border border-gray-400 focus:border-teal-500 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 text-gray-700"
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
            className="group mt-3 bg-gradient-to-r from-teal-500 to-teal-700 p-3 rounded-lg text-white font-semibold transition-all duration-300 hover:from-teal-600 hover:to-teal-800 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? (
              <span className="flex justify-center items-center gap-2">
                <span>Loading</span> <ClipLoader color={"#A7F3D0"} size={25} />
              </span>
            ) : (
              "Send Email"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;

import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../services/axiosConfig";
import {
  apiRequestFail,
  apiRequestStart,
  apiRequestSuccess,
} from "../Redux/Slice/userSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state) => state.user);

  const handleChange = (index, e) => {
    const value = e.target.value;

    if (isNaN(value)) {
      toast.error("Enter only a number");
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length > 0 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasteData = e.clipboardData.getData("text").trim().slice(0, 6);

    const newOtp = pasteData.split("");
    setOtp(newOtp);

    newOtp.forEach((value, index) => {
      if (isNaN(value)) {
        toast.error("Enter a valid Number");
        return;
      }
      if (inputRefs.current[index]) inputRefs.current[index].value = value;
    });
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    const newOtp = otp.join("");

    console.log("newOtp", newOtp);
    try {
      dispatch(apiRequestStart());
      const response = await api.post("/auth/verify-email", { otp: newOtp });

      const data = response.data;

      dispatch(apiRequestSuccess(data));
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      dispatch(apiRequestFail(error));
      toast.error(
        error?.response?.data?.message || "An error occurred. Try Again!"
      );
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 min-h-screen p-6 ">
      <div className="bg-teal-150 p-6 rounded-lg shadow-lg shadow-teal-200 transition-transform transform translate-x-0">
        <h2 className="text-xl font-semibold text-teal-700">Enter OTP</h2>
        <p className="text-gray-600 mt-1 mb-4">Go and Check Your Email for verification OTP</p>
        <form
          onSubmit={handleOtpSubmit}
          onPaste={handlePaste}
          className="flex flex-col gap-3"
        >
          <div className="flex space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                className="w-12 h-12  text-gray-900 text-center border border-gray-700 rounded-md text-xl focus:outline-teal-700"
              />
            ))}
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
              "Verify OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;

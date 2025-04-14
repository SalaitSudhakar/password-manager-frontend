import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  apiRequestFail,
  apiRequestStart,
  resetLoadingstate,
} from "../Redux/Slice/userSlice";
import api from "../services/axiosConfig";
import ClipLoader from "react-spinners/ClipLoader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UpdatePasswordTab = ({ selectedTab }) => {
  // Password Tab code
  const [passwordData, setPasswordData] = useState({});
  const { isLoading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  /* Show passwords */
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Get passwordData
  const handlePasswordChange = (e) => {
    
    console.log("old password: ", passwordData.oldPassword, "newPassword: ", passwordData.newPassword)
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New Password and Confirm Password does not Match!");
      return;
    }

    if (!validatePassword(passwordData.newPassword)) {
      toast.error(
        "Passwords must be atleast 8 character length. It should atleast have 1 Lowercase letter, 1 uppercase letter and 1 special Character with 1 number"
      );
    }

    try {
      dispatch(apiRequestStart());
      const response = await api.patch("user/update-password", {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });

      const data = response.data;

      dispatch(resetLoadingstate());
      toast.success(data.message);
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something Went Wrong. Try Again!"
      );
      dispatch(apiRequestFail(error));
    }
  };

  return (
    <>
      <div
        className={`transition-transform duration-300 p-3 md:p-8 ${
          selectedTab === "password" ? "block" : "hidden"
        } min-h-full w-full`}
      >
        <h1 className="font-bold text-center text-4xl mb-5 text-teal-800">
          Update Password
        </h1>

        {/* Form */}
        <form className="flex flex-col" onSubmit={handlePasswordUpdate}>
          <div className="my-4">
            {/* Old Password */}
            <div className="flex flex-col -gap-0.5 ">
              <label
                htmlFor="oldPassword"
                id="oldPassword"
                className="text-teal-800 font-semibold"
              >
                Old Password
              </label>
              <div className="relative w-full">
                <input
                  type={showOldPassword ? "text" : "password"}
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  id="oldPassword"
                  required
                  onChange={handlePasswordChange}
                  className="w-full border-b border-b-teal-700 py-3 pb-1 focus:outline-0 text-gray-700"
                />
                <p
                  className="absolute right-3 top-3 text-lg"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                </p>
              </div>
            </div>

            {/* New Password */}
            <div className="flex flex-col -gap-0.5 mt-5">
              <label
                htmlFor="newPassword"
                id="newPassword"
                className="text-teal-800 font-semibold"
              >
                New Password
              </label>
              <div className="relative w-full">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwordData.newPassword}
                  id="newPassword"
                  required
                  onChange={handlePasswordChange}
                  className="w-full border-b border-b-teal-700 py-3 pb-1 focus:outline-0 text-gray-700"
                />
                <p
                  className="absolute right-3 top-3 text-lg"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </p>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col -gap-0.5 mt-5">
              <label
                htmlFor="confirmPassword"
                id="confirmPassword"
                className="text-teal-800 font-semibold"
              >
                Confirm Password
              </label>
              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  id="confirmPassword"
                  required
                  onChange={handlePasswordChange}
                  className="w-full border-b border-b-teal-700 py-3 pb-1 focus:outline-0 text-gray-700"
                />

                <p
                  className="absolute right-3 top-3 text-lg"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </p>
              </div>
            </div>
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
              "Update Password"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdatePasswordTab;

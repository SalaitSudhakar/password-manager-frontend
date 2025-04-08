import React, { useState } from "react";
import { Helmet } from "react-helmet";
import OAuth from "../Components/OAuth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginFail, loginStart, loginSuccess } from "../Redux/Slice/userSlice";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [isRegisterBtnClicked, setIsRegisterBtnClicked] = useState(false);
  const { isLoading, error } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  axios.defaults.withCredentials = true; // to handle cookie

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    if (!formData || !formData.name || !formData.email || !formData.password) {
      toast.error("Name, Email and Password are required");
    }
    try {
      setIsRegisterBtnClicked(true);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        formData
      );

      const data = response.data;

      console.log(data);
      dispatch(loginSuccess(data));
      setIsRegisterBtnClicked(false);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      dispatch(loginFail(error));
      setIsRegisterBtnClicked(false);
      toast.error(
        error?.response?.data.message || "An error occurred, Try again!"
      );
    }
  };
  return (
    <>
      <Helmet>
        <title>Register - SafePass</title>
      </Helmet>

      <div className="px-3 sm:px-8 py-6 my-10 w-full sm:max-w-md mx-auto border border-teal-100  text-center bg-teal-50 rounded-xl shadow-lg shadow-emerald-300">
        <h1 className="text-4xl text-teal-700 text-center font-bold mb-2">
          Create Your Account
        </h1>
        <p className="mb-8 text-gray-500 text-sm ">
          Create account to store your passwords in a safe vault
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full mx-auto"
        >
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="w-full border border-gray-400 focus:border-teal-500 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 text-gray-700"
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="w-full border border-gray-400 focus:border-teal-500 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 text-gray-700"
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              id="password"
              name="password"
              placeholder="Password"
              className="w-full border mt-1 border-gray-400 focus:border-teal-500 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 text-gray-700"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <Link
              to="/forgot-password"
              className="text-teal-600 font-medium ml-2 hover:text-teal-800 transition-colors duration-300"
            >
              Forgot Password
            </Link>
            <div className="flex gap-1.5 items-center justify-center text-sm">
              {" "}
              <input
                type="checkbox"
                onChange={(e) => setShowPassword(e.target.checked)}
                className="accent-teal-700 "
              />{" "}
              <span className="text-gray-600 ">Show Password</span>
            </div>
          </div>

          {error && (
            <p className="text-red-700 text-sm text-center my-1 -mb-1.5">
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
              "Login"
            )}
          </button>

          <div className="flex items-center my-2">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500 font-medium">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <OAuth />
        </form>

        <div className="mt-6 text-gray-600">
          <p>
            Already have an account?
            <Link to="/register">
              <span className="text-teal-600 font-medium ml-2 hover:text-teal-800 transition-colors duration-300">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;

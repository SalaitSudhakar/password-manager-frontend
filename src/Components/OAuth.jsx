import { app } from "../firebase.js";
import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginFail,
  loginStart,
  loginSuccess,
} from "../Redux/Slice/userSlice.js";
import { toast } from "react-toastify";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector(state => state.user)

  axios.defaults.withCredentials = true;

  const handleGoogleClick = async () => {
    try {
      dispatch(loginStart());
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        profile: result.user.photoURL,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/google`,

        userData
      );

      console.log(response);
      const data = response.data;

      dispatch(loginSuccess(data));
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      dispatch(
        loginFail(
          error?.response?.data?.message || "Something went wrong. Try again!"
        )
      );
      toast.error(
        error?.response?.data?.message || "Something went wrong. Try again!"
      );
      console.error("Google Sign-In Error:", error);
    }
  };
  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={handleGoogleClick}
      className="group bg-gradient-to-br from-red-400 to-red-600 p-3 rounded-lg text-white transition-all duration-100 font-semibold  border-2  hover:from-red-500 hover:to-red-700 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none"
    >
      Continue with Google
    </button>
  );
};

export default OAuth;

import { app } from "../firebase.js";
import React, { useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader.js";
import api from "../services/axiosConfig.js";
import {
  apiRequestFail,
  apiRequestStart,
  apiRequestSuccess,
} from "../Redux/Slice/userSlice.js";

const OAuth = () => {
  const [isGoogleBtnClicked, setIsGoogleBtnClicked] = useState(false); // To track Google btn click ( to provide separate loading for login btn and google btn)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.user);

  const handleGoogleClick = async () => {
    try {
      setIsGoogleBtnClicked(true);
      dispatch(apiRequestStart());
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        profile: result.user.photoURL,
      };

      const response = await api.post("/auth/google", userData);

      const data = response.data;

      dispatch(apiRequestSuccess(data));
      setIsGoogleBtnClicked(false);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      dispatch(
        apiRequestFail(
          error?.response?.data?.message || "Something went wrong. Try again!"
        )
      );
      toast.error(
        error?.response?.data?.message || "Something went wrong. Try again!"
      );
      setIsGoogleBtnClicked(false);
    }
  };
  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={handleGoogleClick}
      className="group bg-gradient-to-br from-red-400 to-red-600 p-3 rounded-lg text-white transition-all duration-100 font-semibold  hover:from-red-500 hover:to-red-700 transform hover:scale-105 shadow-md hover:shadow-lg shadow-red-500 disabled:opacity-50 disabled:pointer-events-none"
    >
      {isLoading && isGoogleBtnClicked ? (
        <span className="flex justify-center items-center gap-2">
          <span>Loading</span> <ClipLoader color={"#ffffff"} size={25} />
        </span>
      ) : (
        "Continue with Google"
      )}
    </button>
  );
};

export default OAuth;

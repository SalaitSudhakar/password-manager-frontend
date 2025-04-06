import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import AdminDashboard from "./Pages/AdminDashboard";
import PasswordList from "./Pages/PasswordList";
import Login from "./Pages/Login";
import Layout from "./Components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { isUserAuthenticated } from "./Redux/Slice/userSlice.js";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import VerifyEmail from "./Pages/VerifyEmail";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isUserAuthenticated());
  }, [dispatch])

  return (
    <div className="relative">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          {/* Routes with Layout */}
           <Route element={<Layout />}> 
            <Route path="/" element={<Home />} />
            <Route path="/passwords" element={<PasswordList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
           <Route path="/verify-email" element={<VerifyEmail />} />

            {/* Routes without Layout */}
             <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} /> 
           </Route> 
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

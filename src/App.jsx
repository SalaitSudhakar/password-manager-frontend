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
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import VerifyEmail from "./Pages/VerifyEmail";
import PageNotFound from "./Pages/PageNotFound.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import AuthGuard from "./Components/AuthGuard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "./Redux/Slice/userSlice.js";
import Footer from "./Components/Footer.jsx";
import PulseLoader from "react-spinners/PulseLoader.js";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userDetails } = useSelector((state) => state.user);
  const emailVerified = userDetails?.user?.emailVerified || false;

  useEffect(() => {
    dispatch(authState());
  }, [dispatch, isAuthenticated, emailVerified]);

  // Add this function above your return
  const renderVerifyEmailRoute = () => {
    if (!userDetails || !userDetails.user) {
      // Show loading state while userDetails is being fetched
      return (
        <>
          <div className="absolute inset-0 w-full min-h-screen bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <PulseLoader size={25} color={"#14b8a6"} />
          </div>
        </>
      );
    }

    return userDetails.user.registerType === "email" ? (
      <VerifyEmail />
    ) : (
      <PageNotFound />
    );
  };

  const componentToHide = ["/login", "/register", "/forgot-password", "/reset-password", "/verify-email"];

  return (
    <div className="relative min-h-screen flex flex-col">
      <BrowserRouter>
        <ToastContainer />
        <div className="flex-grow">
          <Routes>
            {/* Routes with Layout of sidebar and navbar*/}
            <Route element={<Layout hideComponent={componentToHide}/>}>
              <Route
                element={<ProtectedRoute allowedRoles={["user", "admin"]} />}
              >
                <Route path="/" element={<Home />} />
                <Route path="/passwords" element={<PasswordList />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>

              {/* Routes only without sidebar layout */}
              {/* To protect the loggedin user to  */}
              <Route element={<AuthGuard />}>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                  path="/verify-email"
                  element={renderVerifyEmailRoute()}
                />
              </Route>
            </Route>
            {/* to handle the page that is not available */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>

        <Footer hidecomponent={componentToHide}/>
      </BrowserRouter>
    </div>
  );
};

export default App;

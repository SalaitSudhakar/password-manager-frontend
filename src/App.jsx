import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import { authState, resetLoadingstate } from "./Redux/Slice/userSlice.js";
import Footer from "./Components/Footer.jsx";
import PulseLoader from "react-spinners/PulseLoader.js";
import AddPassword from './Components/AddPassword';
import EditPassword from './Pages/EditPassword';

// Separate component to handle useLocation and resetLoadingstate
const RouteChangeHandler = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(resetLoadingstate());
  }, [location.pathname, dispatch]);

  return null; // This component doesn't render anything
};

const App = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, userDetails } = useSelector((state) => state.user);
  const emailVerified = userDetails?.user?.emailVerified || false;

  useEffect(() => {
    dispatch(authState());
  }, [dispatch, isAuthenticated, emailVerified]);

  const renderVerifyEmailRoute = () => {
    if (!userDetails || !userDetails.user) {
      return (
        <div className="absolute inset-0 w-full min-h-screen bg-black/20 backdrop-blur-sm flex items-center justify-center">
          <PulseLoader size={25} color={"#14b8a6"} />
        </div>
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
        <RouteChangeHandler />
        <ToastContainer />
        <div className="flex-grow">
          <Routes>
            <Route element={<Layout hideComponent={componentToHide} />}>
              <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
                <Route path="/" element={<Home />} />
                <Route path="/passwords" element={<PasswordList />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/password/add" element={<AddPassword />}/>
                <Route path="/password/edit/:passwordId" element={<EditPassword />}/>
              </Route>

              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>

              <Route element={<AuthGuard />}>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-email" element={renderVerifyEmailRoute()} />
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer hidecomponent={componentToHide} />
      </BrowserRouter>
    </div>
  );
};

export default App;
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
import { authState, resetLoadingstate } from "./Redux/Slice/userSlice.js";
import Footer from "./Components/Footer.jsx";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userDetails } = useSelector((state) => state.user);
  const emailVerified = userDetails?.user?.emailVerified || false;

  useEffect(() => {
    if (!isAuthenticated || !emailVerified) {
      dispatch(authState());
    }
  }, [dispatch, isAuthenticated, emailVerified]);

  return (
    <div className="relative">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          {/* Routes with Layout of sidebar and navbar*/}
          <Route element={<Layout />}>
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
              <Route path="/verify-email" element={<VerifyEmail />} />
            </Route>
          </Route>
          {/* to handle the page that is not available */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

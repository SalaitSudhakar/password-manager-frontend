import React, { useRef, useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaPen,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader.js";
import { toast } from "react-toastify";
import {
  apiRequestFail,
  apiRequestStart,
  apiRequestSuccess,
  logoutSuccess,
  resetLoadingstate,
} from "../Redux/Slice/userSlice.js";
import api from "./../services/axiosConfig";
import { Helmet } from "react-helmet";
import Modal from "../Components/Modal.jsx";

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("profile");
  const { userDetails, isLoading, error } = useSelector((state) => state.user);

  const defaultProfile =
    userDetails?.user?.profile ||
    "https://ui-avatars.com/api/?name=User&background=random";
  const defaultName = userDetails?.user?.name;
  const defaultEmail = userDetails?.user?.email;

  const [profile, setProfile] = useState(null); // You cannot have default Profile here. You cannot use to change filt object into URL.CreateObject() in line 111.(img tag)
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);

  const profileImgFileRef = useRef(null);
  const dispatch = useDispatch();

  const tabs = [
    { id: "profile", icon: <FaUser />, label: "Profile Section" },
    { id: "password", icon: <FaLock />, label: "Update Password" },
    { id: "delete", icon: <FaTrash />, label: "Delete Account" },
  ];

  /* Handle Profile Image Change */
  const handleImageChange = (e) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      setProfile(e.target.files[0]);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    dispatch(apiRequestStart());

    /* when you send image (File data ) like this, you fill will not send to backend
      {
        name,
        email,
        profile,
      }
    */

    // Use FormData to send both text and file data (send without {} in api request)
    const formData = new FormData();
    formData.append("username", name || defaultName);
    formData.append("email", email || defaultEmail);
    formData.append("profile", profile || defaultProfile);

    try {
      const response = await api.patch("/user/update-profile", formData);

      const data = response.data;

      dispatch(apiRequestSuccess(data));
      toast.success(data.message);
    } catch (error) {
      toast.error(
        error?.response.data.message || "An error occured. Try again!"
      );
      dispatch(apiRequestFail(error));
    }
  };

  // Password Tab code
  const [passwordData, setPasswordData] = useState({});

  /* Show passwords */
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Get passwordData
  const handlePasswordChange = (e) => {
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
        confirmPassword: ""
      });
      
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something Went Wrong. Try Again!"
      );
      dispatch(apiRequestFail(error));
    }
  };

  /* Delete Tab */
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hanldeDeleteAccount = async (e) => {
    e.preventDefault();

    try {
      const response = await api.delete('/user/delete');

      const data = response.data;

      toast.success(data.message);
      dispatch(logoutSuccess())
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong. Try Again!");
      dispatch(apiRequestFail(error))
    }
  }
  return (
    <>
      <Helmet>
        <title>Profile - SafePass</title>
      </Helmet>
      <div className="w-full max-w-2xl mx-auto py-10 md:px-2 ">
        <div className="flex flex-col gap-4 px-2 mx-auto">
          {/* Left Side Content */}
          <div className="flex  gap-0.5 md:gap-1">
            {tabs.map((tab) => (
              <button
                onClick={() => {
                  setTimeout(() => {
                    setSelectedTab(tab.id);
                  }, 300);
                }}
                key={tab.id}
                className={`flex flex-1 items-center space-x-3 cursor-pointer rounded p-4 transition-all duration-200 ${
                  selectedTab === tab.id
                    ? "bg-teal-800 text-white "
                    : "bg-teal-200 text-gray-700"
                }`}
              >
                {tab.icon} <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Right Side content */}
          <div className=" shadow-2xl shadow-teal-700 rounded-xl">
            {/* Profile Tab */}

            <div
              className={`transition-transform duration-300 p-3 md:p-8 ${
                selectedTab === "profile" ? "block" : "hidden"
              } min-h-full w-full`}
            >
              <h1 className="font-bold text-center text-4xl mb-5 text-teal-800">
                Profile
              </h1>

              {/* Form */}
              <form className="flex flex-col" onSubmit={handleProfileUpdate}>
                <div className="flex items-center my-3 gap-2">
                  <img
                    src={
                      profile ? URL.createObjectURL(profile) : defaultProfile
                    }
                    alt="profile"
                    className="h-28 w-28 rounded-full"
                  />

                  <div>
                    <p className="text-2xl font-bold text-teal-800">
                      {userDetails?.user?.name}
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={profileImgFileRef}
                      onChange={handleImageChange}
                    />
                    <button
                      type="button"
                      onClick={() => profileImgFileRef.current.click()}
                      className="group flex items-center justify-center gap-2 text-blue-700 text-lg cursor-pointer transition-all duration-200 hover:text-blue-400 active:text-teal-300"
                    >
                      <span>Change Profile </span>{" "}
                      <FaPen
                        className="text-blue-700 group-hover:text-blue-400 group-active:text-teal-300 group-transtion-all duration-200"
                        size={15}
                      />
                    </button>
                  </div>
                </div>

                <div className="my-4">
                  {/* Name */}
                  <div className="flex flex-col -gap-0.5 ">
                    <label
                      htmlFor="name"
                      id="name"
                      className="text-teal-800 font-semibold"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name || defaultName}
                      id="name"
                      required
                      onChange={(e) => setName(e.target.value)}
                      className="border-b border-b-teal-700 py-3 pb-1 focus:outline-0 text-gray-700"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col -gap-0.5 mt-5">
                    <label
                      htmlFor="email"
                      id="email"
                      className="text-teal-800 font-semibold"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email || defaultEmail}
                      id="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-b border-b-teal-700 py-3 pb-1 focus:outline-0 text-gray-700"
                    />
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
                      <span>Loading</span>{" "}
                      <ClipLoader color={"#A7F3D0"} size={25} />
                    </span>
                  ) : (
                    "Update"
                  )}
                </button>
              </form>
            </div>

            {/* Update Password Tab */}
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
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
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
                      <span>Loading</span>{" "}
                      <ClipLoader color={"#A7F3D0"} size={25} />
                    </span>
                  ) : (
                    "Update Password"
                  )}
                </button>
              </form>
            </div>

            {/* Delete Account Tab */}

            <div
              className={`flex flex-col gap-2 ${
                selectedTab === "delete" ? "block" : "hidden"
              } p-8 `}
            >
              <div className=" border-l-4 border-red-500 text-gray-500 p-2 bg-red-400/15 mb-4">
                <h1 className="text-xl  text-red-500 flex gap-3 items-center mb-5 ">
                  <FaTrash size={20} className="" />{" "}
                  <span className="font-bold">
                    Deleting Your Account is Permeanent
                  </span>
                </h1>
                <p>
                  All your saved passwords will be deleted. You've can never
                  been able recover it.
                </p>
              </div>
              <div className="flex gap-2 flex-col">
                <h3 className="text-lg font-semibold text-teal-800 ">
                  Delete Your Account
                </h3>
                <p className="text-gray-600">
                  Before you proceed, please take a moment to consider the
                  consequences of account deletion:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-6">
                  <li>All your personal information will be erased</li>
                  <li>Your saved passwords will be lost</li>
                  <li>This action cannot be undone</li>
                </ul>
              </div>
              {error && (
                <p className="text-red-700 text-sm text-center my-1 ">
                  {error?.response?.data?.message ||
                    "Something Went Wrong. Try Again"}
                </p>
              )}

              <button
                disabled={isLoading}
                onClick={() => setIsModalOpen(true)}
                className="group mt-3 bg-gradient-to-r from-red-500 to-red-700 p-3 rounded-lg text-white font-semibold transition-all duration-300 hover:from-red-600 hover:to-red-800 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none"
              >
                {isLoading ? (
                  <span className="flex justify-center items-center gap-2">
                    <span>Loading</span>{" "}
                    <ClipLoader color={"#A7F3D0"} size={25} />
                  </span>
                ) : (
                  "Delete Account"
                )}
              </button>
            </div>
            

            {/* Modal */}
           

            {/* MOve above */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader.js";
import { toast } from "react-toastify";
import {
  apiRequestFail,
  apiRequestStart,
  apiRequestSuccess,
} from "../Redux/Slice/userSlice.js";
import api from "./../services/axiosConfig";
import { FaPen } from "react-icons/fa";

const UpdateProfileTab = ({
  selectedTab,
  profileData,
  refreshUserData,
}) => {
  const { isLoading, error } = useSelector((state) => state.user);

  const [profile, setProfile] = useState(null); // You cannot have default Profile here. You cannot use to change filt object into URL.CreateObject() in line 111.(img tag)
  const [name, setName] = useState(profileData?.user?.name || "");
  const [email, setEmail] = useState(profileData?.user?.email || "");

  const profileImgFileRef = useRef(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setName(profileData?.user?.name || "");
  //   setEmail(profileData?.user?.email || "");
  // }, [profileData]);

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
    formData.append("name", name);
    formData.append("email", email);
    if (profile) formData.append("profile", profile);

    try {
      const response = await api.patch("/user/update-profile", formData);

      const data = response.data;

      dispatch(apiRequestSuccess(data));
      toast.success(data.message);
      refreshUserData();
      setProfile(null);
    } catch (error) {
      toast.error(
        error?.response.data.message || "An error occured. Try again!"
      );
      dispatch(apiRequestFail(error));
    }
  };

  return (
    <>
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
            <div className="border-2 border-amber-500 rounded-full ">
              <img
                src={
                  profile
                    ? URL.createObjectURL(profile)
                    : profileData?.user?.profile
                }
                alt="profile"
                className="h-28 w-28 rounded-full "
              />
            </div>

            <div>
              <p className="text-2xl font-bold text-teal-800">
                {profileData?.user?.name}
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
                className="group flex items-center justify-center gap-2 text-amber-600  cursor-pointer transition-all duration-200 hover:text-amber-500 active:text-amber-400"
              >
                <span>Change Profile </span>{" "}
                <FaPen
                  className=" group-transtion-all duration-200"
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
                value={name}
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
                value={email}
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
            className="group mt-3 bg-gradient-to-r from-teal-500 to-teal-700 p-3 rounded-lg text-amber-200 font-semibold transition-all duration-300 hover:from-teal-600 hover:to-teal-800 cursor-pointer transform hover:scale-105 shadow-md shadow-amber-600 hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? (
              <span className="flex justify-center items-center gap-2">
                <span>Loading</span> <ClipLoader color={"#A7F3D0"} size={25} />
              </span>
            ) : (
              "Update"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfileTab;

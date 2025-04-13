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

const UpdateProfileTab = ({ selectedTab, profileData }) => {
  const { isLoading, error } = useSelector((state) => state.user);

  const defaultProfile =
    profileData?.user?.profile ||
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgGCgkGBwoHBwYGBg8UFQYWIB0WIhURHxMYHSggGBolGx8fITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAgEH/8QANBABAQACAAMGAgYLAQAAAAAAAAIBAwQREiEiMTJSYhNyBTNTgqHBI0FCUWFxgZGSk7EU/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD6oAqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8qpic1WcYmfNVM/fxV3nOIzmY/GwXNvEa9XZVc6+znxVb4+s57kTj5u1UAWP/bu/fH+t1PHbMeM6s/d5KoC/HHRnzxc/L2rWM4zjGceFMZJp33pz3c85+zrwBrDjVsnbGKn70+h2AAAAAAAAAAAAAAABnPLGc58J7wM/j9ma2/D59kT5f4qr26zV5rPjVdTxQAAAAABZ4C8zu6OfZctFkaKzO/XnHrlroAAAAAAAAAAAAAACPfnlo2fJSRHvxz0bMeygZICgAAAAADqM9NzXpqabDFbWPBAAAAAAAAAAAAAAARb9k69ec3z5V3e6lVuPxz0Yz6bkGcAoAAAAAA9xy545+DW1XOyMXPVyr1Mhp8Hjlw8e7qr8UE4AAAAAAAAAAAAACHip6+HvHpnq/smeVOKnM58KnpoGMJeI0fAqcdXVivL3USgAAAAAA19U9GqJ9MqHDcN8bHVnPKZr/JpIAAAAAAAAAAAAAAAAKv0hHVqm8fsV/wBZ7ZqcXOZrwqemmTu151bMxnt6fLXqwDgBQAABJw+v4u3E58vmr+QL/CR0aJxnxr9JX9U4IAAAAAAAAAAAAAAAADP+kfrp+T8167iJ53Uzj3MzitmNu3qnyzPTIIgFAABa+jvrq+T81VNwuzGrdiq8tT00DUHMXFzzisVj2ukAAAAAAAAAAAAAEezdr1+e5xn0z25BI52XGueq6xjClt47OeeNU8vdStV1ddVVnOfVQGy6u81Wc573d6nIKAAAAAAOtd1F4qc5x3u90tbXcbJ6orGcMd1N1FdU1nGfVKDYFDVx2ccsbZ5+6VvXu17PJc5z6a7MgkAAAAAABDxO74Mc8dt13YkHW3dGrHO6+WZ8aVL4+s/VxOPds7VWqq6zVZznNeaqeAkviNt+a88vTPYjBQAAAAAAAAAAAAABJHEbY8t55emu1PHH1j6yJz7tfYqANbVujbjnFfNNeMpGNNVFYqc5xmfLUtPht3xo557Lnu3KCYABm8dWa35x+qJmQBXAUAAAAAAAAAAAAAAAAAAFjgazO/GP1XNSCDSAB//Z";
  const defaultName = profileData?.user?.name;
  const defaultEmail = profileData?.user?.email;

  const [profile, setProfile] = useState(null); // You cannot have default Profile here. You cannot use to change filt object into URL.CreateObject() in line 111.(img tag)
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);

  const profileImgFileRef = useRef(null);
  const dispatch = useDispatch();

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
            <div className="border-2 border-teal-800 rounded-full ">
              <img
                src={profile ? URL.createObjectURL(profile) : defaultProfile}
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

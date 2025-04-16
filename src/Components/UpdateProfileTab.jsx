import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader.js";
import { toast } from "react-toastify";
import api from "./../services/axiosConfig";
import { FaPen } from "react-icons/fa";

const UpdateProfileTab = ({ selectedTab, profileData, refreshUserData }) => {
  const { isLoading } = useSelector((state) => state.user);
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const profileImgFileRef = useRef(null);

  // Sync state with profileData when it changes
  useEffect(() => {
    if (profileData?.user) {
      setName(profileData.user.name || "");
      setEmail(profileData.user.email || "");
    }
  }, [profileData]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      if (profile) formData.append("profile", profile);
      formData.append("name", name);
      formData.append("email", email);

      const response = await api.put("/user/update", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success(response.data?.message || "Profile Updated Successfully");
      refreshUserData(); // To re-fetch latest user info
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update profile");
    }
  };

  if (selectedTab !== "profile") return null;

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20">
          <img
            src={profile ? URL.createObjectURL(profile) : profileData.user.profile}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            onClick={() => profileImgFileRef.current.click()}
            className="absolute bottom-0 right-0 bg-amber-500 p-1 rounded-full text-white"
          >
            <FaPen size={12} />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={profileImgFileRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-600">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-600">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-teal-700 text-white font-semibold rounded hover:bg-teal-800"
      >
        {isLoading ? <ClipLoader size={20} color="#fff" /> : "Update Profile"}
      </button>
    </form>
  );
};

export default UpdateProfileTab;

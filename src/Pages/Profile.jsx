import React, { useEffect, useState } from "react";
import { FaLink, FaLock, FaTrash, FaUser } from "react-icons/fa";
import { Helmet } from "react-helmet";
import DeleteAccountTab from "../Components/DeleteAccountTab.jsx";
import UpdatePasswordTab from "../Components/UpdatePasswordTab.jsx";
import UpdateProfileTab from "../Components/UpdateProfileTab.jsx";
import LinkEmailPasswordTab from "../Components/LinkEmailPasswordTab.jsx";
import PulseLoader from "react-spinners/PulseLoader";
import api from "../services/axiosConfig.js";
import { toast } from "react-toastify";

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("profile");
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const tabs = [{ id: "profile", icon: <FaUser />, label: "Profile Section" }];

  const updatePasswordTab = {
    id: "password",
    icon: <FaLock />,
    label: "Update Password",
  };
  const linkEmailPasswordTab = {
    id: "link-email-password",
    icon: <FaLink />,
    label: "Link Email Password",
  };

  // if user registered with Firebase Google OAuth
  if (profileData?.user?.registerType === "google") {
    tabs.push(
      // if email password is already linked then show updatePasswordTab, other wise show link email password tab
      profileData?.user?.emailPasswordLinked
        ? updatePasswordTab
        : linkEmailPasswordTab
    );
  } else {
    // if user not registered with google, then directly push the update password tab
    tabs.push(updatePasswordTab);
  }

  /* To have the delete tab at the end in all the situation */
  tabs.push({ id: "delete", icon: <FaTrash />, label: "Delete Account" });

  const getUserData = async () => {
    try {
      setIsPageLoading(true);
      const response = await api.get("/user/data");
      setProfileData(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Fetching User Data");
    } finally {
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    if (!profileData?.user) {
      getUserData(); 
    }
  }, []);
  

  return (
    <>
      <Helmet>
        <title>Profile - SafePass</title>
      </Helmet>
      {isPageLoading ? (
        <>
          <div className="absolute inset-0 w-full min-h-screen bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <PulseLoader size={25} color={"#14b8a6"} />
          </div>
        </>
      ) : (
        <div className="w-full min-h-screen max-w-2xl mx-auto py-10 md:px-2 ">
          <div className="flex flex-col gap-4 px-2 mx-auto">
            {/* Left Side Content */}
            <div className="flex flex-wrap gap-0.5 md:gap-1">
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
            <div
              className={`shadow-2xl ${
                selectedTab === "delete" ? "shadow-red-700" : "shadow-teal-700"
              } rounded-xl`}
            >
              {/* Profile Tab */}
              <UpdateProfileTab selectedTab={selectedTab} profileData={profileData}/>

              {/* Update Password Tab */}
              <UpdatePasswordTab selectedTab={selectedTab} />

              {/* Link Email Password to your google account Tab*/}
             {selectedTab === "link-email-password" && <LinkEmailPasswordTab selectedTab={selectedTab} onSuccess={getUserData} setSelectedTab={setSelectedTab} />}

              {/* Delete Account Tab */}
              <DeleteAccountTab selectedTab={selectedTab} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

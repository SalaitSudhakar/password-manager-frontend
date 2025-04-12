import React, { useState } from "react";
import { FaLock, FaTrash, FaUser } from "react-icons/fa";
import { Helmet } from "react-helmet";
import DeleteAccountTab from "../Components/DeleteAccountTab.jsx";
import UpdatePasswordTab from "../Components/UpdatePasswordTab.jsx";
import UpdateProfileTab from "../Components/UpdateProfileTab.jsx";

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("profile");

  const tabs = [
    { id: "profile", icon: <FaUser />, label: "Profile Section" },
    { id: "password", icon: <FaLock />, label: "Update Password" },
    { id: "delete", icon: <FaTrash />, label: "Delete Account" },
  ];

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
          <div
            className={`shadow-2xl ${
              selectedTab === "delete" ? "shadow-red-700" : "shadow-teal-700"
            } rounded-xl`}
          >
            {/* Profile Tab */}
            <UpdateProfileTab selectedTab={selectedTab}/>

            {/* Update Password Tab */}
            <UpdatePasswordTab selectedTab={selectedTab} />

            {/* Delete Account Tab */}
            <DeleteAccountTab selectedTab={selectedTab} />

            {/* MOve above */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

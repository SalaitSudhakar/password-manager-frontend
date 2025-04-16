import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaCheck,
  FaCopy,
  FaEdit,
  FaExternalLinkAlt,
  FaEye,
  FaEyeSlash,
  FaTrash,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "./../services/axiosConfig";
import PulseLoader from "react-spinners/PulseLoader";

const PasswordPage = () => {
  const { passwordId } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [copiedField, setCopiedField] = useState(""); // 'username' | 'password'

  const navigate = useNavigate();

  const copyToClipboard = (value, type) => {
    navigator.clipboard.writeText(value);
    setCopiedField(type);

    // Reset icon after 2 seconds
    setTimeout(() => setCopiedField(""), 2000);
  };

  const fetchData = async () => {
    try {
      setIsPageLoading(true);
      const response = await api.get(`password/get-password/${passwordId}`);
      const data = response?.data?.password;
      console.log(data)
      if (data) setPasswordData(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Fetching Data");
    } finally {
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditButtonClick = (e) => {
    e.preventDefault();
    navigate(`/passwords/edit/${passwordData._id}`);
  };

  const handleDeleteButtonClick = async (e) => {
    e.preventDefault();
    try {
      const response = await api.delete(
        `/password/delete/${passwordData._id}`
      );
      toast.success(response.data.message);
      setPasswordData("")
      navigate("/passwords")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <>
      {isPageLoading ? (
        <div className="absolute inset-0 w-full min-h-screen bg-black/20 backdrop-blur-sm flex items-center justify-center">
          <PulseLoader size={25} color={"#14b8a6"} />
        </div>
      ) : (
        <div className="max-w-xl mx-auto m-10 p-6 bg-white rounded-xl shadow-lg shadow-teal-800">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-3 items-center justify-center">
              <Link
                to={"/passwords"}
                className="p-2 hover:bg-gray-200 rounded-full"
                title="Go to password list"
              >
                <FaArrowLeft size={20} />
              </Link>
              <h1 className="text-2xl font-bold text-gray-800 capitalize my-4">
                {passwordData.siteName}
              </h1>
            </div>
            <div className="flex space-x-2">
              <button
                className="p-2 cursor-pointer text-blue-600 hover:bg-blue-50 rounded-full"
                title="Edit"
                onClick={handleEditButtonClick}
              >
                <FaEdit size={20} />
              </button>
              <button
                className="p-2 cursor-pointer text-red-600 hover:bg-red-50 rounded-full"
                title="Delete"
                onClick={handleDeleteButtonClick}
              >
                <FaTrash size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {/* URL */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Website URL
              </label>
              <div className="flex items-center">
                <Link
                  to={passwordData.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-800 break-all flex-grow"
                >
                  {passwordData.siteUrl}
                </Link>
              </div>
            </div>

            {/* Username */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Username
              </label>
              <div className="flex items-center">
                <span className="text-gray-800 break-all font-medium flex-grow">
                  {passwordData?.username || "NA"}
                </span>
                <div className="relative">
                  <button
                    onClick={() =>
                      copyToClipboard(passwordData.username, "username")
                    }
                    className="ml-2 cursor-pointer text-gray-400 hover:text-gray-600"
                    title="Copy username"
                  >
                    {copiedField === "username" ? (
                      <FaCheck className="text-green-600" />
                    ) : (
                      <FaCopy />
                    )}
                  </button>
                  {copiedField === "username" && (
                    <span className=" absolute -top-10 -left-10 text-xs p-1.5 bg-gray-200 text-teal-800">
                      Copied!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <div className="flex items-center">
                <span className="text-gray-800 break-all flex-grow">
                  {showPassword ? passwordData.password : "••••••••••••"}
                </span>
                <div className="relative">
                  <button
                    onClick={() =>
                      copyToClipboard(passwordData.password, "password")
                    }
                    className=" ml-2 text-gray-400 hover:text-gray-600"
                    title="Copy password"
                  >
                    {copiedField === "password" ? (
                      <FaCheck className="text-green-600" />
                    ) : (
                      <FaCopy />
                    )}
                  </button>
                  {copiedField === "password" && (
                    <span className=" absolute -top-10 -left-10 text-xs p-1.5 bg-gray-200 text-teal-800">
                      Copied!
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-gray-400 hover:text-blue-800"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
            </div>

            <hr className="border border-gray-200 my-5" />

            <h3 className="font-semibold text-lg text-gray-800">
              Additional Information
            </h3>

            {/* Category */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Category
              </label>
              <div className="bg-teal-50 text-teal-700 px-3 py-2 rounded-lg font-semibold w-fit shadow-sm">
                {passwordData?.category || "Uncategorized"}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-col mt-3">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {(passwordData?.tags || []).length > 0 ? (
                  passwordData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-amber-100 text-amber-700 px-3 py-1 text-sm rounded-full font-medium shadow-sm"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">No tags added</span>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="flex flex-col mt-4">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Notes
              </label>
              <div className="bg-gray-50 font-medium rounded-md text-gray-900 text-sm p-2">
                {passwordData?.notes || "NA"}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordPage;

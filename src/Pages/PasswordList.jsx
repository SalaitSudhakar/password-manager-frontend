import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaCopy,
  FaEdit,
  FaExternalLinkAlt,
  FaEye,
  FaEyeSlash,
  FaFilter,
  FaLock,
  FaPlus,
  FaSearch,
  FaTag,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "./../services/axiosConfig";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import { Helmet } from "react-helmet";

const PasswordList = () => {
  const [searchbarContent, setSearchbarContent] = useState("");
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [category, setCategory] = useState("all");
  const [passwords, setPasswords] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [copiedStatus, setCopiedStatus] = useState({});

  const categoryOptions = [
    "all",
    "personal",
    "social",
    "work",
    "banking",
    "entertainment",
    "shopping",
    "others",
  ];

  const fetchPasswords = async () => {
    try {
      setIsPageLoading(true);
      const response = await api.get("/password/get-passwords");
      setPasswords(response.data.passwords);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const thClasses =
    "px-4 py-3 text-left text-sm font-bold text-amber-500 uppercase tracking-wider border-b border-gray-200";
  const tdClasses = "px-4 py-3 whitespace-nowrap text-gray-800";

  const thContents = [
    {
      label: "Site Name",
      icon: <FaSearch size={15} className="inline mr-2" />,
    },
    {
      label: "Site URL",
      icon: <FaExternalLinkAlt size={15} className="inline mr-2" />,
    },
    { label: "Username", icon: <FaUser size={15} className="inline mr-2" /> },
    { label: "Password", icon: <FaLock size={15} className="inline mr-2" /> },
    { label: "Category", icon: <FaFilter size={15} className="inline mr-2" /> },
    { label: "Tags", icon: <FaTag size={15} className="inline mr-2" /> },
    { label: "Actions", icon: <FaEdit size={15} className="inline mr-2" /> },
  ];

  const togglePasswordVisibility = (passwordId) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [passwordId]: !prev[passwordId],
    }));
  };

  const handlePasswordDelete = async (passwordId) => {
    try {
      const response = await api.delete(`/password/delete/${passwordId}`);
      toast.success(response?.data?.message || "Password Deleted Successfully");
      fetchPasswords();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const filteredPasswords = passwords.filter((password) => {
    const search = searchbarContent.trim().toLowerCase();
    const matchesSearch =
      search === "" ||
      password.siteName?.toLowerCase().includes(search) ||
      password.siteUrl?.toLowerCase().includes(search) ||
      (password.tags &&
        password.tags.some((tag) => tag.toLowerCase().includes(search)));
    const matchesCategory =
      category === "all" || password.category === category;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = async (passwordId, password) => {
    try {
      await navigator.clipboard.writeText(password);
      setCopiedStatus((prev) => ({ ...prev, [passwordId]: true }));

      setTimeout(() => {
        setCopiedStatus((prev) => ({ ...prev, [passwordId]: false }));
      }, 1000);
    } catch (error) {
      toast.error("Failed to copy password");
    }
  };

  return (
    <>
      <Helmet>
        <title>Passwords - SafePass</title>
      </Helmet>
      {isPageLoading ? (
        <div className="absolute inset-0 w-full bg-black/20 backdrop-blur-sm flex items-center justify-center">
          <PulseLoader size={25} color={"#14b8a6"} />
        </div>
      ) : (
        <div className="p-4 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-teal-800">My Passwords</h1>
            <Link
              to="/passwords/add"
              className="flex gap-2 text-amber-100 font-semibold text-lg items-center justify-center p-2 px-3 bg-gradient-to-br from-teal-600 to-teal-800 rounded-lg shadow-sm shadow-amber-500 hover:shadow-md transition-all duration-200 hover:from-teal-700 hover:to-teal-900"
            >
              <FaPlus size={18} />
              Add New
            </Link>
          </div>

          {/* Filters */}
          <div className="relative flex flex-col sm:flex-row items-center gap-3 my-5 text-teal-700 w-full">
            <div className="relative w-full sm:w-2/3">
              <FaSearch
                size={16}
                className="absolute top-3 left-3 text-gray-500"
              />
              <input
                onChange={(e) => setSearchbarContent(e.target.value)}
                value={searchbarContent}
                placeholder="Search by site name, URL or tags"
                className="p-2 pl-10 text-gray-700 font-medium bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm w-full"
              />
            </div>
            <div className="relative w-full sm:w-1/3">
              <FaFilter
                size={16}
                className="absolute top-3 left-3 text-gray-500"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="pl-10 p-2 border text-gray-700 border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm capitalize w-full"
              >
                {categoryOptions.map((option) => (
                  <option key={option} value={option} className="capitalize">
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
            <table className="table-auto w-full border-collapse">
              <thead className="bg-teal-800">
                <tr>
                  {thContents.map((th, index) => (
                    <th key={index} className={thClasses}>
                      <div className="flex items-center">
                        {th.icon}
                        {th.label}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPasswords.length > 0 ? (
                  filteredPasswords.map((passwordData) => (
                    <tr
                      key={passwordData._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className={tdClasses}>
                        {passwordData.siteName || "N/A"}
                      </td>
                      <td className={tdClasses}>
                        {passwordData.siteUrl ? (
                          <a
                            href={passwordData.siteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                          >
                            {passwordData.siteUrl}
                            <FaExternalLinkAlt size={10} />
                          </a>
                        ) : (
                          <span className="text-gray-500">N/A</span>
                        )}
                      </td>
                      <td className={tdClasses}>
                        {passwordData.username || "NA"}
                      </td>
                      <td className={tdClasses}>
                        <div className="flex flex-col items-start gap-1 relative">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-700 font-mono">
                              {visiblePasswords[passwordData._id]
                                ? passwordData.password
                                : "••••••••"}
                            </span>
                            <button
                              onClick={() =>
                                togglePasswordVisibility(passwordData._id)
                              }
                              className="text-gray-500 hover:text-gray-700 cursor-pointer"
                              title="Toggle password visibility"
                            >
                              {visiblePasswords[passwordData._id] ? (
                                <FaEyeSlash size={14} />
                              ) : (
                                <FaEye size={14} />
                              )}
                            </button>

                            <div>
                              <button
                                onClick={() =>
                                  copyToClipboard(
                                    passwordData._id,
                                    passwordData.password
                                  )
                                }
                                className=" text-gray-400 hover:text-gray-600 cursor-pointer"
                                title="Copy password"
                              >
                                {copiedStatus[passwordData._id] ? (
                                  <FaCheck size={14} className="text-green-600"/>
                                ) : (
                                  <FaCopy size={14} />
                                )}
                              </button>
                              {copiedStatus[passwordData._id] && (
                                <span className="bg-gray-200 text-teal-800 font-semibold text-xs absolute -top-5 left-4 p-2 rounded-lg">
                                  Copied!
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className={tdClasses}>
                        <span className="px-2 py-1 text-xs font-medium rounded-full capitalize bg-teal-100 text-teal-800">
                          {passwordData.category}
                        </span>
                      </td>
                      <td className={tdClasses}>
                        <div className="flex flex-wrap gap-1">
                          {passwordData?.tags?.length > 0 ? (
                            passwordData.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="flex gap-1 items-center px-2 py-[3px] text-xs rounded-full bg-amber-100 text-amber-800 capitalize"
                              >
                                <FaTag size={10} /> {tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 text-xs">
                              No tags
                            </span>
                          )}
                        </div>
                      </td>
                      <td className={tdClasses}>
                        <div className="flex items-center">
                          <Link
                            title="Edit password"
                            to={`/passwords/edit/${passwordData._id}`}
                            className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-100 rounded-full"
                          >
                            <FaEdit size={16} />
                          </Link>
                          <button
                            onClick={() =>
                              handlePasswordDelete(passwordData._id)
                            }
                            title="delete password"
                            className="text-red-600 hover:text-red-800  p-2 hover:bg-red-100 rounded-full"
                          >
                            <FaTrash size={16} />
                          </button>
                          <Link
                            to={`/passwords/${passwordData._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Detailed Password page Link"
                            className="text-green-600 hover:text-green-800  p-2 hover:bg-green-100 rounded-full"
                          >
                            <FaExternalLinkAlt size={16} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      {passwords.length === 0 ? (
                        <div className="flex flex-col items-center">
                          <p className="mb-2">
                            No passwords found. Add your first password to get
                            started.
                          </p>
                          <Link
                            to="/passwords/add"
                            className="flex gap-2 text-teal-600 font-medium items-center"
                          >
                            <FaPlus size={14} />
                            Add Password
                          </Link>
                        </div>
                      ) : (
                        <p>
                          No matching passwords found. Try adjusting your search
                          or filter.
                        </p>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordList;

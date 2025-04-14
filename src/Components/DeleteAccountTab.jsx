import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import {
  apiRequestFail,
  apiRequestStart,
  logoutSuccess,
} from "../Redux/Slice/userSlice";
import api from "../services/axiosConfig";
import { toast } from "react-toastify";
import Modal from "../Components/Modal.jsx";
import { FaTrash } from "react-icons/fa";

const DeleteAccountTab = ({ selectedTab }) => {
  const { isLoading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const hanldeDeleteAccount = async (e) => {
    e.preventDefault();

    try {
      dispatch(apiRequestStart());
      const response = await api.delete("/user/delete");

      const data = response.data;

      toast.success(data.message);
      dispatch(logoutSuccess());
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something Went Wrong. Try Again!"
      );
      dispatch(apiRequestFail(error));
    }
  };

  return (
    <>
      <div
        className={`flex flex-col gap-2 ${
          selectedTab === "delete" ? "block" : "hidden"
        } p-8 `}
      >
        <div className=" border-l-4 border-red-500 text-gray-500 p-2 bg-red-400/15 mb-4">
          <h1 className="text-xl  text-red-500 flex gap-3 items-center mb-5 ">
            <FaTrash size={20} className="" />{" "}
            <span className="font-bold">
              Deleting Your Account is Permanent
            </span>
          </h1>
          <p>
            All your saved passwords will be deleted. You can never recover it.
          </p>
        </div>
        <div className="flex gap-2 flex-col">
          <h3 className="text-lg font-semibold text-gray-700 ">
            Delete Your Account
          </h3>
          <p className="text-gray-600">
            Before you proceed, please take a moment to consider the
            consequences of account deletion:
          </p>

          <ul className="list-disc pl-4 space-y-2 text-gray-600 mb-6">
            <li>All your personal information will be erased</li>
            <li>Your saved passwords will be lost</li>
            <li>This action cannot be undone</li>
          </ul>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="group mt-3 bg-gradient-to-r from-red-500 to-red-700 p-3 rounded-lg text-red-200 font-semibold transition-all duration-300 hover:from-red-600 hover:to-red-800 transform hover:scale-105 shadow-md hover:shadow-lg shadow-red-500 cursor-pointer"
        >
          Delete Account
        </button>
      </div>

      {/* Modal */}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={"Confirm Delete Your Account"}
      >
        <div className="flex flex-col">
          <p className="text-gray-600 py-2">
            Are you sure You want to delete your account forever?
          </p>

          <form className="py-2 flex flex-col gap-3">
            <p>
              Type{" "}
              <span className="uppercase text-gray-800 p-2 mb-4 font-semibold bg-gray-400">
                Delete
              </span>{" "}
              in the below box
            </p>
            <input
              onChange={(e) => setDeleteConfirmed(e.target.value)}
              type="text"
              name="delete"
              required
              className="border p-2 w-full text-gray-700 font-medium rounded-lg border-teal-700 focus:outline-teal-700"
            />
          </form>

          {error && (
            <p className="text-red-700 text-sm text-center my-1 ">
              {error?.response?.data?.message ||
                "Something Went Wrong. Try Again"}
            </p>
          )}

          <button
            disabled={isLoading || deleteConfirmed !== "DELETE"}
            onClick={hanldeDeleteAccount}
            className="group mt-3 bg-gradient-to-r from-red-500 to-red-700 p-3 rounded-lg text-white font-semibold transition-all duration-300 hover:from-red-600 hover:to-red-800 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? (
              <span className="flex justify-center items-center gap-2">
                <span>Loading</span> <ClipLoader color={"#A7F3D0"} size={25} />
              </span>
            ) : (
              "Delete Account"
            )}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteAccountTab;

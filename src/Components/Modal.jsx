import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs z-50"
      onClick={onClose}
    >
      <div
        className="bg-white  px-5 p-6 rounded-lg shadow-lg max-w-[350px] w-[96%] animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold  text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-red-500 p-2 hover:bg-gray-200 rounded-full "
          >
            <IoClose size={20} />
          </button>
        </div>

        <div className="mb-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaInfoCircle, FaLock } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
    <Helmet>
        <title>404 Page Not Found - SafePass</title>
      </Helmet>

      <div
        className={`bg-gray-50 min-h-screen flex items-center justify-center p-4 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
      >
        <div className="max-w-lg w-full px-6 py-12 bg-white rounded-lg shadow-xl">
          <div className="flex flex-col items-center">
            {/* Lock Icon with Animation */}
            <div className="mb-6 animate-bounce">
              <FaLock size={75} className="text-teal-700" />
            </div>

            {/* Error Code */}
            <h1 className="text-6xl font-bold text-teal-600 mb-4">404</h1>

            {/* Error Message */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Page Not Found
            </h2>
            <p className="text-gray-600 text-center mb-8">
              The secure location you're trying to access doesn't exist or has
              been moved to a different vault.
            </p>

            {/* Separator */}
            <div className="w-16 h-1 bg-teal-500 rounded mb-6"></div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-center gap-4 w-full">
              <Link
                to="/"
                className="py-3 px-6 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md shadow-md transition-colors duration-300 text-center"
              >
                Return to Home
              </Link>
              {isAuthenticated && (
                <Link
                  to="/passwords"
                  className="py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md shadow-md transition-colors duration-300 text-center"
                >
                  Search Passwords
                </Link>
              )}
            </div>

            {/* Security Reminder */}
            <div className="mt-8 w-full p-4 bg-teal-50 border border-teal-200 rounded-md">
              <p className="text-sm text-teal-800 font-medium flex items-center gap-2">
                <FaInfoCircle size={30} className="text-red-500" />
                Remember: We will never ask for your master password through
                email or other communications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;

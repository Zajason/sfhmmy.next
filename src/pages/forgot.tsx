import React, { useState } from "react";
import { useRouter } from "next/router";
import { Meteors } from "../components/meteorAnimation";
import { useTheme } from "../utils/ThemeContext";

const ForgotPassword = () => {
  const router = useRouter();
  const { theme } = useTheme();

  // State for the email, error message, and success message
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Set colors based on the theme
  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const cardBackgroundColor = theme === "dark" ? "bg-gray-900" : "bg-gray-200";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const inputBackgroundColor = theme === "dark" ? "bg-gray-700" : "bg-gray-300";
  const buttonBackgroundColor =
    theme === "dark" ? "bg-blue-500" : "bg-blue-600";
  const buttonHoverColor =
    theme === "dark" ? "hover:bg-blue-600" : "hover:bg-blue-700";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      // Here you would normally call your API for password reset,
      // e.g., await forgotPassword({ email });
      // For now, we simulate success:
      setMessage("Password reset link has been sent to your email.");

      // Redirect back to the sign in page after 3 seconds
      setTimeout(() => {
        router.push("/"); // Adjust this route if your sign in page is different
      }, 3000);
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className={`relative w-full h-screen overflow-hidden ${backgroundColor} flex justify-center items-center`}
    >
      {/* Background Meteor Animation */}
      <div className="absolute inset-0 z-0">
        <Meteors number={30} />
      </div>

      {/* Forgot Password Form Card */}
      <div
        className={`relative z-10 ${cardBackgroundColor} p-8 rounded-lg shadow-lg flex flex-col items-center`}
      >
        <h2 className={`${textColor} text-2xl mb-6`}>Forgot Password</h2>

        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        {message && (
          <div className="mb-4 text-green-500 text-sm">{message}</div>
        )}

        <form className="w-64" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className={`block ${textColor} text-sm font-bold mb-2`}
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 ${inputBackgroundColor} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full ${buttonBackgroundColor} ${textColor} font-bold py-2 px-4 rounded-lg ${buttonHoverColor}`}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

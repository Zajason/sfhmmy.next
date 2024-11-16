import React from "react";
import { useRouter } from "next/router"; // Use Next.js router
import { Meteors } from "../components/meteorAnimation"; // Adjust the path as needed
import { useTheme } from "../utils/ThemeContext"; // Ensure the path is correct

const SignIn = () => {
  const router = useRouter();
  const { theme } = useTheme();

  // Set colors based on the theme
  const backgroundColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const cardBackgroundColor = theme === "dark" ? "bg-gray-800" : "bg-gray-200";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const inputBackgroundColor = theme === "dark" ? "bg-gray-700" : "bg-gray-300";
  const buttonBackgroundColor =
    theme === "dark" ? "bg-blue-500" : "bg-blue-600";
  const buttonHoverColor =
    theme === "dark" ? "hover:bg-blue-600" : "hover:bg-blue-700";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Sign-in logic goes here

    // Navigate to the main page after successful sign-in
    router.push("/");
  };

  return (
    <div
      className={`relative w-full h-screen overflow-hidden ${backgroundColor} flex justify-center items-center`}
    >
      {/* Meteor Animation */}
      <div className="absolute inset-0 z-0">
        <Meteors number={30} />
      </div>

      {/* Sign-In Form Card */}
      <div
        className={`relative z-10 ${cardBackgroundColor} p-8 rounded-lg shadow-lg flex flex-col items-center`}
      >
        <h2 className={`${textColor} text-2xl mb-6`}>Sign In</h2>

        <form className="w-64" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className={`block ${textColor} text-sm font-bold mb-2`}
              htmlFor="name"
            >
              Username
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your username"
              className={`w-full px-3 py-2 ${inputBackgroundColor} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div className="mb-6">
            <label
              className={`block ${textColor} text-sm font-bold mb-2`}
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className={`w-full px-3 py-2 ${inputBackgroundColor} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <button
            type="submit"
            className={`w-full ${buttonBackgroundColor} ${textColor} font-bold py-2 px-4 rounded-lg ${buttonHoverColor}`}
          >
            Sign In
          </button>
        </form>

        {/* Not yet registered button -> navigate to register */}
        <button
          onClick={() => router.push("/register")}
          className="mt-4 text-blue-400 underline hover:text-blue-500"
        >
          Not yet registered?
        </button>
      </div>
    </div>
  );
};

export default SignIn;

import React from "react";
import { useRouter } from "next/router";
import { Meteors } from "../components/meteorAnimation";
import { useTheme } from "../utils/ThemeContext";

const EmailVerificationSent = () => {
  const router = useRouter();
  const { theme } = useTheme();

  // Determine styling based on theme
  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const cardBackgroundColor = theme === "dark" ? "bg-gray-900" : "bg-gray-200";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const subTextColor = theme === "dark" ? "text-gray-300" : "text-gray-700";

  return (
    <div
      className={`relative w-full h-screen overflow-hidden ${backgroundColor} flex justify-center items-center`}
    >
      {/* Meteor Animation in the background */}
      <div className="absolute inset-0 z-0">
        <Meteors number={30} />
      </div>

      {/* Verification Message Card */}
      <div
        className={`relative z-10 ${cardBackgroundColor} p-8 rounded-lg shadow-lg flex flex-col items-center`}
      >
        <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>
          Verification Email Sent
        </h1>
        <p className={`mb-6 ${subTextColor}`}>
          A verification email has been sent to your email address. Please check
          your inbox and follow the instructions to verify your account.
        </p>
        <button
          onClick={() => router.push("/signIn")}
          className={`px-4 py-2 ${textColor} font-bold rounded-lg border border-current hover:bg-blue-500 transition duration-300`}
        >
          Go to Sign In
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationSent;

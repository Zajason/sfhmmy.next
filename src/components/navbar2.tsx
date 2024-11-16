import React from "react";
import { useRouter } from "next/router"; // Replace useNavigate with useRouter
import { useTheme } from "../utils/ThemeContext"; // Ensure the path to ThemeContext is correct

const NavbarWithBack = () => {
  const router = useRouter(); // Use useRouter instead of useNavigate
  const { theme, toggleTheme } = useTheme();

  // Set colors based on the current theme
  const backgroundColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-100 p-2 ${backgroundColor} flex justify-between items-center`}
    >
      {/* Back button */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => router.push("/")} // Use router.push for navigation
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 mr-2 ${textColor}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className={textColor}>Back to Main</span>
      </div>

      {/* Theme Switcher */}
      <div className="flex items-center">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <div
            className={`w-11 h-6 rounded-full peer dark:bg-gray-700 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}
          ></div>
        </label>
        <span className={`ml-3 text-sm font-medium ${textColor}`}>
          {theme === "dark" ? "Dark Mode" : "Light Mode"}
        </span>
      </div>
    </nav>
  );
};

export default NavbarWithBack;

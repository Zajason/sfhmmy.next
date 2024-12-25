import React from "react";
import { useRouter } from "next/router";
import { useTheme } from "../utils/ThemeContext"; // Ensure the path to your ThemeContext is correct
import Image from "next/image";

const NavbarWithBack = () => {
  const router = useRouter();
  const { theme } = useTheme();

  // Set colors based on the current theme
  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-100 p-2 ${backgroundColor} flex justify-between items-center`}
    >
      {/* Back button */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => router.push("/")}
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

      {/* Profile icon */}
      <div
        className="flex items-center justify-center cursor-pointer"
        onClick={() => router.push("/profile")}
      >
        <Image
          src="/images/others/default.jpg" // Correct image path for Next.js
          alt="Profile"
          width={40}
          height={40}
          style={{
            borderRadius: "50%",
            filter: theme === "dark" ? "invert(0)" : "invert(1)",
          }}
        />
      </div>
    </nav>
  );
};

export default NavbarWithBack;

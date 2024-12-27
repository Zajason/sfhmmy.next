import React, { useState } from "react";
import { useTheme } from "../utils/ThemeContext";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  const { theme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoSrc =
    theme === "dark"
      ? "/images/others/Official Logo ΣΦΗΜΜΥ 16 for dark.png"
      : "/images/others/Official Logo ΣΦΗΜΜΥ 16 for white.png";

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/others/eng.jpg')" }}
      ></div>

      {/* Content Section */}
      <div className="absolute inset-0 flex items-center justify-start bg-black bg-opacity-70 text-white">
        <div className="w-1/2 h-full bg-black bg-opacity-70 flex flex-col justify-center pl-16">
          <h1 className="text-8xl font-bold">ΣΦΗΜΜΥ16</h1>
          <h2 className="text-5xl mt-4">Some Random Words</h2>
          <p className="text-2xl mt-8 pr-4">
            This is a random sentence to fill the space. Here's another random sentence.
          </p>
          <button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-10 py-2 rounded-md self-start">
          Περισσότερα
        </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

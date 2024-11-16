import React from "react";
import { Meteors } from "../components/meteorAnimation"; // Adjust path as needed
import { useTheme } from "../utils/ThemeContext.tsx"; // Ensure the path is correct
import Image from "next/image"; // Import Next.js Image component

const WelcomePageMobile = () => {
  const { theme } = useTheme();

  const backgroundColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = theme === "dark" ? "text-gray-300" : "text-blue-900";
  const logoSrc =
    theme === "dark"
      ? "/images/others/Official Logo ΣΦΗΜΜΥ 16 for dark.png"
      : "/images/others/Official Logo ΣΦΗΜΜΥ 16 for white.png";

  return (
    <div
      className={`relative w-full min-h-screen ${backgroundColor} overflow-hidden flex flex-col justify-start items-center pt-10 pb-10`}
    >
      {/* Meteor animation as background */}
      <div className="absolute inset-0 z-0">
        <Meteors number={30} />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-4">
          <Image
            src={logoSrc}
            alt="Logo"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>

        <div className={`text-center ${textColor} text-lg mb-1`}>
          <p>19-21 Απριλιου Κεντρο Συνεδριασεων ΑΠΘ</p>
        </div>

        <div className="flex items-center text-blue-400 text-sm mb-4">
          <a
            href="https://www.google.com/maps/place/Kapetan+Agra+4..."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2C8.13401 2 5 5.13401 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 10a2 2 0 100-4 2 2 0 000 4z"
              />
            </svg>
            Google Maps
          </a>
        </div>

        <div className={`text-sm italic text-center mb-1 ${textColor}`}>
          ΣΥΝΕΔΡΙΟ ΦΟΙΤΗΤΩΝ ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ ΚΑΙ ΜΗΧΑΝΙΚΩΝ ΥΠΟΛΟΓΙΣΤΩΝ
          2025
        </div>

        <div className={`text-sm italic text-center ${textColor}`}>
          "Building the future, one circuit at a time!"
        </div>
      </div>
    </div>
  );
};

export default WelcomePageMobile;

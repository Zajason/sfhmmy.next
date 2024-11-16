import React from "react";
import { Meteors } from "../components/meteorAnimation"; // Ensure the path is correct
import { useTheme } from "../utils/ThemeContext"; // Ensure the path is correct
import Image from "next/image"; // Import Next.js's Image component

const WelcomePage = () => {
  const { theme } = useTheme(); // Get the current theme

  const quote = "Building the future, one circuit at a time!";

  const greekQuote =
    "«Το Συνέδριο Φοιτητών Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών αποτελεί την αιχμή του δόρατος για την καινοτομία και τη γνώση στον τομέα της τεχνολογίας. Εδώ γεννιούνται ιδέες που αλλάζουν τον κόσμο.»";

  // Determine styles and image based on the theme
  const backgroundColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = theme === "dark" ? "text-gray-300" : "text-blue-900";
  const secondaryTextColor =
    theme === "dark" ? "text-gray-400" : "text-blue-700";
  const linkColor = theme === "dark" ? "text-blue-400" : "text-blue-600";
  const logoSrc =
    theme === "dark"
      ? "/images/others/Official Logo ΣΦΗΜΜΥ 16 for dark.png"
      : "/images/others/Official Logo ΣΦΗΜΜΥ 16 for white.png"; // Removed public/ prefix

  return (
    <div
      className={`relative w-full h-[50vh] ${backgroundColor} overflow-hidden flex items-center justify-between`}
    >
      {/* Meteor animation as background */}
      <div className="absolute inset-0 z-0">
        <Meteors number={30} />
      </div>

      {/* Logo on the left */}
      <div className="relative z-10 ml-8 flex-shrink-0">
        <Image
          src={logoSrc}
          alt="Logo"
          width={600}
          height={600}
          className="object-contain"
        />
      </div>

      <div className="relative z-10 text-left flex flex-col items-start justify-center mr-16 max-w-lg mt-16">
        <div className={`${textColor} text-lg flex flex-col mb-6`}>
          <p>{greekQuote}</p>
        </div>
        <div
          className={`${textColor} text-lg flex items-center space-x-2 mb-4`}
        >
          <span>19-21 Απριλιου Κεντρο Συνεδριασεων ΑΠΘ</span>
          <a
            href="https://www.google.com/maps/place/Kapetan+Agra+4..."
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkColor} flex items-center`}
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
          </a>
        </div>
        <p className={`${secondaryTextColor} text-sm italic`}>
          {
            "ΣΥΝΕΔΡΙΟ ΦΟΙΤΗΤΩΝ ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ ΚΑΙ ΜΗΧΑΝΙΚΩΝ ΥΠΟΛΟΓΙΣΤΩΝ 2025"
          }
        </p>
        <p className={`${secondaryTextColor} text-sm italic`}>{quote}</p>
      </div>
    </div>
  );
};

export default WelcomePage;

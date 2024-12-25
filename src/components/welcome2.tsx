import React, { useState } from "react";
import { BackgroundBeamsWithCollision } from "../components/backgroundBeams";
import { useTheme } from "../utils/ThemeContext";
import Image from "next/image";
import Link from "next/link";

const WelcomePageWithBeams = () => {
  const { theme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual login state

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
      : "/images/others/Official Logo ΣΦΗΜΜΥ 16 for white.png";

  return (
    <div
      className={`relative w-full h-screen ${backgroundColor} overflow-hidden`}
    >
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
        <div className="flex items-center justify-between px-8 py-2">
          {" "}
          {/* Adjusted padding */}
          {/* Logo */}
          <Link href="/">
            <Image
              src={logoSrc}
              alt="Logo"
              width={50}
              height={50}
              className="cursor-pointer"
            />
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 ml-8">
            <div className="w-full flex justify-evenly items-center">
              {/* About */}
              <Link href="/about">
                <span className="hover:text-blue-400 cursor-pointer">
                  About
                </span>
              </Link>

              {/* Conference Dropdown */}
              <div className="relative group">
                <span className="hover:text-blue-400 cursor-pointer flex items-center">
                  Συνέδριο
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
                <div className="absolute left-0 mt-2 py-2 w-48 bg-gray-800 rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Link href="/agenda">
                    <span className="block px-4 py-2 hover:bg-gray-700">
                      Πρόγραμμα
                    </span>
                  </Link>
                  <Link href="/papers">
                    <span className="block px-4 py-2 hover:bg-gray-700">
                      Εργασίες
                    </span>
                  </Link>
                  <Link href="/sponsors">
                    <span className="block px-4 py-2 hover:bg-gray-700">
                      Χορηγοί
                    </span>
                  </Link>
                  <Link href="/members">
                    <span className="block px-4 py-2 hover:bg-gray-700">
                      Οργανωτική Επιτροπή{" "}
                    </span>
                  </Link>
                  <Link href="/scientific-committee">
                    <span className="block px-4 py-2 hover:bg-gray-700">
                      Scientific Committee
                    </span>
                  </Link>
                </div>
              </div>

              {/* Activities Dropdown */}
              <div className="relative group">
                <span className="hover:text-blue-400 cursor-pointer flex items-center">
                  Activities
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
                <div className="absolute left-0 mt-2 py-2 w-48 bg-gray-800 rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Link href="/workshops">
                    <span className="block px-4 py-2 hover:bg-gray-700">
                      Workshops
                    </span>
                  </Link>
                  <Link href="/pre-sfhmmy">
                    <span className="block px-4 py-2 hover:bg-gray-700">
                      PreΣΦΗΜΜΥ
                    </span>
                  </Link>
                  <Link href="/career">
                    <span className="block px-4 py-2 hover:bg-gray-700">
                      Career@ΣΦΗΜΜΥ
                    </span>
                  </Link>
                </div>
              </div>

              {/* Past Events */}
              <Link href="/past-events">
                <span className="hover:text-blue-400 cursor-pointer">
                  Past Events
                </span>
              </Link>

              {/* Contact */}
              <Link href="/contact">
                <span className="hover:text-blue-400 cursor-pointer">
                  Contact
                </span>
              </Link>

              {/* Login */}
              {!isLoggedIn && (
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Background animation */}
      <div className="absolute inset-0 z-0">
        <BackgroundBeamsWithCollision>
          <></>
        </BackgroundBeamsWithCollision>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between h-full px-16 pt-12">
        {" "}
        {/* Adjusted padding-top */}
        {/* Logo on the left */}
        <div className="flex-shrink-0 mt-[-4rem]">
          <Image
            src={logoSrc}
            alt="Logo"
            width={600}
            height={600}
            className="object-contain"
          />
        </div>
        {/* Text content on the right */}
        <div className="text-left flex flex-col items-start justify-center max-w-lg mt-[-4rem]">
          <div className={`${textColor} text-lg flex flex-col mb-6`}>
            <p>{greekQuote}</p>
          </div>
          <div
            className={`${textColor} text-lg flex items-center space-x-2 mb-4`}
          >
            <span>19-21 Απριλίου Κέντρο Συνεδριάσεων ΑΠΘ</span>
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
    </div>
  );
};

export default WelcomePageWithBeams;

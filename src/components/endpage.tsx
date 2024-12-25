import React, { useState } from "react";
import { useTheme } from "../utils/ThemeContext";
import Image from "next/image";
import Link from "next/link";

const EngPage = () => {
  const { theme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoSrc =
    theme === "dark"
      ? "/images/others/Official Logo ΣΦΗΜΜΥ 16 for dark.png"
      : "/images/others/Official Logo ΣΦΗΜΜΥ 16 for white.png";

  return (
    <div className="relative w-full h-screen">
      <div
        className="absolute inset-0 -top-32 bg-cover bg-center h-[120%]"
        style={{ backgroundImage: "url('/images/others/eng.jpg')" }}
      ></div>
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full bg-black bg-opacity-50 text-white shadow-md z-50">
        <div className="flex items-center justify-between px-8 py-2">
          <Link href="/">
            <Image
              src={logoSrc}
              alt="Logo"
              width={50}
              height={50}
              className="cursor-pointer"
            />
          </Link>
          <div className="hidden md:flex flex-1 ml-8">
            <div className="w-full flex justify-evenly items-center">
              <Link href="/about">
                <span className="hover:text-blue-400 cursor-pointer">About</span>
              </Link>
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
                    <span className="block px-4 py-2 hover:bg-gray-700">Πρόγραμμα</span>
                  </Link>
                  <Link href="/papers">
                    <span className="block px-4 py-2 hover:bg-gray-700">Εργασίες</span>
                  </Link>
                  <Link href="/sponsors">
                    <span className="block px-4 py-2 hover:bg-gray-700">Χορηγοί</span>
                  </Link>
                  <Link href="/members">
                    <span className="block px-4 py-2 hover:bg-gray-700">Οργανωτική Επιτροπή</span>
                  </Link>
                  <Link href="/scientific-committee">
                    <span className="block px-4 py-2 hover:bg-gray-700">Scientific Committee</span>
                  </Link>
                </div>
              </div>
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
                    <span className="block px-4 py-2 hover:bg-gray-700">Workshops</span>
                  </Link>
                  <Link href="/pre-sfhmmy">
                    <span className="block px-4 py-2 hover:bg-gray-700">PreΣΦΗΜΜΥ</span>
                  </Link>
                  <Link href="/career">
                    <span className="block px-4 py-2 hover:bg-gray-700">Career@ΣΦΗΜΜΥ</span>
                  </Link>
                </div>
              </div>
              <Link href="/past-events">
                <span className="hover:text-blue-400 cursor-pointer">Past Events</span>
              </Link>
              <Link href="/contact">
                <span className="hover:text-blue-400 cursor-pointer">Contact</span>
              </Link>
              {!isLoggedIn && (
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-0 -top-32 w-1/2 h-[120%] bg-black bg-opacity-70 flex flex-col justify-start text-white pl-8 pt-[40vh]">
        <h1 className="text-8xl font-bold">ΣΦΗΜΜΥ16</h1>
        <h2 className="text-5xl mt-4">Some Random Words</h2>
        <p className="text-2xl mt-8 px-4">
          This is a random sentence to fill the space. Here's another random sentence.
        </p>
        <button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-[calc(33%)] py-2 rounded-md self-start">
          Περισσότερα
        </button>
      </div>
    </div>
  );
};

export default EngPage;

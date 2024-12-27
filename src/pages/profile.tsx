import React from "react";
import { Meteors } from "../components/meteorAnimation"; // Import Meteors animation component
import NavbarWithBack from "../components/navbar";
import { useTheme } from "../utils/ThemeContext"; // Adjust the path to where your useTheme hook is located

const ProfileView = () => {
  const { theme } = useTheme();

  // Set background and text color based on the theme
  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const cardBackgroundColor = theme === "dark" ? "bg-gray-800" : "bg-gray-200";

  // Mock user data for the profile
  const userData = {
    fullName: "Ιάσονας Ζακυνθινός",
    username: "Zajason",
    city: "Athens",
    semester: "5th Semester",
    university: "Εθνικό Μετσόβιο Πολυτεχνείο",
  };

  return (
    <div className={`min-h-screen ${backgroundColor}`}>
      {/* Use the NavbarWithBack at the top */}
      <NavbarWithBack />
      <div
        className={`relative w-full h-screen overflow-hidden ${backgroundColor} flex justify-center items-center`}
      >
        {/* Meteor animation as background */}
        <div className="absolute inset-0 z-0">
          <Meteors number={30} /> {/* Meteor animation */}
        </div>
        {/* Profile Information */}
        <div
          className={`relative z-10 ${cardBackgroundColor} p-8 rounded-lg shadow-lg w-full max-w-4xl flex flex-row items-center justify-between`}
        >
          {/* User Info */}
          <div className="w-2/3">
            <div className="mb-4">
              <label
                className={`block ${textColor} text-lg font-bold underline mb-2`}
              >
                Full Name
              </label>
              <p className={`${textColor} text-xl`}>{userData.fullName}</p>
            </div>
            <div className="mb-4">
              <label
                className={`block ${textColor} text-lg font-bold underline mb-2`}
              >
                Username
              </label>
              <p className={`${textColor} text-xl`}>{userData.username}</p>
            </div>
            <div className="mb-4">
              <label
                className={`block ${textColor} text-lg font-bold underline mb-2`}
              >
                City
              </label>
              <p className={`${textColor} text-xl`}>{userData.city}</p>
            </div>
            <div className="mb-4">
              <label
                className={`block ${textColor} text-lg font-bold underline mb-2`}
              >
                Semester
              </label>
              <p className={`${textColor} text-xl`}>{userData.semester}</p>
            </div>
            <div className="mb-4">
              <label
                className={`block ${textColor} text-lg font-bold underline mb-2`}
              >
                University
              </label>
              <p className={`${textColor} text-xl`}>{userData.university}</p>
            </div>
          </div>

          <div className="w-1/3 flex justify-center items-center">
            <img
              src="/images/others/qr.png"
              alt="User Barcode"
              className="w-48 h-48"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;

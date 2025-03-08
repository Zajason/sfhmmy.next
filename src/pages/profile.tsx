// src/pages/profile.tsx
import React, { useState } from "react";
import { Meteors } from "../components/meteorAnimation";
import { useTheme } from "../utils/ThemeContext";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileContent from "../components/profile/ProfileContent";
import { UserData } from "../components/profile/types";

const ProfileView = () => {
  const { theme } = useTheme();
  
  // Mock user data - in a real app would be fetched from an API
  const [userData, setUserData] = useState<UserData>({
    fullName: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    city: "Athens",
    university: "National Technical University of Athens",
    semester: "8",
    avatar: "/images/others/default.jpg",
    daysPresent: [1, 2, 3],
    registeredWorkshops: [
      "Introduction to Machine Learning",
      "Web Development with React",
      "Cloud Computing Basics"
    ]
  });
  
  // Theme colors
  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const cardBackgroundColor = theme === "dark" ? "bg-gray-800/90" : "bg-gray-100/90";
  const accentColor = theme === "dark" ? "bg-blue-600" : "bg-blue-500";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-300";
  const inputBg = theme === "dark" ? "bg-gray-700" : "bg-white";
  
  // Theme colors object to pass to components
  const themeColors = {
    backgroundColor,
    textColor,
    cardBackgroundColor,
    accentColor,
    borderColor,
    inputBg
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className={`min-h-screen ${backgroundColor}`}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === 'dark' ? 'dark' : 'light'}
      />
      
      <div className="container mx-auto px-4 py-16 relative">
        {/* Meteor animation as background */}
        <div className="absolute inset-0 z-0">
          <Meteors number={30} />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col md:flex-row gap-8 max-w-6xl mx-auto"
        >
          {/* Left Column - Profile Card */}
          <ProfileSidebar 
            userData={userData}
            setUserData={setUserData}
            themeColors={themeColors}
            theme={theme}
            itemVariants={itemVariants}
          />

          {/* Right Column - Details */}
          <ProfileContent 
            userData={userData}
            setUserData={setUserData}
            themeColors={themeColors}
            theme={theme}
            itemVariants={itemVariants}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileView;
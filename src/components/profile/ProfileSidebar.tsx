import React from "react";
import { motion } from "framer-motion";
import { ThemeColors, UserData } from "./types";
import AvatarUpload from "./AvatarUpload";
import QrCodeDisplay from "./QrCodeDisplay";

interface ProfileSidebarProps {
    userData: UserData;
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
    themeColors: ThemeColors;
    theme: string;
    itemVariants: any;
}

// Then in the component function
const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ 
    userData, 
    setUserData, 
    themeColors, 
    theme, 
    itemVariants
}) => {
    const { cardBackgroundColor, textColor } = themeColors;
    const isEligibleForCertificate = userData.daysPresent.length >= 2;

    return (
        <motion.div 
            variants={itemVariants}
            className={`${cardBackgroundColor} p-8 rounded-xl shadow-xl w-full md:w-1/3 backdrop-blur-sm`}
        >
            <div className="flex flex-col items-center">
                {/* Avatar Upload Component */}
                <AvatarUpload 
                    userData={userData} 
                    setUserData={setUserData} 
                    themeColors={themeColors} 
                />

                {/* User Name */}
                <h1 className={`${textColor} text-2xl font-bold text-center`}>
                    {userData.fullName}
                </h1>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"} mb-6`}>
                    @{userData.username}
                </p>

                {/* Days Badge */}
                <div className="mb-8">
                    <h3 className={`${textColor} text-center font-semibold mb-2`}>Event Days</h3>
                    <div className="flex justify-center gap-2">
                        {[1, 2, 3].map((day) => (
                            <div key={day} 
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            userData.daysPresent.includes(day) 
                                ? theme === "dark" 
                                    ? "bg-green-700 text-white" 
                                    : "bg-green-100 text-green-800"
                                : theme === "dark" 
                                    ? "bg-gray-800 text-gray-500" 
                                    : "bg-gray-200 text-gray-500"
                        }`}
                            >
                        {day}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-center mt-2 gap-2">
                        {isEligibleForCertificate ? (
                            <>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="25" 
                                    height="25" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    className="text-green-500"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="m9 12 2 2 4-4"></path>
                                </svg>
                                <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    Eligible for certificate
                                </p>
                            </>
                        ) : (
                            <>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="25" 
                                    height="25" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    className="text-red-500"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="m15 9-6 6"></path>
                                    <path d="m9 9 6 6"></path>
                                </svg>
                                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                    Participate in 2+ days to receive a certificate
                                </p>
                            </>
                        )}
                    </div>
                </div>

                {/* QR Code Component */}
                <QrCodeDisplay 
                    themeColors={themeColors} 
                    theme={theme}
                />
            </div>
        </motion.div>
    );
};

export default ProfileSidebar;
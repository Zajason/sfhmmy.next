import React from "react";
import { motion } from "framer-motion";
import { ThemeColors, UserData } from "./types";
import PersonalInformation from "./PersonalInformation";
import PasswordChange from "./PasswordChange";
import WorkshopsList from "./WorkshopsList";
import CvUpload from "./CvUpload";

interface ProfileContentProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  themeColors: ThemeColors;
  theme: string;
  itemVariants: any;
}

const ProfileContent: React.FC<ProfileContentProps> = ({
  userData,
  setUserData,
  themeColors,
  theme,
  itemVariants
}) => {
  const { cardBackgroundColor } = themeColors;

  return (
    <motion.div 
      variants={itemVariants}
      className={`${cardBackgroundColor} p-8 rounded-xl shadow-xl w-full md:w-2/3 backdrop-blur-sm`}
    >
      {/* Personal Information Section */}
      <PersonalInformation 
        userData={userData}
        setUserData={setUserData}
        themeColors={themeColors}
        theme={theme}
      />

      {/* Password Change Section */}
      <PasswordChange 
        themeColors={themeColors}
        theme={theme}
      />

      {/* Workshops Section */}
      <WorkshopsList 
        userData={userData}
        setUserData={setUserData}
        themeColors={themeColors}
        theme={theme}
      />

      {/* CV Upload Section */}
      <CvUpload 
        themeColors={themeColors}
        theme={theme}
      />
    </motion.div>
  );
};

export default ProfileContent;
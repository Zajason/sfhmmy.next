import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { ThemeColors, UserData, defaultUserData } from "./types";

interface WorkshopsListProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  themeColors: ThemeColors;
  theme: string;
}

const WorkshopsList: React.FC<WorkshopsListProps> = ({ 
  userData = defaultUserData,
  setUserData, 
  themeColors, 
  theme 
}) => {
  const [isEditingWorkshops, setIsEditingWorkshops] = useState(false);
  const { textColor, borderColor } = themeColors;
  
  const registeredWorkshops = userData?.registeredWorkshops ?? [];

  const handleRemoveWorkshop = (indexToRemove: number) => {
    if (!userData) return;
    
    const updatedWorkshops = registeredWorkshops.filter((_, index) => index !== indexToRemove);
    
    setUserData({
      ...userData,
      registeredWorkshops: updatedWorkshops
    });
    
    toast.success('Workshop removed successfully');
  };

  const toggleEditWorkshops = () => {
    setIsEditingWorkshops(!isEditingWorkshops);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className={`${textColor} text-xl font-bold border-b ${borderColor} pb-2 flex-grow`}>
          Registered Workshops
        </h2>
        
        {registeredWorkshops.length > 0 && (
          <button
            onClick={toggleEditWorkshops}
            className={`ml-4 px-3 py-1 rounded-md ${
              isEditingWorkshops 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : `${theme === "dark" ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${textColor}`
            } transition-colors text-sm font-medium`}
          >
            {isEditingWorkshops ? 'Done' : 'Edit'}
          </button>
        )}
      </div>
      
      {registeredWorkshops.length > 0 ? (
        <ul className="space-y-2">
          {registeredWorkshops.map((workshop, index) => (
            <li 
              key={index}
              className={`p-3 rounded-lg ${theme === "dark" ? "bg-blue-900/20" : "bg-blue-50"} border ${theme === "dark" ? "border-blue-800" : "border-blue-100"}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span className={`${theme === "dark" ? "text-blue-300" : "text-blue-700"}`}>
                    {workshop}
                  </span>
                </div>
                
                {isEditingWorkshops && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => handleRemoveWorkshop(index)}
                    className="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                    title="Remove workshop"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </motion.button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} italic`}>
          You haven't registered for any workshops yet.
        </p>
      )}
    </div>
  );
};

export default WorkshopsList;
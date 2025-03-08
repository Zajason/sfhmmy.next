import React, { useState } from "react";
import { toast } from "react-toastify";
import { ThemeColors, UserData } from "./types";

interface PersonalInformationProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  themeColors: ThemeColors;
  theme: string;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({ 
  userData, 
  setUserData, 
  themeColors, 
  theme 
}) => {
  const [editField, setEditField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const { textColor, borderColor, inputBg } = themeColors;

  // Edit field handler - Start editing
  const handleEdit = (field: string) => {
    setEditField(field);
    setEditValue(userData[field]);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditField(null);
    setEditValue("");
  };

  // Save edited field value
  const handleSaveEdit = async (field: string) => {
    try {
      // Update local state
      setUserData({
        ...userData,
        [field]: editValue
      });
      
      // Exit edit mode
      setEditField(null);
      setEditValue("");
      
      // Show success message
      toast.success(`${field} updated successfully!`);
    } catch (error) {
      toast.error(`Error updating ${field}: ${error.message}`);
    }
  };

  // Render field (either as text or input when editing)
  const renderField = (field: string, label: string) => {
    const isEditing = editField === field;
    
    return (
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className={`block text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            {label}
          </label>
          
          {isEditing ? (
            <div className="flex space-x-2">
              <button 
                onClick={() => handleSaveEdit(field)}
                className="text-green-500 hover:text-green-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
              <button 
                onClick={handleCancelEdit}
                className="text-red-500 hover:text-red-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <button 
              onClick={() => handleEdit(field)}
              className="text-blue-500 hover:text-blue-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          )}
        </div>
        
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={`w-full ${inputBg} ${textColor} px-3 py-2 rounded-md border ${borderColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            autoFocus
          />
        ) : (
          <p className={`${textColor} font-medium`}>{userData[field]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="mb-8">
      <h2 className={`${textColor} text-xl font-bold mb-4 border-b ${borderColor} pb-2`}>
        Personal Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderField('fullName', 'Full Name')}
        {renderField('username', 'Username')}
        {renderField('email', 'Email')}
        {renderField('city', 'City')}
        {renderField('university', 'University')}
        {renderField('semester', 'Semester')}
      </div>
    </div>
  );
};

export default PersonalInformation;
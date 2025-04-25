import React, { useState } from "react";
import { toast } from "react-toastify";
import { ThemeColors, UserData } from "./types";
import { updateUserProfile } from "../../apis/services/profileService";
import { resendVerificationEmail } from "../../apis/services/authService";

interface PersonalInformationProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  themeColors: ThemeColors;
  theme: string;
}

// Define the field mappings with proper typing
type FieldMappings = {
  [key in 'fullName' | 'email' | 'city' | 'university' | 'year' | 'school']: string;
};

// Define which fields can be edited
const EDITABLE_FIELDS = ['fullName', 'city', 'university', 'year', 'school'];

// Helper function to format date
const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { // Or use 'el-GR' for Greek locale
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  userData,
  setUserData,
  themeColors,
  theme
}) => {
  const [editField, setEditField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { textColor, borderColor, inputBg } = themeColors;

  // Edit field handler - Start editing
  const handleEdit = (field: string) => {
    if (field === 'email') {
      toast.error("Email cannot be edited.");
      return;
    }
    setEditField(field);
    // Type check before accessing userData
    if (field in userData) {
      setEditValue(userData[field as keyof UserData] as string);
    }
  };

  // Resend verification email
  const handleResendVerification = async () => {
    try {
      await resendVerificationEmail();
    } catch (error) {
      console.error("Error resending verification email:", error);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditField(null);
    setEditValue("");
  };

  // Save edited field value
  const handleSaveEdit = async (field: string) => {
    if (field === 'email') {
      toast.error("Email cannot be updated.");
      return;
    }
    try {
      setIsUpdating(true);
      
      // Create update payload based on the field being edited
      // Map component field names to API field names
      const fieldMappings: FieldMappings = {
        'fullName': 'name',
        'email': 'email',
        'city': 'city',
        'university': 'university',
        'year': 'year',
        'school': 'school'
      };
      
      // Type check the field before accessing mappings
      const apiField = field in fieldMappings 
        ? fieldMappings[field as keyof FieldMappings] 
        : field;
      
      // Create payload with only the updated field
      // Add required fields that the API expects
      
      const updatePayload = {
        name: userData.fullName,
        email: userData.email,
        university: userData.university,
        year: userData.year, // Convert number to string
        school: userData.school || userData.university,
        city: userData.city, 
        [apiField]: editValue
      };
      
      // Call the API
      await updateUserProfile(updatePayload);
      
      // Update local state with type checking
      if (field in userData) {
        setUserData({
          ...userData,
          [field]: editValue
        });
      }
      
      // Exit edit mode
      setEditField(null);
      setEditValue("");
      
      // Show success message
      toast.success(`${field} updated successfully!`);
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      toast.error(`Error updating ${field}. Please try again.`);
    } finally {
      setIsUpdating(false);
    }
  };

  // Render field (either as text or input when editing)
  const renderField = (field: string, label: string) => {
    const isEditing = editField === field;
    const isEditable = EDITABLE_FIELDS.includes(field);
    const value = field in userData ? String(userData[field as keyof UserData] ?? "") : "";

    return (
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className={`block text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            {label}
          </label>

          {isEditing ? (
            <div className="flex space-x-2">
              {/* Save/Cancel Buttons */}
              <button
                onClick={() => handleSaveEdit(field)}
                className="text-green-500 hover:text-green-600"
                disabled={isUpdating}
              >
                {/* Save Icon/Spinner */}
                {isUpdating ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                )}
              </button>
              <button
                onClick={handleCancelEdit}
                className="text-red-500 hover:text-red-600"
                disabled={isUpdating}
              >
                {/* Cancel Icon */}
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          ) : (
            <>
              {/* Edit Button */}
              {isEditable && (
                <button
                  onClick={() => handleEdit(field)}
                  className="text-blue-500 hover:text-blue-600"
                >
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
              )}
              {/* Email Verification Status */}
              {field === 'email' && (
                <div className={`ml-2 text-xs inline-flex items-center ${userData.emailVerified ? 'text-green-500' : 'text-red-500'}`}>
                  {userData.emailVerified ? (
                    <>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      <span>Verified</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span>Unverified</span>
                      <button
                        onClick={handleResendVerification}
                        className="ml-2 text-blue-500 hover:underline"
                      >
                        Resend
                      </button>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {isEditing ? (
          <input
            type={field === 'year' ? 'number' : 'text'} // Use number input for year
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={`w-full ${inputBg} ${textColor} px-3 py-2 rounded-md border ${borderColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            autoFocus
            disabled={isUpdating}
          />
        ) : (
          <p className={`${textColor} font-medium`}>
            {value}
          </p>
        )}
      </div>
    );
  };

  // Render non-editable field (like Member Since)
  const renderStaticField = (label: string, value: string | undefined) => {
    return (
      <div>
        <label className={`block text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mb-1`}>
          {label}
        </label>
        <p className={`${textColor} font-medium`}>
          {value || "N/A"}
        </p>
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
        {renderField('email', 'Email')}
        {renderField('city', 'City')}
        {renderField('university', 'University')}
        {renderField('school', 'School')}
        {renderField('year', 'Year')}
        {/* Add the Member Since field */}
        {renderStaticField('Account Created Since', formatDate(userData.created_at))}
      </div>
    </div>
  );
};

export default PersonalInformation;
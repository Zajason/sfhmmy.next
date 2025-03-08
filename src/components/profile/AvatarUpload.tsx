import React, { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { ThemeColors, UserData } from "./types";

interface AvatarUploadProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  themeColors: ThemeColors;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ userData, setUserData, themeColors }) => {
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const { borderColor } = themeColors;

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type (image only)
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
      toast.error('Please upload an image file (JPEG, PNG, GIF, or WEBP)');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size must be less than 2MB');
      return;
    }

    setIsUploadingAvatar(true);

    try {
      // Create a temporary URL for the image to display it immediately
      const imageUrl = URL.createObjectURL(file);
      
      // Mock successful upload
      setTimeout(() => {
        setUserData({
          ...userData,
          avatar: imageUrl
        });
        setIsUploadingAvatar(false);
        toast.success('Profile picture updated successfully!');
      }, 1000);
    } catch (error) {
      toast.error(`Error uploading image: ${error.message}`);
      setIsUploadingAvatar(false);
    }
  };

  const triggerAvatarInput = () => {
    if (avatarInputRef.current) {
      avatarInputRef.current.value = '';
      avatarInputRef.current.click();
    }
  };

  const handleDeleteAvatar = () => {
    // Check if already using default avatar
    if (userData.avatar === "/images/others/default.jpg") {
      toast.info("You're already using the default avatar");
      return;
    }
  
    // Show loading state
    setIsUploadingAvatar(true);
  
    try {
      // Mock successful deletion with a short delay
      setTimeout(() => {
        setUserData({
          ...userData,
          avatar: "/images/others/default.jpg" // Reset to default avatar
        });
        setIsUploadingAvatar(false);
        toast.success('Avatar reset to default successfully!');
      }, 800);
    } catch (error) {
      toast.error(`Error resetting avatar: ${error.message}`);
      setIsUploadingAvatar(false);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={avatarInputRef}
        onChange={handleAvatarUpload}
        className="hidden"
        accept="image/jpeg,image/png,image/gif,image/webp"
      />

      <div className={`rounded-full overflow-hidden border-4 ${borderColor} h-44 w-44 relative mb-6 group`}>
        {isUploadingAvatar ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <>
            <Image
              src={userData.avatar}
              alt={userData.fullName}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={triggerAvatarInput}
                className="text-white hover:text-blue-200 mb-4"
              >
                <div className="flex flex-col items-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-xs mt-1">Upload</span>
                </div>
              </button>
              
              {userData.avatar !== "/images/others/default.jpg" && (
                <button
                  onClick={handleDeleteAvatar}
                  className="text-white hover:text-red-300"
                >
                  <div className="flex flex-col items-center">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="text-xs mt-1">Reset</span>
                  </div>
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AvatarUpload;
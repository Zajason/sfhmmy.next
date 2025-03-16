import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Meteors } from "../components/meteorAnimation";
import { useTheme } from "../utils/ThemeContext";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileContent from "../components/profile/ProfileContent";
import { UserData, defaultUserData } from "../components/profile/types";
import { getUserProfile, getUserQrCode } from "../apis/AuthApi";
import { useAuth } from "../context/authContext";

const ProfileView = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  
  // Use defaultUserData as initial state
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  
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

  // Fetch user profile data from API
  useEffect(() => {
    // Check if we have a token before making API requests
    const token = localStorage.getItem("authToken");
    
    if (!token || !isSignedIn) {
      console.log("No auth token or not signed in, redirecting to login");
      router.push('/signIn');
      return;
    }

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        
        // Wait a bit to make sure token is properly set
        // This can help with race conditions on page load
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Fetch profile data with debug info
        console.log("Fetching profile data...");
        const profileData = await getUserProfile();
        console.log("Profile data received:", profileData);
        
        // For development, if your API isn't ready, you can mock the response:
        // const profileData = { 
        //   user: {
        //     name: "Demo User",
        //     username: "demouser",
        //     email: "demo@example.com",
        //     city: "Athens",
        //     university: "Athens University",
        //     year: "3rd Year",
        //     days_present: [1, 2],
        //     registered_workshops: ["Workshop 1", "Workshop 2"]
        //   }
        // };
        
        // Map API response to our UserData interface
        const mappedUserData: UserData = {
          fullName: profileData.user.name || '',
          username: profileData.user.username || profileData.user.email.split('@')[0],
          email: profileData.user.email || '',
          city: profileData.user.city || '',
          university: profileData.user.university || '',
          year: profileData.user.year || '',
          avatar: profileData.user.avatar || '/images/others/default.jpg',
          daysPresent: profileData.user.days_present ? 
            Array.isArray(profileData.user.days_present) ? 
              profileData.user.days_present : 
              JSON.parse(profileData.user.days_present) : 
            [],
          registeredWorkshops: profileData.user.registered_workshops ? 
            Array.isArray(profileData.user.registered_workshops) ? 
              profileData.user.registered_workshops : 
              JSON.parse(profileData.user.registered_workshops) : 
            []
        };

        setUserData(mappedUserData);
        
        // Separately fetch QR code to handle binary data
        try {
          console.log("Fetching QR code...");
          const qrCode = await getUserQrCode();
          console.log("QR code received");
          setQrCodeUrl(qrCode);
        } catch (err) {
          console.error("Failed to load QR code:", err);
          toast.error("Could not load QR code");
        }

      } catch (error: any) {
        console.error("Error fetching profile:", error);
        
        // Show more detailed error to the user
        let errorMsg = "Failed to load profile data";
        if (error.response) {
          errorMsg += ` (${error.response.status}: ${error.response.statusText})`;
        }
        toast.error(errorMsg);
        
        // If unauthorized, redirect to login
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          localStorage.removeItem("authToken");
          toast.error("Your session has expired. Please log in again.");
          setTimeout(() => router.push('/signIn'), 2000);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isSignedIn, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className={`min-h-screen ${backgroundColor} flex items-center justify-center`}>
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
          <p className={`mt-4 ${textColor}`}>Loading profile...</p>
        </div>
      </div>
    );
  }

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
        <div className="absolute inset-0 z-0">
          <Meteors number={30} />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col md:flex-row gap-8 max-w-6xl mx-auto"
        >
          <ProfileSidebar 
            userData={userData}
            setUserData={setUserData}
            themeColors={themeColors}
            theme={theme}
            itemVariants={itemVariants}
            qrCodeUrl={qrCodeUrl}
          />

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
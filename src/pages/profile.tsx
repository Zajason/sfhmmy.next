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
import { checkEmailVerificationStatus, resendVerificationEmail } from "../apis/AuthApi";

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
        
        // First check if email is verified
        try {
          const verificationStatus = await checkEmailVerificationStatus();
          
          if (!verificationStatus.verified) {
            console.log("Email not verified, redirecting to verification page");
            
            // Send a verification email if none was sent in the last minute
            const lastSent = localStorage.getItem('lastVerificationEmailSent');
            const now = new Date();
            
            if (!lastSent || (now.getTime() - new Date(lastSent).getTime() > 60000)) {
              try {
                await resendVerificationEmail();
                localStorage.setItem('lastVerificationEmailSent', now.toString());
                toast.info("A verification email has been sent to your address");
              } catch (emailError) {
                console.error("Failed to send verification email:", emailError);
              }
            } else {
              toast.info("Please verify your email before accessing your account");
            }
            
            router.push('/emailVerification');
            return;
          }
        } catch (verificationError) {
          console.error("Error checking email verification:", verificationError);
          // Continue anyway and let the API call either succeed or fail
        }
        
        // Continue with profile data fetch
        console.log("Fetching profile data...");
        const profileData = await getUserProfile();
        
        // Map the response data to our UserData structure
        const mappedUserData: UserData = {
          fullName: profileData.user.name || '',
          username: profileData.user.username || profileData.user.email.split('@')[0],
          email: profileData.user.email || '',
          city: profileData.user.city || '',
          university: profileData.user.university || '',
          year: profileData.user.year || '',
          school: profileData.user.school || '',
          emailVerified: profileData.user.email_verified_at !== null,
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
            [],
          presence: profileData.user.presence || 0,
          userID: profileData.user.user_id || ''
        };
    
        setUserData(mappedUserData);
        
        // Rest of your code for QR code etc.
        
      } catch (error: any) {
        console.error("Error fetching profile:", error);
        
        // Handle verification errors with higher priority
        if (error.response && 
            error.response.status === 403 && 
            error.response.data && 
            typeof error.response.data.message === 'string' && 
            error.response.data.message.toLowerCase().includes('email')) {
          
          // Email verification error
          toast.error("Your email address needs to be verified");
          router.push('/emailVerification');
        } else if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          // Other authorization errors - likely invalid token
          localStorage.removeItem("authToken");
          toast.error("Your session has expired. Please sign in again.");
          setTimeout(() => router.push('/signIn'), 1500);
        } else {
          // Other errors
          let errorMsg = "Failed to load profile data";
          if (error.response) {
            errorMsg += ` (${error.response.status || 'Unknown'})`;
          }
          toast.error(errorMsg);
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
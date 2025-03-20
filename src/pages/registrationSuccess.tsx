import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Meteors } from "../components/meteorAnimation";
import { useTheme } from "../utils/ThemeContext";

const RegistrationSuccess: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const router = useRouter();
  const { theme } = useTheme();

  // Styling based on theme
  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const cardBackgroundColor = theme === "dark" ? "bg-gray-900" : "bg-gray-200";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const subTextColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  
  // Get email from session storage
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('pendingVerificationEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);
  
  // Skip countdown and go directly to verification page
  const handleContinue = () => {
    router.push('/emailVerification');
  };
  
  return (
    <>
      <Head>
        <title>Registration Successful - ΣΦΗΜΜΥ</title>
      </Head>
      
      <div className={`relative w-full min-h-screen overflow-hidden ${backgroundColor} flex justify-center items-center`}>
        <div className="absolute inset-0 z-0">
          <Meteors number={30} />
        </div>
        
        <div className="max-w-md w-full space-y-8 z-10 p-6">
          <div>
            <h2 className={`mt-6 text-center text-3xl font-extrabold ${textColor}`}>
              Registration Successful!
            </h2>
            <div className={`mt-4 text-center ${subTextColor}`}>
              <p className="mb-2">
                Thanks for registering. We've sent a verification email to:
              </p>
              <p className="font-semibold text-lg mb-4">
                {email || "your email address"}
              </p>
              
              <div className={`${cardBackgroundColor} p-6 rounded-md shadow-md mt-6`}>
                <h3 className={`text-lg font-medium mb-3 ${textColor}`}>
                  Next Steps
                </h3>
                <ul className="list-disc list-inside space-y-2 text-left text-sm">
                  <li>Check your email inbox for the verification link</li>
                  <li><strong>Important:</strong> If you don't see it, please check your spam or junk folder</li>
                  <li>Click the verification link in the email to activate your account</li>
                </ul>
                
                <div className="mt-6 flex flex-col space-y-3">
                  <button
                    onClick={handleContinue}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                  >
                    Continue to Verification
                  </button>
                  
                  <button
                    onClick={() => router.push('/')}
                    className="w-full bg-transparent border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium py-2 px-4 rounded-md transition duration-300"
                  >
                    Return to Home Page
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationSuccess;
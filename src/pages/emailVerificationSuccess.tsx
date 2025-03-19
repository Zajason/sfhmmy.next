import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { Meteors } from "../components/meteorAnimation";
import { useTheme } from "../utils/ThemeContext";

const EmailVerificationSuccess = () => {
  const router = useRouter();
  const { theme } = useTheme();
  
  // Determine styling based on theme
  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const cardBackgroundColor = theme === "dark" ? "bg-gray-900" : "bg-gray-200";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const subTextColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  
  useEffect(() => {
    // Show success toast
    toast.success('Email successfully verified!');
    
    // Get the redirect URL or default to home
    const redirectUrl = sessionStorage.getItem('redirectAfterVerification') || '/profile';
    
    // Clear the redirect URL
    sessionStorage.removeItem('redirectAfterVerification');
    
    // Redirect after a short delay
    const timer = setTimeout(() => {
      router.push(redirectUrl);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [router]);
  
  return (
    <>
      <Head>
        <title>Email Verified - ΣΦΗΜΜΥ</title>
      </Head>
      
      <div className={`relative w-full min-h-screen overflow-hidden ${backgroundColor} flex justify-center items-center`}>
        <div className="absolute inset-0 z-0">
          <Meteors number={30} />
        </div>
        
        <div className="max-w-md w-full space-y-8 z-10">
          <div>
            <h2 className={`mt-6 text-center text-3xl font-extrabold ${textColor}`}>
              Email Verified Successfully!
            </h2>
            <p className={`mt-2 text-center text-sm ${subTextColor}`}>
              Your email has been verified. You'll be redirected in a moment.
            </p>
          </div>
          
          <div className={`rounded-md shadow-sm ${cardBackgroundColor} p-6`}>
            <div className="flex flex-col items-center">
              <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              
              <button
                onClick={() => router.push('/profile')}
                className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Go to Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerificationSuccess; 
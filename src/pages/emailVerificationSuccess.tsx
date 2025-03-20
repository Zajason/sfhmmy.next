import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { Meteors } from "../components/meteorAnimation";
import { useTheme } from "../utils/ThemeContext";

const EmailVerificationSuccess = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [countdown, setCountdown] = useState(10);
  
  // Determine styling based on theme
  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const cardBackgroundColor = theme === "dark" ? "bg-gray-900" : "bg-gray-200";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const subTextColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  
  useEffect(() => {
    // Show success toast
    toast.success('Email successfully verified!');
    
    // Get the redirect URL or default to signIn
    const redirectUrl = sessionStorage.getItem('redirectAfterVerification') || '/signIn';
    
    // Clean up session storage
    sessionStorage.removeItem('redirectAfterVerification');
    sessionStorage.removeItem('pendingAuthToken');
    sessionStorage.removeItem('pendingVerificationEmail');
    
    // Set up countdown timer that also handles redirect
    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => {
        // If we're at 1, this will take us to 0
        if (prevCount <= 1) {
          // Clear the interval immediately
          clearInterval(countdownInterval);
          
          // Trigger redirect
          router.push(redirectUrl).then(() => {
            // Fallback: If navigation didn't work, force direct navigation
            setTimeout(() => {
              if (window.location.pathname !== redirectUrl && 
                  window.location.pathname !== '/signIn') {
                window.location.href = redirectUrl;
              }
            }, 500);
          });
          
          // Return 0 to update state one last time
          return 0;
        }
        
        // Normal decrement for other values
        return prevCount - 1;
      });
    }, 1000);
    
    // Clean up the interval when component unmounts
    return () => {
      clearInterval(countdownInterval);
    };
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
        
        <div className="max-w-md w-full space-y-8 z-10 p-4">
          <div>
            <h2 className={`mt-6 text-center text-3xl font-extrabold ${textColor}`}>
              Email Verified Successfully!
            </h2>
            <p className={`mt-2 text-center text-sm ${subTextColor}`}>
            Your email has been successfully verified. You'll be redirected to the sign-in page in <span className="font-bold text-blue-500">{countdown}</span> seconds so you can sign in.
            </p>
          </div>
          
          <div className={`rounded-md shadow-sm ${cardBackgroundColor} p-6`}>
            <div className="flex flex-col items-center">
              <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              
              {/* Progress bar for countdown */}
              <div className="w-full bg-gray-300 rounded-full h-2.5 mt-4 mb-2 dark:bg-gray-700">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-linear" 
                  style={{ width: `${(countdown / 10) * 100}%` }}
                ></div>
              </div>
              
              <button
                onClick={() => {
                  // Clear any tokens that might be lingering in session storage
                  sessionStorage.removeItem('pendingAuthToken');
                  sessionStorage.removeItem('pendingVerificationEmail');
                  
                  // First try router navigation
                  router.push('/signIn').then(() => {
                    // If we're still on the same page after a delay, use direct navigation
                    setTimeout(() => {
                      if (window.location.pathname !== '/signIn') {
                        window.location.href = '/signIn';
                      }
                    }, 300);
                  });
                }}
                className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Go to Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerificationSuccess;
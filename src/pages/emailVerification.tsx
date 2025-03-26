import React, { useState, useEffect, ReactElement } from 'react';
import { toast } from 'react-toastify';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Meteors } from "../components/meteorAnimation";
import { useTheme } from "../utils/ThemeContext";
import { resendVerificationEmail, checkEmailVerificationStatus } from '../apis/services/authService';
import { useAuth } from '../context/authContext';

interface VerificationResponse {
  success: boolean;
  message?: string;
  emailNotFound?: boolean;
  networkError?: boolean;
  tooManyRequests?: boolean;
  authError?: boolean;
  validationError?: boolean;
  verified?: boolean;
}

const EmailVerification: React.FC = () => {
  const [isResending, setIsResending] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [lastSent, setLastSent] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [userEmail, setUserEmail] = useState<string>('');
  const [showEmailInput, setShowEmailInput] = useState<boolean>(true);
  const router = useRouter();
  const { theme } = useTheme();
  const { isSignedIn } = useAuth();

  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const cardBackgroundColor = theme === "dark" ? "bg-gray-900" : "bg-gray-200";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const subTextColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const inputBg = theme === "dark" ? "bg-gray-800" : "bg-white";


  // Check if user is already verified and redirect if needed
  useEffect(() => {
    const checkVerificationStatus = async () => {
      try {
        setIsChecking(true);
        
        // If user is signed in, check verification status
        if (isSignedIn) {
          const token = localStorage.getItem('authToken');
          if (token !== null) {
            const verificationStatus = await checkEmailVerificationStatus(token);
            
            if (verificationStatus.verified) {
              toast.success('Your email is already verified');
              router.push('/profile');
              return;
            }
          }
        }
        
        // For users that aren't signed in but have a pending token
        const pendingToken = sessionStorage.getItem('pendingAuthToken');
        if (pendingToken) {
          try {
            const verificationStatus = await checkEmailVerificationStatus(pendingToken);
            if (verificationStatus.verified) {
              // Move token to localStorage for full access
              localStorage.setItem('authToken', pendingToken);
              sessionStorage.removeItem('pendingAuthToken');
              sessionStorage.removeItem('pendingVerificationEmail');
              toast.success('Your email has been verified!');
              router.push('/profile');
              return;
            }
          } catch (error) {
            console.log('Error checking pending verification, will show verification page', error);
          }
        }
      } catch (error) {
        console.error('Error checking verification status:', error);
      } finally {
        setIsChecking(false);
      }
    };
    
    checkVerificationStatus();
  }, [router, isSignedIn]);

  // Get email from session storage on component mount
  useEffect(() => {
    // Check if there's a stored timestamp for the last sent email (for any address)
    const lastSentStr = localStorage.getItem('lastVerificationEmailSent');
    if (lastSentStr) {
      const lastSent = new Date(lastSentStr);
      const now = new Date();
      const diffSeconds = Math.floor((now.getTime() - lastSent.getTime()) / 1000);
      
      if (diffSeconds < 60) {
        // If less than 60 seconds have passed, set remaining countdown
        setCountdown(60 - diffSeconds);
      }
    }

    // Get email from session storage
    const email = sessionStorage.getItem('pendingVerificationEmail');
    if (email) {
      setUserEmail(email);
      sessionStorage.removeItem('pendingVerificationEmail');
    }
  }, []);

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendVerification = async (isAutoSend = false): Promise<void> => {
    // Validate email before sending
    if (!userEmail || !userEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
  
    try {
      setIsResending(true);
      
      // Use the imported resendVerificationEmail function instead of API directly
      const result: VerificationResponse = await resendVerificationEmail(userEmail);
      
      if (result.success) {
        // Save the time when the verification email was sent
        const now = new Date();
        localStorage.setItem('lastVerificationEmailSent', now.toString());
        setLastSent(now);
        setCountdown(60); // Set countdown to 60 seconds
        
        // Switch to verification instructions view
        setShowEmailInput(false);
        
        // Store email in session storage for future reference
        sessionStorage.setItem('pendingVerificationEmail', userEmail);
        
        if (!isAutoSend) {
          toast.success('Verification email has been sent to your email address');
        } else {
          toast.info('A verification email has been automatically sent to your email address');
        }
      } else {
        // Handle error cases based on the returned result object
        if (result.emailNotFound) {
          toast.error(
            <div>
              Email address not found. 
              <button 
                onClick={() => router.push('/register')} 
                className="ml-2 underline text-blue-500"
              >
                Register now
              </button>
            </div>,
            { closeOnClick: false }
          );
          setShowEmailInput(true); // Show the email input form so they can correct it
        } else if (result.networkError) {
          toast.error('Network error. Please check your connection and try again.');
        } else if (result.tooManyRequests) {
          toast.warning('Please wait before requesting another email');
        } else if ('authError' in result && result.authError) {
          toast.error('Authentication error. Please try signing in again.');
        } else {
          toast.error(result.message || 'We were unable to send the verification email. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Error resending verification email:', error);
      toast.error('We were unable to send the verification email. Please try again later.');
    } finally {
      setIsResending(false);
    }
  };
  
  // Handle email input for manual entry
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserEmail(e.target.value);
  };
  
   // Handle form submission for manual email entry
  const handleSubmitEmail = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    // Validate email before sending
    if (!userEmail || !userEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    try {
      setIsResending(true);
      
      const result = await resendVerificationEmail(userEmail);
      
      if (result.success) {
        // Save the time when the verification email was sent
        const now = new Date();
        localStorage.setItem('lastVerificationEmailSent', now.toString());
        setLastSent(now);
        setCountdown(60); // Set countdown to 60 seconds
        
        // Switch to verification instructions view
        setShowEmailInput(false);
        
        // Store email in session storage for future reference
        sessionStorage.setItem('pendingVerificationEmail', userEmail);
        
        toast.success('Verification email has been sent to your email address');
      } else {
        // Handle error cases based on the returned result object
        if (result.emailNotFound) {
          toast.error(
            <div>
              Email address not found. 
              <button 
                onClick={() => router.push('/register')} 
                className="ml-2 underline text-blue-500"
              >
                Register now
              </button>
            </div>,
            { closeOnClick: false }
          );
        } else if (result.networkError) {
          toast.error('Network error. Please check your connection and try again.');
        } else if (result.tooManyRequests) {
          toast.warning('Please wait before requesting another email');
        } else if ('authError' in result && result.authError) {
          toast.error('Authentication error. Please try signing in again.');
        } else {
          toast.error(result.message || 'We were unable to send the verification email. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Error resending verification email:', error);
      toast.error('We were unable to send the verification email. Please try again later.');
    } finally {
      setIsResending(false);
    }
  };
  
  if (isChecking) {
    return (
      <div className={`${backgroundColor} w-full h-screen flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>Verify Email - ΣΦΗΜΜΥ</title>
      </Head>
      
      <div className={`relative w-full min-h-screen overflow-hidden ${backgroundColor} flex justify-center items-center`}>
        <div className="absolute inset-0 z-0">
          <Meteors number={30} />
        </div>
        
        <div className="max-w-md w-full space-y-8 z-10 p-4">
          <div>
            <h2 className={`mt-6 text-center text-3xl font-extrabold ${textColor}`}>
              Email Verification Required
            </h2>
            <p className={`mt-2 text-center text-sm ${subTextColor}`}>
              Your email address needs to be verified before you can access your profile.
            </p>
          </div>
          
          {showEmailInput ? (
            // Show form for manual email entry
            <div className={`rounded-md shadow-sm ${cardBackgroundColor} p-6`}>
              <form onSubmit={handleSubmitEmail} className="space-y-6">
                {/* Form content - unchanged */}
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium ${textColor}`}>
                    Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={userEmail}
                      onChange={handleEmailChange}
                      className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${inputBg} ${textColor}`}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isResending || countdown > 0}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      isResending || countdown > 0 ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    {isResending ? (
                      'Sending...'
                    ) : countdown > 0 ? (
                      `Send available in ${countdown}s`
                    ) : (
                      'Send Verification Email'
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            // Show verification instructions - unchanged
            <div className={`rounded-md shadow-sm ${cardBackgroundColor} p-6`}>
              <div className="flex flex-col items-center">
                {/* Verification instructions content - unchanged */}
                <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                
                <p className={`mt-4 text-center text-sm ${subTextColor}`}>
                  We've sent a verification email to {userEmail ? (
                    <span className="font-semibold">{userEmail}</span>
                  ) : (
                    'your registered email address'
                  )}. 
                  Click the link in the email to verify your account.
                </p>
                
                <div className="mt-4 w-full border-t border-gray-700 pt-4">
                  <h3 className={`text-center font-medium mb-2 ${textColor}`}>
                    Haven't received the email?
                  </h3>
                  
                  <ul className={`list-disc list-inside text-sm ${subTextColor} mb-4`}>
                    <li>Check your spam or junk folder</li>
                    <li>Make sure you entered the correct email address</li>
                    <li>Wait a few minutes for the email to arrive</li>
                  </ul>
                  
                  <button
                    onClick={() => handleResendVerification(false)}
                    disabled={isResending || countdown > 0}
                    className={`mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      isResending || countdown > 0 ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    {isResending ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : countdown > 0 ? (
                      `Resend available in ${countdown}s`
                    ) : (
                      'Resend Verification Email'
                    )}
                  </button>
                  
                  <button
                    onClick={() => setShowEmailInput(true)}
                    className={`mt-4 w-full flex justify-center py-2 px-4 border border-blue-300 rounded-md shadow-sm text-sm font-medium ${textColor} bg-transparent hover:bg-blue-600/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    Use different email address
                  </button>
                  
                  <button
                    onClick={() => router.push('/')}
                    className={`mt-2 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${textColor} hover:bg-gray-700/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    Return to Home
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmailVerification;
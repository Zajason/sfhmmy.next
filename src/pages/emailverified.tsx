import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Meteors } from "../components/meteorAnimation";
import { useTheme } from "../utils/ThemeContext";
import { verifyEmail } from "../apis/AuthApi";

const EmailVerificationPage: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { id, hash } = router.query; // Extract id and hash from the URL

  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const cardBackgroundColor = theme === "dark" ? "bg-gray-900" : "bg-gray-200";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const subTextColor = theme === "dark" ? "text-gray-300" : "text-gray-700";

  useEffect(() => {
    const verifyEmailToken = async () => {
      if (!id || !hash) return; // Ensure id and hash are present

      try {
        await verifyEmail(id as string, hash as string);
        console.log('Email verified successfully!');
        // Redirect the user or show a success message
        router.push('/'); // Example: Redirect to a success page
      } catch (error) {
        console.error('An error occurred during email verification:', error);
        // Handle the error, maybe show an error message to the user
        router.push('/email-verification-failed'); // Example: Redirect to a failure page
      }
    };

    verifyEmailToken();
  }, [id, hash, router]);

  return (
    <div
      className={`relative w-full h-screen overflow-hidden ${backgroundColor} flex justify-center items-center`}
    >
      {/* Meteor Animation in the background */}
      <div className="absolute inset-0 z-0">
        <Meteors number={30} />
      </div>

      {/* Verification Message Card */}
      <div
        className={`relative z-10 ${cardBackgroundColor} p-8 rounded-lg shadow-lg flex flex-col items-center`}
      >
        <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>
          Congratulations!
        </h1>
        <p className={`mb-6 ${subTextColor}`}>
          Email successfully verified. You can now sign in to your account.
        </p>
        <button
          onClick={() => router.push("/signIn")}
          className={`px-4 py-2 ${textColor} font-bold rounded-lg border border-current hover:bg-blue-500 transition duration-300`}
        >
          Go to Sign In
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
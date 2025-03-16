// pages/page/[id]/[hash].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Meteors } from "../../../components/meteorAnimation";
import { verifyEmail } from '../../../apis/AuthApi'; // Adjust the import path as needed
import { useTheme } from "../../../utils/ThemeContext";

const VerifyEmailPage: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { id, hash } = router.query; // Extract id and hash from the URL
  const [verificationStatus, setVerificationStatus] = useState<'success' | 'error' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const cardBackgroundColor = theme === "dark" ? "bg-gray-900" : "bg-gray-200";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const subTextColor = theme === "dark" ? "text-gray-300" : "text-gray-700";

  useEffect(() => {
    const verify = async () => {
      if (id && hash) {
        try {
          const data = await verifyEmail(id as string, hash as string);
          setVerificationStatus('success');
          console.log('Email verification successful:', data);
        } catch (error) {
          setVerificationStatus('error');
          setError((error as any).message || 'An error occurred');
          console.error('Email verification failed:', error);
        }
      }
    };

    verify();
  }, [id, hash]);

  if (!id || !hash) {
    return <p>Loading...</p>;
  }

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
  );;
};

export default VerifyEmailPage;

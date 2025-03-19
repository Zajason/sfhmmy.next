import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Meteors } from "../components/meteorAnimation";
import { useTheme } from "../utils/ThemeContext";
import { loginUser, checkEmailVerificationStatus } from "../apis/AuthApi";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SignIn = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { login, isLoading, isSignedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Theme variables
  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const cardBackgroundColor = theme === "dark" ? "bg-gray-900" : "bg-gray-200";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const inputBackgroundColor = theme === "dark" ? "bg-gray-700" : "bg-gray-300";
  const buttonBackgroundColor =
    theme === "dark" ? "bg-blue-500" : "bg-blue-600";
  const buttonHoverColor =
    theme === "dark" ? "hover:bg-blue-600" : "hover:bg-blue-700";

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
  
    try {
      // First, try to authenticate to get our token
      const result = await loginUser({ email, password });
      
      if (!result || !result.token) {
        throw new Error("No authentication token received");
      }
  
      console.log("Login result:", result);
      
      // Pass the token directly to the verification check
      const isVerified = await checkEmailVerificationStatus(result.token);
      
      if (isVerified.verified) {
        // Email is verified - NOW store token and complete the login process
        localStorage.setItem('authToken', result.token);
        login(result.token);
        toast.success("Successfully signed in!");
        router.push("/profile");
      } else {
        // Store token temporarily in sessionStorage for verification page
        sessionStorage.setItem('pendingAuthToken', result.token);
        
        // Store email in session storage so verification page can display it
        sessionStorage.setItem('pendingVerificationEmail', email);
        
        // Redirect to verification page
        toast.info("Please verify your email before continuing");
        router.push("/emailVerification");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className={`${backgroundColor} w-full h-screen flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-screen overflow-hidden ${backgroundColor} flex justify-center items-center`}>
      <div className="absolute inset-0 z-0">
        <Meteors number={30} />
      </div>

      <div className={`relative z-10 ${cardBackgroundColor} p-8 rounded-lg shadow-lg flex flex-col items-center`}>
        <h2 className={`${textColor} text-2xl mb-6`}>Sign In</h2>

        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        <form className="w-64" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block ${textColor} text-sm font-bold mb-2`} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 ${inputBackgroundColor} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>

          <div className="mb-6">
            <label className={`block ${textColor} text-sm font-bold mb-2`} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 ${inputBackgroundColor} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${buttonBackgroundColor} ${textColor} font-bold py-2 px-4 rounded-lg transition-all ${
              isSubmitting ? "opacity-75 cursor-not-allowed" : buttonHoverColor
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Signing In...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => router.push("/forgot")}
            className={`text-sm underline ${textColor} hover:text-blue-400 ${
              isSubmitting ? "cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
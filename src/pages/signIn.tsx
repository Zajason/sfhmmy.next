import React, { useState } from "react"; // Add useState
import { useRouter } from "next/router";
import { Meteors } from "../components/meteorAnimation";
import { useTheme } from "../utils/ThemeContext";
import { loginUser } from "../apis/AuthApi";
import { useMockAuth } from "../context/mockAuthContext"; // Add mockAuth context

const SignIn = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { setSignedIn } = useMockAuth(); // Get setSignedIn from context
  
  // Add state for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Set colors based on the theme
  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const cardBackgroundColor = theme === "dark" ? "bg-gray-900" : "bg-gray-200";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const inputBackgroundColor = theme === "dark" ? "bg-gray-700" : "bg-gray-300";
  const buttonBackgroundColor =
    theme === "dark" ? "bg-blue-500" : "bg-blue-600";
  const buttonHoverColor =
    theme === "dark" ? "hover:bg-blue-600" : "hover:bg-blue-700";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    
    try {
      // Use the mock login function (replace with real API when ready)
      await loginUser({ email, password });
      setSignedIn(true); // Update auth context state
      router.push('/'); // Redirect home
    } catch (error) {
      setError("Invalid username or password"); // Show error message
    }
  };

  

  return (
    <div
      className={`relative w-full h-screen overflow-hidden ${backgroundColor} flex justify-center items-center`}
    >
      {/* Meteor Animation */}
      <div className="absolute inset-0 z-0">
        <Meteors number={30} />
      </div>

      {/* Sign-In Form Card */}
      <div
        className={`relative z-10 ${cardBackgroundColor} p-8 rounded-lg shadow-lg flex flex-col items-center`}
      >
        <h2 className={`${textColor} text-2xl mb-6`}>Sign In</h2>

        {/* Display error message if any */}
        {error && (
          <div className="mb-4 text-red-500 text-sm">{error}</div>
        )}

        <form className="w-64" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className={`block ${textColor} text-sm font-bold mb-2`}
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email" // Changed to email type
              placeholder="Enter your email"
              value={email} // Connect to state
              onChange={(e) => setEmail(e.target.value)} // Update state
              className={`w-full px-3 py-2 ${inputBackgroundColor} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>

          <div className="mb-6">
            <label
              className={`block ${textColor} text-sm font-bold mb-2`}
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password} // Connect to state
              onChange={(e) => setPassword(e.target.value)} // Update state
              className={`w-full px-3 py-2 ${inputBackgroundColor} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full ${buttonBackgroundColor} ${textColor} font-bold py-2 px-4 rounded-lg ${buttonHoverColor}`}
          >
            Sign In
          </button>
        </form>

        {/* Rest of the component remains the same */}
      </div>
    </div>
  );
};

export default SignIn;
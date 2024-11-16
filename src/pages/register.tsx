import React, { useState } from "react";
import { useRouter } from "next/router";
import { Meteors } from "../components/meteorAnimation";
import { registerUser } from "../apis/AuthApi"; // Adjust this import as necessary
import { useTheme } from "../utils/ThemeContext"; // Import theme context
import { useMockAuth } from "../context/mockAuthContext"; // Import global authentication state

const ConditionalPage: React.FC = () => {
  const { signedIn, setSignedIn } = useMockAuth(); // Access global authentication state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [semester, setSemester] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { theme } = useTheme();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const userData = { name, email, password, city, semester, username };

    try {
      const data = await registerUser(userData);
      setSuccess("Registration successful!");
      console.log("Registration successful:", data);
      setSignedIn(true); // Update global state to simulate successful sign-in
    } catch (err: any) {
      setError(typeof err === "string" ? err : "Registration failed.");
      console.error("Registration error:", err);
    }
  };

  // Determine theme-based styles
  const backgroundColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const formBackground = theme === "dark" ? "bg-gray-800" : "bg-gray-200";
  const inputBackground = theme === "dark" ? "bg-gray-700" : "bg-gray-300";
  const subTextColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const italicTextColor = theme === "dark" ? "text-gray-400" : "text-gray-600";

  if (signedIn) {
    // Render Thank You Page if user is signed in
    return (
      <div
        className={`relative w-full h-screen ${backgroundColor} flex items-center justify-center`}
      >
        {/* Meteor animation */}
        <div className="absolute inset-0 z-0">
          <Meteors number={50} />
        </div>

        {/* Main content */}
        <div className={`relative z-10 text-center ${textColor}`}>
          <h1 className="text-6xl font-extrabold mb-4">
            Thank you for registering!
          </h1>
          <p className={`text-xl ${subTextColor} mb-2`}>
            We can't wait to meet you at the event.
          </p>
          <p className={`text-lg ${italicTextColor} italic`}>
            Get ready for an unforgettable experience filled with innovation and
            inspiration!
          </p>
        </div>
      </div>
    );
  }

  // Render Register Page if user is not signed in
  return (
    <div
      className={`relative w-full h-screen overflow-hidden ${backgroundColor} flex justify-center items-center`}
    >
      <div className="absolute inset-0 z-0">
        <Meteors number={30} />
      </div>

      <div
        className={`relative z-10 ${formBackground} p-8 rounded-lg shadow-lg w-full max-w-4xl flex flex-col items-center`}
      >
        <h2 className={`text-2xl mb-6 ${textColor}`}>Register</h2>

        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className={`${textColor} text-sm font-bold mb-2`}
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              className={`w-full px-3 py-2 ${inputBackground} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className={`${textColor} text-sm font-bold mb-2`}
              htmlFor="city"
            >
              City
            </label>
            <input
              id="city"
              type="text"
              placeholder="Enter your city"
              className={`w-full px-3 py-2 ${inputBackground} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className={`${textColor} text-sm font-bold mb-2`}
              htmlFor="semester"
            >
              Semester
            </label>
            <input
              id="semester"
              type="text"
              placeholder="Enter your semester"
              className={`w-full px-3 py-2 ${inputBackground} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className={`${textColor} text-sm font-bold mb-2`}
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className={`w-full px-3 py-2 ${inputBackground} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className={`${textColor} text-sm font-bold mb-2`}
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className={`w-full px-3 py-2 ${inputBackground} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              className={`${textColor} text-sm font-bold mb-2`}
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className={`w-full px-3 py-2 ${inputBackground} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Register
          </button>
        </form>

        <button
          onClick={() => router.push("/signin")} // Navigate to sign-in page
          className="mt-4 text-blue-400 underline"
        >
          Already Registered? Sign In
        </button>
      </div>
    </div>
  );
};

export default ConditionalPage;

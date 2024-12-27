import React, { useState } from "react";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";
import { Meteors } from "../components/meteorAnimation";
import { registerUser } from "../apis/AuthApi"; // Adjust this import as necessary
import { useTheme } from "../utils/ThemeContext"; // Import theme context
import { useMockAuth } from "../context/mockAuthContext"; // Import global authentication state

const ConditionalPage: React.FC = () => {
  const { signedIn, setSignedIn } = useMockAuth(); // Access global authentication state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    semester: "",
    username: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { theme } = useTheme();
  const router = useRouter();
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Remove error message as user types
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  // Handle reCAPTCHA
  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
    if (value) {
      setErrors((prev) => ({ ...prev, captcha: "" }));
    }
  };

  // Validate form fields
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.semester.trim()) newErrors.semester = "Semester is required.";
    if (!captchaValue) newErrors.captcha = "Please complete the CAPTCHA.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);
    setSuccess(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const userData = { ...formData, captcha: captchaValue };

    try {
      const data = await registerUser(userData);
      setSuccess("Registration successful!");
      console.log("Registration successful:", data);
      setSignedIn(true); // Update global state to simulate successful sign-in
    } catch (err: any) {
      setGlobalError(
        typeof err === "string" ? err : "Registration failed. Please try again."
      );
      console.error("Registration error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine theme-based styles
  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const formBackground = theme === "dark" ? "bg-gray-900" : "bg-gray-200";
  const inputBackground = theme === "dark" ? "bg-gray-700" : "bg-gray-300";
  const subTextColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const italicTextColor = theme === "dark" ? "text-gray-400" : "text-gray-600";

  if (signedIn) {
    // Render Thank You Page if user is signed in
    return (
      <div
        className={`relative w-full min-h-screen ${backgroundColor} flex items-center justify-center px-4`}
      >
        {/* Meteor animation */}
        <div className="absolute inset-0 z-0">
          <Meteors number={50} />
        </div>

        {/* Main content */}
        <div className={`relative z-10 text-center ${textColor}`}>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Thank you for registering!
          </h1>
          <p className={`text-lg md:text-xl ${subTextColor} mb-2`}>
            We can't wait to meet you at the event.
          </p>
          <p className={`text-md md:text-lg ${italicTextColor} italic`}>
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
      className={`relative w-full min-h-screen overflow-hidden ${backgroundColor} flex justify-center items-center px-4`}
    >
      <div className="absolute inset-0 z-0">
        <Meteors number={30} />
      </div>

      <div
        className={`relative z-10 ${formBackground} p-8 rounded-lg shadow-lg w-full max-w-2xl flex flex-col items-center`}
      >
        <h2 className={`text-2xl md:text-3xl mb-6 ${textColor}`}>Register</h2>

        <form className="w-full" onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="mb-4">
            <label
              className={`${textColor} block text-sm font-bold mb-2`}
              htmlFor="name"
            >
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className={`w-full px-3 py-2 ${inputBackground} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formData.name}
              onChange={handleChange}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby="name-error"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1" id="name-error">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              className={`${textColor} block text-sm font-bold mb-2`}
              htmlFor="email"
            >
              Email<span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className={`w-full px-3 py-2 ${inputBackground} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formData.email}
              onChange={handleChange}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby="email-error"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1" id="email-error">
                {errors.email}
              </p>
            )}
          </div>

          {/* Username */}
          <div className="mb-4">
            <label
              className={`${textColor} block text-sm font-bold mb-2`}
              htmlFor="username"
            >
              Username<span className="text-red-500">*</span>
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className={`w-full px-3 py-2 ${inputBackground} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formData.username}
              onChange={handleChange}
              aria-invalid={errors.username ? "true" : "false"}
              aria-describedby="username-error"
              required
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1" id="username-error">
                {errors.username}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              className={`${textColor} block text-sm font-bold mb-2`}
              htmlFor="password"
            >
              Password<span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className={`w-full px-3 py-2 ${inputBackground} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formData.password}
              onChange={handleChange}
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby="password-error"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1" id="password-error">
                {errors.password}
              </p>
            )}
          </div>

          {/* City */}
          <div className="mb-4">
            <label
              className={`${textColor} block text-sm font-bold mb-2`}
              htmlFor="city"
            >
              City<span className="text-red-500">*</span>
            </label>
            <input
              id="city"
              type="text"
              placeholder="Enter your city"
              className={`w-full px-3 py-2 ${inputBackground} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formData.city}
              onChange={handleChange}
              aria-invalid={errors.city ? "true" : "false"}
              aria-describedby="city-error"
              required
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1" id="city-error">
                {errors.city}
              </p>
            )}
          </div>

          {/* Semester */}
          <div className="mb-4">
            <label
              className={`${textColor} block text-sm font-bold mb-2`}
              htmlFor="semester"
            >
              Semester<span className="text-red-500">*</span>
            </label>
            <input
              id="semester"
              type="text"
              placeholder="Enter your semester"
              className={`w-full px-3 py-2 ${inputBackground} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formData.semester}
              onChange={handleChange}
              aria-invalid={errors.semester ? "true" : "false"}
              aria-describedby="semester-error"
              required
            />
            {errors.semester && (
              <p className="text-red-500 text-xs mt-1" id="semester-error">
                {errors.semester}
              </p>
            )}
          </div>

          {/* reCAPTCHA */}
          {/* <div className="mb-4">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              onChange={handleCaptchaChange}
            />
            {errors.captcha && (
              <p className="text-red-500 text-xs mt-1" id="captcha-error">
                {errors.captcha}
              </p>
            )}
          </div> */}

          {/* Global Error Message */}
          {globalError && (
            <div className="mb-4 text-red-500 text-center">{globalError}</div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 text-green-500 text-center">{success}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Navigate to Sign-In */}
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

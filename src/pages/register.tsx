import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";
import { Meteors } from "../components/meteorAnimation";
import { registerUser } from "../apis/services/authService"; // Adjust this import as necessary
import { useTheme } from "../utils/ThemeContext"; // Import theme context
import { useAuth } from "../context/authContext"; // Import authentication context

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    year: "",
    university: "",
    school: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [globalError, setGlobalError] = useState<React.ReactNode | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { theme } = useTheme();
  const { isSignedIn } = useAuth(); // Get authentication status
  const router = useRouter();
  // For testing purposes, if you're not using reCAPTCHA,
  // we set a default value so the validation doesn't fail.
  const [captchaValue, setCaptchaValue] = useState<string | null>(
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? null : "test"
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Redirect if user is authenticated
  useEffect(() => {
    if (isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn, router]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Remove error message as user types
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  // Validate form fields, including checking that "year" is a number
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
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.school.trim()) newErrors.school = "School is required.";

    // Validate year: it should not be empty and must be a number
    if (!formData.year) {
      newErrors.year = "Year is required.";
    } else if (isNaN(Number(formData.year))) {
      newErrors.year = "Year should be a number.";
    }

    if (!formData.university.trim())
      newErrors.university = "University is required.";
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setGlobalError(null);
    setSuccess(null);

    const validationErrors = validate();
    
    // Custom validation for checkboxes
    if (!(document.getElementById('privacyPolicy') as HTMLInputElement)?.checked) {
      validationErrors.privacyPolicy = "You must accept the privacy policy.";
    }

    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation errors:", validationErrors);
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Convert year to integer, default to 0 if empty
    const userData = { 
      ...formData,
      year: formData.year ? parseInt(formData.year, 10) : 0
    };
    console.log("Calling registerUser with:", userData);

    try {
      const data = await registerUser(userData);
      console.log("Registration successful:", data);

      sessionStorage.setItem('pendingVerificationEmail', formData.email);

      router.push("/registrationSuccess");
    } catch (err: any) {
      console.error("Registration error:", err);
  
      // Check for specific error types
      if (err.message && err.message.includes('User already exists')) {
        setGlobalError(
          <>
            This email address is already registered. 
            <button 
              onClick={() => router.push('/signIn')} 
              className="ml-2 text-blue-500 underline"
            >
              Sign in instead
            </button>
          </>
        );
      } else {
        setGlobalError(
          typeof err.message === "string" ? err.message : "Registration failed. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine theme-based styles
  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const formBackground = theme === "dark" ? "bg-gray-900" : "bg-gray-200";
  const inputBackground = theme === "dark" ? "bg-gray-700" : "bg-gray-300";

  return (
    <div
      className={`relative w-full min-h-screen overflow-hidden ${backgroundColor} flex justify-center items-start px-4 pt-20`}
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

          {/* School */}
          <div className="mb-4">
            <label
              className={`${textColor} block text-sm font-bold mb-2`}
              htmlFor="school"
            >
              Major<span className="text-red-500">*</span>
            </label>
            <input
              id="school"
              type="text"
              placeholder="Enter your department"
              className={`w-full px-3 py-2 ${inputBackground} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formData.school}
              onChange={handleChange}
              aria-invalid={errors.school ? "true" : "false"}
              aria-describedby="school-error"
              required
            />
            {errors.school && (
              <p className="text-red-500 text-xs mt-1" id="school-error">
                {errors.school}
              </p>
            )}
          </div>

          {/* Year */}
          <div className="mb-4">
            <label
              className={`${textColor} block text-sm font-bold mb-2`}
              htmlFor="year"
            >
              Year<span className="text-red-500">*</span>
            </label>
            <input
              id="year"
              type="number"
              placeholder="Enter your year"
              className={`w-full px-3 py-2 ${inputBackground} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formData.year}
              onChange={handleChange}
              aria-invalid={errors.year ? "true" : "false"}
              aria-describedby="year-error"
              required
            />
            {errors.year && (
              <p className="text-red-500 text-xs mt-1" id="year-error">
                {errors.year}
              </p>
            )}
          </div>

          {/* University */}
          <div className="mb-4">
            <label
              className={`${textColor} block text-sm font-bold mb-2`}
              htmlFor="university"
            >
              University<span className="text-red-500">*</span>
            </label>
            <input
              id="university"
              type="text"
              placeholder="Enter your university"
              className={`w-full px-3 py-2 ${inputBackground} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formData.university}
              onChange={handleChange}
              aria-invalid={errors.university ? "true" : "false"}
              aria-describedby="university-error"
              required
            />
            {errors.university && (
              <p className="text-red-500 text-xs mt-1" id="university-error">
                {errors.university}
              </p>
            )}
          </div>

          {/* Privacy Policy Checkbox */}
          <div className="mb-4">
            <div className="flex items-start">
              <input
                id="privacyPolicy"
                type="checkbox"
                className={`mt-1 mr-2 ${errors.privacyPolicy ? 'ring-2 ring-red-500' : ''}`}
                required
                onChange={(e) => {
                  // Clear the error when checkbox is checked
                  if (e.target.checked && errors.privacyPolicy) {
                    setErrors(prev => ({ ...prev, privacyPolicy: '' }));
                  }
                }}
                aria-invalid={errors.privacyPolicy ? "true" : "false"}
                aria-describedby={errors.privacyPolicy ? "privacyPolicy-error" : undefined}
              />
              <div>
                <label
                  className={`${textColor} text-sm`}
                  htmlFor="privacyPolicy"
                >
                  Διάβασα και αποδέχομαι την <a href="https://drive.google.com/file/d/14a8KE3RrNGiEVHVxi1E-LLvfRTIm9KmV/view" target="_blank" className="text-blue-500 underline">Πολιτική Απορρήτου</a> του ΣΦΗΜΜΥ 16.
                </label>
                {errors.privacyPolicy && (
                  <p className="text-red-500 text-xs mt-1" id="privacyPolicy-error">
                    {errors.privacyPolicy}
                  </p>
                )}
              </div>
            </div>
          </div>

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
          onClick={() => router.push("/signIn")}
          className="mt-4 text-blue-400 underline"
        >
          Already Registered? Sign In
        </button>
      </div>
    </div>
  );
};

export default Register;

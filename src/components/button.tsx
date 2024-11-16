//one use register button for workshops

import React, { useState } from "react";

const RegisterButton = () => {
  // State to manage whether the button is clicked (registered)
  const [isRegistered, setIsRegistered] = useState(false);

  // Simulate backend operation (e.g., "add space and a note")
  const handleRegister = () => {
    // Simulate a backerend operation here, e.g., API call or logic
    console.log("Simulating backend operation: Adding space and a note...");

    // Change button state to registered
    setIsRegistered(true);
  };

  return (
    <button
      onClick={handleRegister}
      className={`transition-all duration-500 px-6 py-3 rounded-lg font-bold text-white 
        ${isRegistered ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"}`}
      disabled={isRegistered} // Disable button after registering
    >
      {isRegistered ? (
        <span className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Registered
        </span>
      ) : (
        "Register"
      )}
    </button>
  );
};

export default RegisterButton;

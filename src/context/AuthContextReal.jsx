// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect,ReactNode } from "react";
import { loginUser as apiLoginUser, registerUser } from "../apis/AuthApi";

// Create the context

interface AuthContextType {
  isSignedIn: boolean; // Track if the user is signed in
  setSignedIn: (signedIn: boolean) => void; // Function to update sign-in state
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  // On mount, check if a token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Optionally decode and validate the token here
      setSignedIn(true);
      // You might also set user info if available
      setUser({ name: "User" });
    }
  }, []);

  const login = async (loginData) => {
    // Make sure your loginUser function returns the response data
    const responseData = await apiLoginUser(loginData);
    if (responseData && responseData.token) {
      localStorage.setItem("authToken", responseData.token);
      // Assume the API returns user info—adjust as needed
      setUser(responseData.user);
      setSignedIn(true);
    }
    return responseData;
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setSignedIn(false);
  };

  return (
    <AuthContext.Provider value={{ signedIn, user, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

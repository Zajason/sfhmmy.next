import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the structure of the context
interface MockAuthContextType {
  signedIn: boolean;
  setSignedIn: (signedIn: boolean) => void;
}

const MockAuthContext = createContext<MockAuthContextType | undefined>(
  undefined
);

// Provider component
export const MockAuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [signedIn, setSignedIn] = useState(false); // Default to not signed in

  return (
    <MockAuthContext.Provider value={{ signedIn, setSignedIn }}>
      {children}
    </MockAuthContext.Provider>
  );
};

// Custom hook to access the context
export const useMockAuth = () => {
  const context = useContext(MockAuthContext);
  if (!context) {
    throw new Error("useMockAuth must be used within a MockAuthProvider");
  }
  return context;
};

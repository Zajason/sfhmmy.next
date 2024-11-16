import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the structure of the authentication context
interface AuthContextType {
  isSignedIn: boolean; // Track if the user is signed in
  setSignedIn: (signedIn: boolean) => void; // Function to update sign-in state
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component to wrap the app
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Example: Load initial state from localStorage (optional)
  useEffect(() => {
    const savedState = localStorage.getItem("isSignedIn");
    if (savedState === "true") {
      setIsSignedIn(true);
    }
  }, []);

  // Save sign-in state to localStorage whenever it changes (optional)
  useEffect(() => {
    localStorage.setItem("isSignedIn", isSignedIn.toString());
  }, [isSignedIn]);

  return (
    <AuthContext.Provider value={{ isSignedIn, setSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

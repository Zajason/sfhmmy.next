import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  isSignedIn: boolean;
  login: (token: string) => void;
  logout: () => void; // Added missing logout function
  isLoading: boolean; // Add loading state
  setIsSignedIn: (isSignedIn: boolean) => void; // Added setter function
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  // Proper initialization from authToken
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsSignedIn(!!token);
    setIsLoading(false); // Set loading to false after initialization
    
  }, []);

  const login = (token: string) => {
    localStorage.setItem("authToken", token);
    setIsSignedIn(true); // Fixed typo: setSignedIn -> setIsSignedIn
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsSignedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isSignedIn,setIsSignedIn, isLoading, login, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
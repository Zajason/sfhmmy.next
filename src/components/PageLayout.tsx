import React from "react";
import Navbar from "./navbar/navbar_main";
import Footer from "./footer";
import { useMockAuth } from "../context/mockAuthContext";

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userName="User" />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
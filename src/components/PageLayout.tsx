import React from "react";
import Navbar from "./navbar/navbar_main";
import Footer from "./footer";

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
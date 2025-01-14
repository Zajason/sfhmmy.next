import React, { ReactNode } from "react";
import Navbar from "./navbar/navbar_main";
import Footer from "./footer";

interface PageLayoutProps {
  children: ReactNode;
  isLoggedIn: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, isLoggedIn }) => {
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <main>{children}</main>
      <Footer/>
    </>
  );
};

export default PageLayout;

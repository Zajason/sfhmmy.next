import React, { ReactNode } from "react";
import Navbar from "../components/navbar/navbar_main";

interface PageLayoutProps {
  children: ReactNode;
  isLoggedIn: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, isLoggedIn }) => {
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <main>{children}</main>
    </>
  );
};

export default PageLayout;

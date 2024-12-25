import React, { useState, useEffect } from "react";
import { Link as ScrollLink, Element } from "react-scroll";
import { useRouter } from "next/router";
import WelcomePage from "../components/welcome";
import WelcomePage2 from "../components/welcome2";
import EngPage from "@/components/endpage";
import Midle from "../components/middle";
import WelcomePageMobile from "../components/MobileWelcome";
import SpeakersLite from "../components/speakerCarousel";
import Agenda from "../components/agenda";
import Register from "./register";
import Footer from "../components/footer";
import ScrollView from "../components/scroll";
import { useTheme } from "../utils/ThemeContext";

interface ScrollableHomeProps {
  registered: boolean;
}

const ScrollableHome: React.FC<ScrollableHomeProps> = ({ registered }) => {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navBgColor = theme === "dark" ? "bg-black" : "bg-gray-100";
  const navTextColor = theme === "dark" ? "text-white" : "text-blue-900";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {/* Navbar for both mobile and desktop */}
     

      {/* Smooth Scrollable Sections */}
      <div style={{ marginTop: "60px" }}>
        <Element name="welcomeSection" className="welcomeSection">
          <EngPage/>
        </Element>
        
        <Element name="welcomeSection" className="welcomeSection">
          <Midle/>
        </Element>



        <Element name="speakersSection" className="section">
          <SpeakersLite />
        </Element>

        <Element name="agendaSection" className="section">
          <Agenda />
        </Element>

        <Element name="registerSection" className="section">
          <Register />
        </Element>

        <Footer />
      </div>
    </div>
  );
};

export default ScrollableHome;

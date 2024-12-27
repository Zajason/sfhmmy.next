import React, { useState, useEffect } from "react";
import { Link as ScrollLink, Element } from "react-scroll";
import HeroSection from "@/components/HeroSection";
import SpeakersLite from "../components/speakerCarousel";
import AboutUs from "../components/section_about_us";
import PageLayout from "../components/PageLayout";
import Agenda from "../components/agenda";
import Register from "./register";
import Footer from "../components/footer";
import { useTheme } from "../utils/ThemeContext";
import SubjectsSection from "@/components/subjectSection";




const ScrollableHome: React.FC = () => {
  const { theme } = useTheme();
  const [isMiddleVisible, setIsMiddleVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const middleElement = document.getElementById("middleSection");
      if (middleElement) {
        const rect = middleElement.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsMiddleVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
      <PageLayout isLoggedIn={false}>
        <Element name="welcomeSection" className="welcomeSection">
          <HeroSection />
        </Element>

        <Element name="middleSection" className="section">
          <AboutUs />
        </Element>

        <Element name="subjectSection" className="section">
          <SubjectsSection />
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
      </PageLayout>
  );
};

export default ScrollableHome;

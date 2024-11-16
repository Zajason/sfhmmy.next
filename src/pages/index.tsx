import React, { useState, useEffect } from "react";
import { Link as ScrollLink, Element } from "react-scroll";
import { useRouter } from "next/router";
import WelcomePage from "../components/welcome";
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

  const navBgColor = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
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
      <nav
        className={`fixed top-0 left-0 w-full z-50 p-2 ${navBgColor} ${navTextColor} flex justify-between items-center h-16`}
      >
        {isMobile ? (
          <>
            {/* Burger Menu Icon for Mobile */}
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="cursor-pointer"
            >
              <img
                src="/images/others/menu-bar.png"
                alt="Menu"
                style={{ width: "30px", height: "30px" }}
              />
            </div>

            {menuOpen && (
              <ul
                className={`absolute top-16 left-2 w-48 ${navBgColor} ${navTextColor} flex flex-col items-start space-y-2 py-2 rounded-md shadow-lg`}
              >
                <li className="w-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded">
                  <ScrollLink
                    to="welcomeSection"
                    smooth={true}
                    duration={500}
                    className={navTextColor}
                    onClick={() => setMenuOpen(false)}
                  >
                    Welcome
                  </ScrollLink>
                </li>
                <li className="w-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded">
                  <ScrollLink
                    to="speakersSection"
                    smooth={true}
                    duration={500}
                    className={navTextColor}
                    onClick={() => setMenuOpen(false)}
                  >
                    Speakers
                  </ScrollLink>
                </li>
                <li className="w-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded">
                  <ScrollLink
                    to="agendaSection"
                    smooth={true}
                    duration={500}
                    className={navTextColor}
                    onClick={() => setMenuOpen(false)}
                  >
                    Agenda
                  </ScrollLink>
                </li>
                <li className="w-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded">
                  <span
                    className={navTextColor}
                    onClick={() => {
                      router.push("/members");
                      setMenuOpen(false);
                    }}
                  >
                    Members
                  </span>
                </li>
                <li className="w-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded">
                  <span
                    className={navTextColor}
                    onClick={() => {
                      router.push("/workshops");
                      setMenuOpen(false);
                    }}
                  >
                    Workshops
                  </span>
                </li>
                <li className="w-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded">
                  <span
                    className={navTextColor}
                    onClick={() => {
                      router.push("/sponsors");
                      setMenuOpen(false);
                    }}
                  >
                    Sponsors
                  </span>
                </li>
                <li className="w-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded">
                  <ScrollLink
                    to="registerSection"
                    smooth={true}
                    duration={500}
                    className={navTextColor}
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </ScrollLink>
                </li>
              </ul>
            )}
          </>
        ) : (
          <ul className="flex justify-around list-none w-3/4">
            <li>
              <ScrollLink
                to="welcomeSection"
                smooth={true}
                duration={500}
                className={navTextColor}
              >
                Welcome
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="speakersSection"
                smooth={true}
                duration={500}
                className={navTextColor}
              >
                Speakers
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="agendaSection"
                smooth={true}
                duration={500}
                className={navTextColor}
              >
                Agenda
              </ScrollLink>
            </li>
            <li>
              <span
                className={navTextColor}
                onClick={() => router.push("/members")}
              >
                Members
              </span>
            </li>
            <li>
              <span
                className={navTextColor}
                onClick={() => router.push("/workshops")}
              >
                Workshops
              </span>
            </li>
            <li>
              <span
                className={navTextColor}
                onClick={() => router.push("/sponsors")}
              >
                Sponsors
              </span>
            </li>
            <li>
              <ScrollLink
                to="registerSection"
                smooth={true}
                duration={500}
                className={navTextColor}
              >
                Register
              </ScrollLink>
            </li>
          </ul>
        )}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
          {/* Profile Icon */}
          <div
            onClick={() => router.push("/profile")}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/images/others/default.jpg"
              alt="Profile"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
          </div>
        </div>
      </nav>

      {/* Smooth Scrollable Sections */}
      <div style={{ marginTop: "60px" }}>
        <Element name="welcomeSection" className="welcomeSection">
          {isMobile ? <WelcomePageMobile /> : <WelcomePage />}
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

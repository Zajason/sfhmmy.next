import React, { useState, useEffect } from "react";
import { Link as ScrollLink, Element } from "react-scroll";
import { useRouter } from "next/router";
import WelcomePage from "../components/welcome";
import SpeakersLite from "../components/index/speakerCarousel";
import Footer from "../components/footer";
import { useTheme } from "../utils/ThemeContext";
import Image from "next/image";
import { motion } from "framer-motion";

const ScrollableHome: React.FC = () => {
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

  const animationVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

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
        </div>
      </nav>

      {/* Smooth Scrollable Sections */}
      <div style={{ marginTop: "60px" }}>
        <Element name="welcomeSection" className="welcomeSection">
          <WelcomePage />
        </Element>

        {/* Alternating Image and Text Sections */}
        <Element name="imageTextSection" className="section">
          <motion.div
            className="flex flex-row items-center justify-between px-16 py-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={animationVariants}
            transition={{ duration: 0.5 }}
          >
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Placeholder Text 1</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                lacinia odio vitae vestibulum vestibulum.
              </p>
            </div>
            <Image
              src="/images/others/example1.jpg"
              alt="Example 1"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </motion.div>
          <motion.div
            className="flex flex-row-reverse items-center justify-between px-16 py-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={animationVariants}
            transition={{ duration: 0.5 }}
          >
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Placeholder Text 2</h2>
              <p>
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              </p>
            </div>
            <Image
              src="/images/others/example2.jpg"
              alt="Example 2"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </motion.div>
          <motion.div
            className="flex flex-row items-center justify-between px-16 py-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={animationVariants}
            transition={{ duration: 0.5 }}
          >
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Placeholder Text 3</h2>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
            <Image
              src="/images/others/example3.jpg"
              alt="Example 3"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </motion.div>
        </Element>

        <Element name="speakersSection" className="section">
          <SpeakersLite />
        </Element>

        <Footer />
      </div>
    </div>
  );
};

export default ScrollableHome;

import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "../../utils/ThemeContext";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence for exit animations

interface NavbarProps {
  isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const { theme } = useTheme();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track the mobile menu state
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Track the hovered main menu item for desktop
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Track the opened submenu in mobile

  const logoSrc =
    theme === "dark"
      ? "/images/others/Official Logo ΣΦΗΜΜΥ 16 for dark.png"
      : "/images/others/Official Logo ΣΦΗΜΜΥ 16 for white.png";

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    {
      label: "Συνέδριο",
      subItems: [
        { href: "/agenda", label: "Πρόγραμμα" },
        { href: "/papers", label: "Εργασίες" },
        { href: "/sponsors", label: "Χορηγοί" },
        { href: "/members", label: "Οργανωτική Επιτροπή" },
        { href: "/speakersFull", label: "Επιστημονική Επιτροπή" },
      ],
    },
    {
      label: "Activities",
      subItems: [
        { href: "/workshops", label: "Workshops" },
        { href: "/pre-sfhmmy", label: "PreΣΦΗΜΜΥ" },
        { href: "/career", label: "Career@ΣΦΗΜΜΥ" },
      ],
    },
    { href: "/past-events", label: "Past Events" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => router.pathname === href;

  // Function to handle hover start on desktop
  const handleHoverStart = (index: number) => {
    setHoveredIndex(index); // Show the submenu when hovering over the main item
  };

  // Function to handle hover end on desktop
  const handleHoverEnd = () => {
    setHoveredIndex(null); // Hide the submenu when not hovering over the main item or submenu
  };

  // Function to handle toggle on mobile
  const handleToggle = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close submenu if it's already open
    } else {
      setOpenIndex(index); // Open the clicked submenu
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-black bg-opacity-50 text-white shadow-md z-50">
      <div className="container mx-auto px-36">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src={logoSrc}
              alt="Logo"
              width={80}
              height={80}
              className="cursor-pointer"
            />
          </Link>

          {/* Desktop Navbar */}
          <div className="hidden md:flex flex-1 ml-8">
            <div className="w-full flex justify-evenly items-center">
              {navItems.map((item, index) =>
                item.subItems ? (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => handleHoverStart(index)} // Show submenu on hover
                    onMouseLeave={handleHoverEnd} // Hide submenu on mouse leave
                  >
                    <motion.span
                      className="cursor-pointer flex items-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </motion.span>

                    {/* Submenu */}
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          className="absolute left-0 top-full mt-2 py-2 w-48 bg-gray-900 rounded-md shadow-xl z-50"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          onMouseEnter={() => setHoveredIndex(index)} // Keep submenu open on hover
                          onMouseLeave={handleHoverEnd} // Hide submenu on mouse leave
                        >
                          {item.subItems.map((subItem, subIndex) => (
                            <Link key={subIndex} href={subItem.href}>
                              <span
                                className={`block px-4 py-2 hover:bg-gray-800 ${
                                  isActive(subItem.href) ? "text-blue-400" : ""
                                }`}
                              >
                                {subItem.label}
                              </span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link key={index} href={item.href}>
                    <motion.span
                      className={`hover:text-blue-400 cursor-pointer ${
                        isActive(item.href) ? "text-blue-400" : ""
                      }`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-black bg-opacity-80 text-white w-full fixed top-0 left-0 z-50"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col p-4">
              {navItems.map((item, index) =>
                item.subItems ? (
                  <div key={index} className="relative">
                    <motion.span
                      className="cursor-pointer flex items-center mb-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => handleToggle(index)} // Toggle submenu on click
                    >
                      {item.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </motion.span>

                    {/* Submenu for Mobile */}
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          className="py-2 pl-4 bg-gray-900 rounded-md shadow-xl"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.subItems.map((subItem, subIndex) => (
                            <Link key={subIndex} href={subItem.href}>
                              <span
                                className={`block px-4 py-2 hover:bg-gray-800 ${
                                  isActive(subItem.href) ? "text-blue-400" : ""
                                }`}
                              >
                                {subItem.label}
                              </span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link key={index} href={item.href}>
                    <motion.span
                      className={`hover:text-blue-400 cursor-pointer mb-2 ${
                        isActive(item.href) ? "text-blue-400" : ""
                      }`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                )
              )}

              {/* Close button for mobile menu */}
              <button
                className="mt-4 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Close Menu
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close mobile menu when clicking outside */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-black bg-opacity-80 fixed top-0 left-0 w-full h-full z-40"
            onClick={() => setIsMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;

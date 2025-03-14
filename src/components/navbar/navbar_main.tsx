import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "../../utils/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/authContext";
import { getUserProfile } from "../../apis/AuthApi"; // Import the API function

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [userName, setUserName] = useState("Loading...");
  const [userAvatar, setUserAvatar] = useState("/images/others/default.jpg");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { isSignedIn, logout } = useAuth();

  // Fetch user data when signed in
  useEffect(() => {
    const fetchUserData = async () => {
      if (isSignedIn) {
        try {
          const profileData = await getUserProfile();
          // Set the user name from the API response
          if (profileData?.user?.name) {
            setUserName(profileData.user.name);
          }
          
          // Set avatar if available
          if (profileData?.user?.avatar) {
            setUserAvatar(profileData.user.avatar);
          }
        } catch (error) {
          console.error("Error fetching user profile for navbar:", error);
          // Keep default values on error
        }
      }
    };

    fetchUserData();
  }, [isSignedIn]);
  
  // Rest of your component remains the same...

  // Close menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // Clean up the event listener when the component unmounts
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  // Update scroll behavior based on menu state
  useEffect(() => {
    if (isMenuOpen) {
      // Disable scrolling on the body when menu is open
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling when menu is closed
      document.body.style.overflow = "auto";
    }

    // Cleanup function to ensure scrolling is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

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
        { href: "https://presfhmmy.sfhmmy.gr", label: "PreΣΦΗΜΜΥ" },
        { href: "/career", label: "Career@ΣΦΗΜΜΥ" },
      ],
    },
    { href: "/past-events", label: "Past Events" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => router.pathname === href;

  const handleHoverStart = (index: number) => {
    setHoveredIndex(index);
  };

  const handleHoverEnd = () => {
    setHoveredIndex(null);
  };

  const handleToggle = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const handleLogout = async () => {
    // Add delay for visual feedback
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    logout(); // Use the logout function from context
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/signIn");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-black bg-opacity-50 text-white shadow-md z-50">
      {/* Navigation content */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo on Left */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src={logoSrc}
                alt="Logo"
                width={90}
                height={90}
                className="cursor-pointer"
              />
            </Link>
          </div>

          {/* Navigation Links in Center */}
          <div className="hidden md:flex justify-center flex-1 space-x-6">
            {navItems.map((item, index) =>
              item.subItems ? (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => handleHoverStart(index)}
                  onMouseLeave={handleHoverEnd}
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

                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        className="absolute left-0 top-full mt-2 py-2 w-48 bg-gray-900 rounded-md shadow-xl z-50"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={handleHoverEnd}
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

          {/* Auth Buttons on Right */}
          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Link href="/profile">
                    <div className="flex items-center space-x-2 cursor-pointer">
                      <Image
                        src={userAvatar} // Use the dynamic avatar
                        alt="Profile"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      <span className="text-white text-sm">{userName}</span> {/* Use the dynamic name */}
                    </div>
                  </Link>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-3 rounded-md transition duration-300"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="bg-transparent hover:bg-blue-500 text-white border border-white hover:border-transparent py-1 px-3 rounded-md transition duration-300"
                >
                  Sign In
                </button>
                <button
                  onClick={handleRegister}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-md transition duration-300"
                >
                  Sign Up
                </button>
              </>
            )}
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
            className="md:hidden bg-black bg-opacity-90 text-white w-full fixed top-0 left-0 z-50 flex flex-col h-screen"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button at the top */}
            <div className="p-4 flex justify-end">
              <button
                className="text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation Items with scroll - taking up most of the space */}
            <div className="flex-grow overflow-y-auto px-8 py-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
              {navItems.map((item, index) =>
                item.subItems ? (
                  <div key={index} className="mb-6 w-full">
                    <motion.div
                      className="cursor-pointer flex items-center justify-between text-xl font-medium bg-gray-800 bg-opacity-50 p-3 rounded-md"
                      onClick={() => handleToggle(index)}
                      whileHover={{ backgroundColor: "rgba(75, 85, 99, 0.7)" }}
                    >
                      <span>{item.label}</span>
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </motion.svg>
                    </motion.div>

                    {/* Submenu for Mobile */}
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          className="bg-gray-800 rounded-md shadow-xl mt-1 border-l-2 border-blue-400 overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          {item.subItems.map((subItem, subIndex) => (
                            <Link key={subIndex} href={subItem.href}>
                              <motion.div
                                className={`px-4 py-3 hover:bg-gray-700 transition-colors ${
                                  isActive(subItem.href)
                                    ? "text-blue-400 font-medium"
                                    : ""
                                }`}
                                whileHover={{ x: 4 }}
                                transition={{ duration: 0.2 }}
                              >
                                {subItem.label}
                              </motion.div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link key={index} href={item.href} className="block mb-6 w-full">
                    <motion.div
                      className={`text-xl font-medium hover:text-blue-400 transition-colors bg-gray-800 bg-opacity-50 p-3 rounded-md ${
                        isActive(item.href)
                          ? "text-blue-400 border-l-2 border-blue-400 pl-2"
                          : ""
                      }`}
                      whileHover={{
                        x: 4,
                        backgroundColor: "rgba(75, 85, 99, 0.7)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.div>
                  </Link>
                )
              )}
            </div>

            {/* Auth Buttons at the Bottom with improved styling */}
            <div className="p-6 w-full bg-gray-900">
              {isSignedIn ? ( // Note: Fixed the variable name from signedIn to isSignedIn
                <div className="flex flex-col items-center space-y-4">
                  <Link href="/profile">
                    <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
                      <Image
                        src={userAvatar} // Use the dynamic avatar
                        alt="Profile"
                        width={50}
                        height={50}
                        className="rounded-full border-2 border-blue-400"
                      />
                      <span className="text-white text-lg font-medium">
                        {userName} {/* Use the dynamic name */}
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-md transition duration-300 w-full font-medium mt-4"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-4 w-full">
                  <button
                    onClick={handleLogin}
                    className="bg-transparent hover:bg-blue-500 text-white border-2 border-white hover:border-transparent py-3 px-4 rounded-md transition duration-300 w-full font-medium"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={handleRegister}
                    className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition duration-300 w-full font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close mobile menu when clicking outside */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-black bg-opacity-50 fixed top-0 left-0 w-full h-full z-40"
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
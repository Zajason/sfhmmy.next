import React, { useState, useEffect } from "react"; // Make sure React is imported
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "../../utils/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/authContext";
import { getUserProfile } from "../../apis/services/profileService";

interface NavbarProps {}

const AndroidIcon = () => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width={20}
  height={20}
  viewBox="0 0 256 256"
  className="mr-2"
>
  <g
    fill="#fff"
    strokeMiterlimit={10}
    fontFamily="none"
    fontSize="none"
    fontWeight="none"
    style={{
      mixBlendMode: "normal",
    }}
    textAnchor="none"
  >
    <path d="M128 75.136C60.944 75.136 5.91 126.486 0 192h256c-5.91-65.515-60.944-116.864-128-116.864zm48.955 69.285c0-5.888 4.773-10.661 10.66-10.661 5.889 0 10.662 4.773 10.662 10.661s-4.773 10.662-10.661 10.662-10.661-4.774-10.661-10.662zM68.384 155.083c-5.888 0-10.661-4.774-10.661-10.662 0-5.888 4.773-10.661 10.661-10.661s10.661 4.773 10.661 10.661-4.773 10.662-10.661 10.662z" />
    <path d="M181.536 103.003a4.384 4.384 0 0 1-3.792-6.57l27.717-48.044a4.37 4.37 0 0 1 5.984-1.605 4.384 4.384 0 0 1 1.606 5.984l-27.718 48.043a4.372 4.372 0 0 1-3.797 2.192zM74.464 103.003a4.383 4.383 0 0 1-3.797-2.192L42.955 52.768a4.383 4.383 0 0 1 1.6-5.984 4.372 4.372 0 0 1 5.984 1.605l27.717 48.043a4.377 4.377 0 0 1-1.605 5.984 4.33 4.33 0 0 1-2.187.587z" />
  </g>
</svg>
);

const Navbar: React.FC<NavbarProps> = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [userName, setUserName] = useState("Loading...");
  const [userAvatar, setUserAvatar] = useState("/images/others/default.jpg");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { isSignedIn, logout } = useAuth();
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false); // <-- Add this state

  // Fetch user data when signed in
  useEffect(() => {
    const fetchUserData = async () => {
      if (isSignedIn) {
        try {
          const profileData = await getUserProfile();

          // Set the user name from the API response (adjusted for the actual data structure)
          if (profileData?.user?.name) {
            setUserName(profileData.user.name);
          }

          // Set avatar if available - keeping the default handling since avatar isn't in the sample data
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
      ? "/images/others/sfhmmy.png"
      : "/images/others/Official Logo ΣΦΗΜΜΥ 16 for white.png";

  // Define navigation items
  const navItems = [
    { href: "/", label: "Home", target: "_self" },
    { href: "/about", label: "About", target: "_self" },
    {
      label: "Συνέδριο",
      subItems: [
        { href: "/agenda", label: "Πρόγραμμα" },
        { href: "/sponsors", label: "Χορηγοί" },
        { href: "/members", label: "Οργανωτική Επιτροπή" },
        { href: "/scientific", label: "Επιστημονική Επιτροπή" },
        { href: "/speakersFull", label: "Ομιλητές" },
      ],
    },
    {
      label: "Activities",
      subItems: [
        { href: "/workshops", label: "Workshops" }, // Re-enabled Workshops link
        {
          href: "https://presfhmmy.sfhmmy.gr",
          label: "PreΣΦΗΜΜΥ",
          target: "_blank",
        },
        { href: "/career", label: "Career@ΣΦΗΜΜΥ" },
        { href: "/parallel", label: "Παράλληλες Δράσεις" },
      ],
    },
    { href: "/past-events", label: "Past Events", target: "_self" },
    { href: "/contact", label: "Contact", target: "_self" },
    { href: "/updates", label: "Updates", target: "_self" },
  ];

  // Filter navigation items to only include "Updates" if user is signed in.
  const filteredNavItems = navItems.filter((item) => {
    if (item.href === "/updates" && !isSignedIn) {
      return false;
    }
    return true;
  });

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
    await new Promise((resolve) => setTimeout(resolve, 100)); // Shorter delay
    logout();
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/signIn");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const openDownloadModal = () => {
    setIsDownloadModalOpen(true);
  };

  const closeDownloadModal = () => {
    setIsDownloadModalOpen(false);
  };

  return ( // This should now be correctly parsed
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
            {filteredNavItems.map((item, index) =>
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
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            target={subItem.target || "_self"}
                            rel={
                              subItem.target === "_blank"
                                ? "noopener noreferrer"
                                : undefined
                            }
                          >
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
                <Link
                  key={index}
                  href={item.href!}
                  target={item.target || "_self"}
                  rel={
                    item.target === "_blank" ? "noopener noreferrer" : undefined
                  }
                >
                  <motion.span
                    className={`hover:text-blue-400 cursor-pointer ${
                      isActive(item.href!) ? "text-blue-400" : ""
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
            {/* Download Button */}
            <button
              onClick={openDownloadModal} // <-- Change this
              className="flex items-center justify-center py-1 px-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <AndroidIcon/>
              Download App
            </button>
            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Link href="/profile">
                    <div className="flex items-center space-x-2 cursor-pointer">
                      <Image
                        src={userAvatar}
                        alt="Profile"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      <span className="text-white text-sm">{userName}</span>
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

            {/* Navigation Items with scroll */}
            <div className="flex-grow overflow-y-auto px-8 py-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
              {filteredNavItems.map((item, index) =>
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
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              target={subItem.target || "_self"}
                              rel={
                                subItem.target === "_blank"
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                            >
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
                  <Link
                    key={index}
                    href={item.href}
                    className="block mb-6 w-full"
                    target={item.target || "_self"}
                    rel={
                      item.target === "_blank"
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
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

            {/* Auth Buttons at the Bottom */}
            <div className="pb-16 p-6 w-full bg-gray-900">
              {isSignedIn ? (
                <>
                  <button
                   onClick={openDownloadModal} 
                   className="flex items-center w-full justify-center px-4 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
                   >
                  <AndroidIcon />
                  Download App
                  </button>
                  <Link href="/profile" className="w-full">
                  <button className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition duration-300 w-full font-medium mt-4">
                  <Image
                        src={userAvatar}
                        alt="Profile"
                        width={30}
                        height={30}
                        className="rounded-full mr-2"
                      />  <span className="text-white text-sm">{userName}</span>
                  </button>
                  </Link>
                  <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-md transition duration-300 w-full font-medium mt-4"
                  >
                  Log Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-4 w-full">
                  {/* Download Button - Placed above Sign In/Sign Up */}
                  <button 
                    onClick={openDownloadModal}
                    className="flex items-center justify-center px-4 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <AndroidIcon />
                    Download App
                  </button>
                  {/* Sign In/Sign Up Buttons */}
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
      {/* Λήψη Εφαρμογής Modal */}
      <AnimatePresence>
        {isDownloadModalOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDownloadModal} // Κλείσιμο με κλικ στο φόντο
          >
            <motion.div
              className={`relative rounded-lg shadow-xl max-w-lg w-full mx-4 p-6 ${
                theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()} // Αποτροπή κλεισίματος με κλικ μέσα στο modal
            >
              {/* Κεφαλίδα Modal */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold flex items-center">
                  <AndroidIcon /> Λήψη Εφαρμογής Android
                </h3>
                <button
                  onClick={closeDownloadModal}
                  className={`p-1 rounded-full ${
                    theme === 'dark' ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-200'
                  }`}
                  aria-label="Κλείσιμο modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Περιεχόμενο Modal */}
              <div className="space-y-4 text-sm">
                <p>
                  Αυτή η εφαρμογή είναι διαθέσιμη μόνο για Android smartphones.
                </p>
                <p className="font-semibold text-yellow-500 dark:text-yellow-400">
                  Σημαντικό: Πριν την εγκατάσταση, ίσως χρειαστεί να ενεργοποιήσετε την εγκατάσταση από «Άγνωστες Πηγές» στις ρυθμίσεις του τηλεφώνου σας. Αυτό σας επιτρέπει να εγκαταστήσετε εφαρμογές εκτός του Google Play Store.
                </p>
                <p>
                  Χρειάζεστε βοήθεια για να ενεργοποιήσετε αυτή τη ρύθμιση; Δείτε αυτούς τους οδηγούς:
                  <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                    <li>
                      <a href="https://www.wikihow.com/Install-APK-Files-on-Android" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        Πώς να εγκαταστήσετε εφαρμογές από άγνωστες πηγές (Άρθρο)
                      </a>
                    </li>
                    <li>
                      <a href="https://www.youtube.com/watch?v=JVEbeeIvQvk&ab_channel=WebProEducation" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        Πώς να ενεργοποιήσετε τις άγνωστες πηγές (YouTube – Πρώτα 2 λεπτά)
                      </a>
                    </li>
                  </ul>
                </p>
              </div>

              {/* Υποσέλιδο Modal */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={closeDownloadModal}
                  className={`px-4 py-2 rounded-md border ${
                    theme === 'dark' ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  Κλείσιμο
                </button>
                <a
                  href="https://drive.google.com/uc?export=download&id=1rG8YbaIK2KYkmoEt1fM5hZ5f4-8HRkfz"
                  target="_blank" // Κράτημα target blank για απευθείας λήψη/προβολή
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md transition-colors"
                  // προαιρετικά add download attribute αν επιθυμείτε απευθείας λήψη
                  download="sfhmmy_v5.apk"
                >
                  Λήψη Τώρα
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Navbar;

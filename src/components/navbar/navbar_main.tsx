import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "../../utils/ThemeContext";

interface NavbarProps {
  isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const { theme } = useTheme();
  const router = useRouter();

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
          <div className="hidden md:flex flex-1 ml-8">
            <div className="w-full flex justify-evenly items-center">
              {navItems.map((item, index) =>
                item.subItems ? (
                  <div key={index} className="relative group">
                    <span className="hover:text-blue-400 cursor-pointer flex items-center">
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
                    </span>
                    <div className="absolute left-0 mt-2 py-2 w-48 bg-gray-900 rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
                    </div>
                  </div>
                ) : (
                  <Link key={index} href={item.href}>
                    <span
                      className={`hover:text-blue-400 cursor-pointer ${
                        isActive(item.href) ? "text-blue-400" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                )
              )}
            </div>
          </div>
          {!isLoggedIn && (
                <div className="flex space-x-4">
                  <Link href="/login">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                      Login
                    </button>
                  </Link>
                </div>
              )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

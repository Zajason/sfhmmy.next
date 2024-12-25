import React from "react";
import { useTheme } from "../utils/ThemeContext"; // Assuming you have a ThemeContext
// Import images
const logoDark = "/images/others/Official Logo ΣΦΗΜΜΥ 16 for dark.png";
const logoLight = "/images/others/Official Logo ΣΦΗΜΜΥ 16 for white.png";
const facebookIcon = "/images/socials/facebook.png";
const instagramIcon = "/images/socials/instagram.png";
const linkedInIcon = "/images/socials/linked.png";
const discordIcon = "/images/socials/discord.png";
const youtubeIcon = "/images/socials/youtube.png";
const tiktokIcon = "/images/socials/tiktok.png";

const Footer = () => {
  const { theme } = useTheme(); // Get the current theme

  // Choose logo based on theme
  const logo = theme === "dark" ? logoDark : logoLight;
  const backgroundColor = theme === "dark" ? "bg-gray-900" : "bg-gray-200";
  const textColor = theme === "dark" ? "text-gray-400" : "text-gray-700";
  const contactTextColor = theme === "dark" ? "text-gray-300" : "text-gray-600";

  return (
    <div
      className={`w-full ${backgroundColor} text-white py-8 flex flex-col items-center`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left section: Logo and details */}
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <img src={logo} alt="ΣΦΗΜΜΥ Logo" className="w-32 h-32 mb-4" />
          <p className={`${textColor} text-center md:text-left`}>
            © 2025 Electrical and Computer Engineering Conference (ECESCON)
          </p>
          <p className={`${textColor} text-center md:text-left`}>
            ΣΦΗΜΜΥ 16 | 19-21 Απριλίου 2025
          </p>
          <p className={`${textColor} text-center md:text-left`}>
            Τμήμα Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών, Αριστοτελειο
            Πανεπιστημιο, Θεσσαλονίκη
          </p>
        </div>

        {/* Right section: Contact info & Social Media */}
        <div className="flex flex-col items-center md:items-center">
          {/* Contact Info */}
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center mb-2">
              <span className={`${contactTextColor}`}>sfhmmy16@gmail.com</span>
            </div>
            <div className="flex items-center">
              <span className={`${contactTextColor}`}>19-21 Απριλίου 2025</span>
            </div>
          </div>

          {/* Social Media Links */}
          <h4 className={`${textColor} mb-4`}>Βρείτε μας στα Social Media</h4>
          <div className="flex space-x-4 items-center justify-center">
            <a
              href="https://www.facebook.com/sfhmmy/?locale=el_GR"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebookIcon} alt="Facebook" className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/sfhmmy/?hl=el"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagramIcon} alt="Instagram" className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/company/ecescon/?originalSubdomain=gr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedInIcon} alt="LinkedIn" className="w-6 h-6" />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={discordIcon} alt="Discord" className="w-6 h-6" />
            </a>
            <a
              href="https://www.youtube.com/@ecescon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={youtubeIcon} alt="YouTube" className="w-6 h-6" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={tiktokIcon} alt="TikTok" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

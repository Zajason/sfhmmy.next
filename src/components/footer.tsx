import React from "react";

const Footer = () => {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Logo and Social Media */}
          <div className="flex flex-col items-center">
            {/* Main ΣΦΗΜΜΥ 16 Logo */}
            <img
              src="images/others/Official Logo ΣΦΗΜΜΥ 16 for dark.png"
              alt="Logo"
              className="w-40 mb-4"
            />

            {/* "Υπό την αιγίδα" text and logos */}
            <div className="mt-4 text-center">
              <p className="mb-2">Υπό την αιγίδα</p>
              <div className="flex justify-center items-center space-x-4">
                <img
                  src="../../images/footer/thmmy.png"
                  alt="ΤΗΜΜΥ"
                  className="w-20 h-auto"
                />
                <img
                  src="../../images/footer/auth.png"
                  alt="ΑΟΘ"
                  className="w-20 h-auto"
                />
                <img
                  src="../../images/footer/macedonia.jpg"
                  alt="ΠΚΜ"
                  className="w-20 h-auto"
                />
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex mt-6 space-x-4">
              <a
                href="https://www.facebook.com/sfhmmy/?locale=el_GR"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <img
                  src="images/socials/facebook.png"
                  alt="Facebook"
                  className="w-8"
                />
              </a>
              <a
                href="https://www.instagram.com/sfhmmy/?hl=el"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <img
                  src="images/socials/instagram.png"
                  alt="Instagram"
                  className="w-8"
                />
              </a>
              <a
                href="https://gr.linkedin.com/company/ecescon"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <img
                  src="images/socials/linkedin.png"
                  alt="LinkedIn"
                  className="w-8"
                />
              </a>
              <a
                href="https://www.youtube.com/@ecescon"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <img
                  src="images/socials/youtube.png"
                  alt="YouTube"
                  className="w-8"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Privacy Policy Link */}
        <div className="mt-6 text-center">
          <a
            href="https://drive.google.com/file/d/1mHXEyWWt3NIpDnhvcAUwqMR8Xq_eDJv5/view"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-400"
          >
            Πολιτική απορρήτου
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center text-gray-500 text-sm">
          Copyright © {currentYear} ΣΦΗΜΜΥ16. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

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
            <img
              src="images/others/Official Logo ΣΦΗΜΜΥ 16 for dark.png"
              alt="Logo"
              className="w-40 mb-4"
            />

            <div className="flex mt-4 space-x-4">
              <a
                href="https://www.facebook.comhttps://www.facebook.com/sfhmmy/?locale=el_GR"
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
                href="https://www.twitter.comhttps://x.com/i/flow/login?redirect_after_login=%2Fsfhmmy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <img
                  src="images/socials/twitter.png"
                  alt="Twitter"
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
        <div className="mt-10 text-center text-gray-500 text-sm">
          Copyright © {currentYear} ΣΦΗΜΜΥ16. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

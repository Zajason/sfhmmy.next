import React from "react";

const Footer = () => {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center text-center md:text-left">
          {/* Logo and Social Media */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src="images/others/Official Logo ΣΦΗΜΜΥ 16 for dark.png"
              alt="Logo"
              className="w-40 mb-4"
            />

            <div className="flex mt-4 space-x-4 justify-center md:justify-start">
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

          {/* Useful Links */}
          <div className="mt-8 md:mt-0">
            <h3 className="text-lg font-semibold mb-4">Χρήσιμοι Σύνδεσμοι</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/network-protections" className="hover:text-blue-400">
                  Network Protections
                </a>
              </li>
              <li>
                <a href="/server-protections" className="hover:text-blue-400">
                  Server Protections
                </a>
              </li>
              <li>
                <a
                  href="/vulnerability-assessment"
                  className="hover:text-blue-400"
                >
                  Vulnerability Assessment
                </a>
              </li>
              <li>
                <a href="/spam-protections" className="hover:text-blue-400">
                  SPAM Protections
                </a>
              </li>
              <li>
                <a href="/secure-transactions" className="hover:text-blue-400">
                  Secure Transactions
                </a>
              </li>
              <li>
                <a href="/antivirus" className="hover:text-blue-400">
                  Antivirus
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="mt-8 md:mt-0">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/help-center" className="hover:text-blue-400">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/ticket-support" className="hover:text-blue-400">
                  Ticket Support
                </a>
              </li>
              <li>
                <a href="/my-account" className="hover:text-blue-400">
                  My Account
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-blue-400">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/forum-community" className="hover:text-blue-400">
                  Forum Community
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="mt-8 md:mt-0">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/about-us" className="hover:text-blue-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/leadership" className="hover:text-blue-400">
                  Leadership
                </a>
              </li>
              <li>
                <a href="/investors" className="hover:text-blue-400">
                  Investors
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-blue-400">
                  Careers
                </a>
              </li>
              <li>
                <a href="/articles-news" className="hover:text-blue-400">
                  Article & News
                </a>
              </li>
              <li>
                <a href="/legal-notices" className="hover:text-blue-400">
                  Legal Notices
                </a>
              </li>
            </ul>
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

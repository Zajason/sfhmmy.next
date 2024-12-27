import React from "react";

const ContactPage = () => {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-4xl px-6">
        <h1 className="text-4xl font-bold text-center mb-10">Επικοινωνία</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Οργανωτική Επιτροπή</h2>
            <p className="text-lg mb-4">
              Εάν έχετε οποιαδήποτε απορία ή χρειάζεστε περισσότερες πληροφορίες, μπορείτε να
              επικοινωνήσετε μαζί μας:
            </p>
            <a
              href="mailto:organizing@sfhmmy.gr"
              className="text-blue-400 hover:underline"
            >
              organizing@sfhmmy.gr
            </a>
          </div>

          {/* Social Media Links */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Ακολουθήστε μας</h2>
            <p className="text-lg mb-4">
              Μείνετε ενημερωμένοι μέσω των κοινωνικών μας δικτύων:
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.facebook.com/sfhmmy/?locale=el_GR"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <img
                  src="/images/socials/facebook.png"
                  alt="Facebook"
                  className="w-10"
                />
              </a>
              <a
                href="https://www.instagram.com/sfhmmy/?hl=el"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <img
                  src="/images/socials/instagram.png"
                  alt="Instagram"
                  className="w-10"
                />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <img
                  src="/images/socials/linkedin.png"
                  alt="LinkedIn"
                  className="w-10"
                />
              </a>
              <a
                href="https://x.com/sfhmmy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <img
                  src="/images/socials/twitter.png"
                  alt="Twitter"
                  className="w-10"
                />
              </a>
              <a
                href="https://www.youtube.com/@ecescon"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <img
                  src="/images/socials/youtube.png"
                  alt="YouTube"
                  className="w-10"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

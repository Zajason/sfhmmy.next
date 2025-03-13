import React from "react";
import { Meteors } from "../components/meteorAnimation";
import NavbarMain from "../components/navbar/navbar_main";
import { motion } from "framer-motion";

const ComingSoon: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Navbar */}
      <NavbarMain />

      {/* Background animation */}
      <div className="absolute inset-0 z-0">
        <Meteors number={30} />
      </div>

      {/* Coming Soon Text */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-white text-6xl font-bold flex items-center">
          Coming soon
          <motion.span
            className="ml-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            .
          </motion.span>
          <motion.span
            className="ml-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            .
          </motion.span>
          <motion.span
            className="ml-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0, 1, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            .
          </motion.span>
        </h1>
      </div>
    </div>
  );
};

export default ComingSoon;

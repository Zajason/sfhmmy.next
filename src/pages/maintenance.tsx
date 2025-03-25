import React from "react";
import { Meteors } from "../components/meteorAnimation";
import NavbarMain from "../components/navbar/navbar_main";
import { motion } from "framer-motion";

const Maintenance: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Optional Navbar */}
      <div className="relative z-20">
        <NavbarMain />
      </div>

      {/* Background animation */}
      <div className="absolute inset-0 z-0">
        <Meteors number={30} />
      </div>

      {/* Maintenance Message */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-white text-5xl md:text-6xl font-bold flex items-center">
          We are working on some stuff
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

        {/* Subtext */}
        <p className="text-white text-base md:text-lg font-light mt-4">
          – The ECESCON team
        </p>
      </div>
    </div>
  );
};

export default Maintenance;

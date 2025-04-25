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
        Sub-Directory

     
        </h1>

      
       
      </div>
    </div>
  );
};

export default Maintenance;

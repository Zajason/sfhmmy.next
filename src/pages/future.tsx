import React from "react";
import { Meteors } from "../components/meteorAnimation"; // Ensure the correct path
import NavbarMain from "../components/navbar/navbar_main"; // Ensure the correct path

const ComingSoon: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* Navbar */}
      <NavbarMain />

      {/* Background animation */}
      <div className="absolute inset-0 z-0">
        <Meteors number={30} />
      </div>

      {/* Centered text */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-300">
          Coming soon...
        </h1>
      </div>
    </div>
  );
};

export default ComingSoon;

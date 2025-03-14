// import React, { useState, useEffect } from "react";
// import { HoverEffect } from "../components/card-hover-effect.tsx"; // Ensure correct path
// import { workshopsData } from "../data/WorkshopsData";
// import {
//   FaBolt,
//   FaCogs,
//   FaMicrochip,
//   FaLaptop,
//   FaSatelliteDish,
//   FaBrain,
// } from "react-icons/fa";

// const iconMap: Record<string, JSX.Element> = {
//   FaBolt: <FaBolt className="text-yellow-400 text-4xl mb-4" />,
//   FaCogs: <FaCogs className="text-gray-400 text-4xl mb-4" />,
//   FaMicrochip: <FaMicrochip className="text-green-400 text-4xl mb-4" />,
//   FaLaptop: <FaLaptop className="text-blue-400 text-4xl mb-4" />,
//   FaSatelliteDish: (
//     <FaSatelliteDish className="text-purple-400 text-4xl mb-4" />
//   ),
//   FaBrain: <FaBrain className="text-pink-400 text-4xl mb-4" />,
// };

// const WorkshopsPage = () => {
//   const [participants, setParticipants] = useState<{ [key: string]: number }>(
//     {}
//   );

//   useEffect(() => {
//     const updatedParticipants: { [key: string]: number } = {};
//     workshopsData.forEach((workshop) => {
//       updatedParticipants[workshop.name] = Math.floor(
//         Math.random() * workshop.max_participants
//       );
//     });
//     setParticipants(updatedParticipants);
//   }, []);

//   return (
//     <div className="bg-black min-h-screen text-white py-24 px-10">
//       {" "}
//       {/* Adjusted spacing */}
//       <h1 className="text-4xl font-bold text-center mb-16">Workshops</h1>{" "}
//       {/* Increased margin-bottom */}
//       <HoverEffect
//         className="mt-10" // Moves the grid lower
//         items={workshopsData.map((workshop) => ({
//           title: workshop.name, // Keep title as a simple string
//           description: (
//             <div>
//               <div className="flex items-center space-x-4 mb-2">
//                 {iconMap[workshop.icon]}{" "}
//                 {/* Display the mapped icon separately */}
//                 <span className="text-lg font-semibold">{workshop.name}</span>
//               </div>
//               <p>{workshop.description}</p>
//               <p className="text-sm text-gray-400">
//                 Participants: {participants[workshop.name] || 0}/
//                 {workshop.max_participants}
//               </p>
//             </div>
//           ),
//           link: `/workshops/${encodeURIComponent(workshop.name)}`, // Ensure safe URL encoding
//         }))}
//       />
//     </div>
//   );
// };

// export default WorkshopsPage;
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

// import React from "react";
// import { motion } from "framer-motion";
// import { sponsorsData } from "../data/SponsorsData";
// import { Meteors } from "../components/meteorAnimation";
// import { useTheme } from "../utils/ThemeContext";

// const Sponsors = () => {
//   const { theme } = useTheme();

//   const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
//   const cardBackgroundColor = theme === "dark" ? "bg-gray-900" : "bg-gray-200";
//   const textColor = theme === "dark" ? "text-white" : "text-blue-900";

//   // Animation Variants
//   const fadeInUp = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.3 },
//     },
//   };

//   return (
//     <div className={`min-h-screen ${backgroundColor}`}>
//       <div
//         className={`relative w-full min-h-screen ${backgroundColor} flex flex-col items-center p-8`}
//       >
//         {/* Meteors Background Animation */}
//         <div className="absolute inset-0 z-0">
//           <Meteors number={30} />
//         </div>

//         {/* Title Animation */}
//         <motion.h1
//           initial="hidden"
//           animate="visible"
//           variants={fadeInUp}
//           className={`text-4xl ${textColor} font-bold pt-20 mb-8 z-10`}
//         >
//           Our Sponsors
//         </motion.h1>

//         {/* Sponsors Grid with Animation */}
//         <motion.div
//           className="z-10 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
//           initial="hidden"
//           animate="visible"
//           variants={staggerContainer}
//         >
//           {sponsorsData.map((sponsor, idx) => (
//             <motion.div
//               key={idx}
//               variants={fadeInUp}
//               className={`${cardBackgroundColor} rounded-lg shadow-lg p-6 flex flex-col items-center hover:scale-105 transform transition duration-300`}
//             >
//               <a
//                 href={sponsor.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-xl text-blue-400 font-bold mb-4 hover:underline"
//               >
//                 {sponsor.name}
//               </a>
//               <motion.img
//                 src={sponsor.image}
//                 alt={sponsor.name}
//                 className="h-20 w-20 mb-4 object-contain"
//                 whileHover={{ scale: 1.1 }}
//               />
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Sponsors;
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

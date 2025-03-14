// import React, { useState } from "react";
// import {
//   motion,
//   useTransform,
//   AnimatePresence,
//   useMotionValue,
//   useSpring,
// } from "framer-motion";
// import { membersData } from "../data/MembersData"; // Adjust path if necessary
// import { useTheme } from "../utils/ThemeContext"; // Ensure path to ThemeContext is correct
// import Image from "next/image"; // Import Next.js Image for optimized images

// const Members = () => {
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
//   const springConfig = { stiffness: 100, damping: 5 };
//   const x = useMotionValue(0);

//   const { theme } = useTheme();

//   // Set colors based on the theme
//   const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
//   const textColor = theme === "dark" ? "text-white" : "text-blue-900";
//   const cardBorderColor = theme === "dark" ? "border-white" : "border-gray-800";
//   const tooltipBackgroundColor = theme === "dark" ? "bg-black" : "bg-gray-200";
//   const tooltipTextColor = theme === "dark" ? "text-white" : "text-blue-900";

//   // Rotate the tooltip
//   const rotate = useSpring(
//     useTransform(x, [-100, 100], [-45, 45]),
//     springConfig
//   );

//   // Translate the tooltip
//   const translateX = useSpring(
//     useTransform(x, [-100, 100], [-50, 50]),
//     springConfig
//   );

//   const handleMouseMove = (event: any) => {
//     const halfWidth = event.target.offsetWidth / 2;
//     x.set(event.nativeEvent.offsetX - halfWidth);
//   };

//   // Animation variants
//   const fadeInUp = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.2 },
//     },
//   };

//   const items = membersData.map((member, index) => ({
//     id: index,
//     name: member.name,
//     designation: member.role,
//     image: member.image,
//   }));

//   return (
//     <div className={`min-h-screen ${backgroundColor}`}>
//       <motion.div
//         className={`flex flex-col justify-center items-center min-h-screen ${backgroundColor} pt-20`}
//         initial="hidden"
//         animate="visible"
//         variants={staggerContainer}
//       >
//         <motion.h1
//           variants={fadeInUp}
//           className={`${textColor} text-4xl font-bold mb-8`}
//         >
//           Meet Our Members
//         </motion.h1>

//         {/* Grid for Members */}
//         <motion.div
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-8"
//           variants={staggerContainer}
//         >
//           {items.map((item) => (
//             <motion.div
//               key={item.id}
//               className="relative group"
//               variants={fadeInUp}
//               onMouseEnter={() => setHoveredIndex(item.id)}
//               onMouseLeave={() => setHoveredIndex(null)}
//             >
//               <AnimatePresence>
//                 {hoveredIndex === item.id && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20, scale: 0.6 }}
//                     animate={{
//                       opacity: 1,
//                       y: 0,
//                       scale: 1,
//                       transition: {
//                         type: "spring",
//                         stiffness: 260,
//                         damping: 10,
//                       },
//                     }}
//                     exit={{ opacity: 0, y: 20, scale: 0.6 }}
//                     style={{
//                       translateX: translateX,
//                       rotate: rotate,
//                       whiteSpace: "nowrap",
//                     }}
//                     className={`absolute -top-16 left-1/2 transform -translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md ${tooltipBackgroundColor} z-50 shadow-xl px-4 py-2`}
//                   >
//                     <div
//                       className={`font-bold ${tooltipTextColor} relative z-30 text-base`}
//                     >
//                       {item.name}
//                     </div>
//                     <div className={`${tooltipTextColor} text-xs`}>
//                       {item.designation}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* Profile Image */}
//               <motion.div
//                 className="relative h-40 w-40 overflow-hidden rounded-full border-2 group-hover:scale-105 group-hover:z-30 transition duration-500"
//                 style={{
//                   aspectRatio: "1 / 1",
//                   borderColor: cardBorderColor,
//                 }}
//                 whileHover={{ scale: 1.1 }}
//               >
//                 <Image
//                   onMouseMove={handleMouseMove}
//                   src={`${item.image}`}
//                   alt={item.name}
//                   layout="fill"
//                   objectFit="cover"
//                   objectPosition="center"
//                 />
//               </motion.div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default Members;
import React from "react";
import ComingSoon from "../components/ComingSoon";

const Members: React.FC = () => {
  return (
    <>
      <ComingSoon />
    </>
  );
};

export default Members;
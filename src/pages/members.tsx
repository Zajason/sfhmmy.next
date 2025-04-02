import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { membersData } from "../data/MembersData";
import { useTheme } from "../utils/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import ComingSoon from "@/components/ComingSoon";

const Members = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);

  const { theme } = useTheme();

  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const cardBorderColor = theme === "dark" ? "border-white" : "border-gray-800";
  const tooltipBackgroundColor = theme === "dark" ? "bg-black" : "bg-gray-200";
  const tooltipTextColor = theme === "dark" ? "text-white" : "text-blue-900";

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );

  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const groupedTeams: Record<string, any[]> = {};
  membersData.forEach((member, index) => {
    const role = member.role;
    let team = "Other";
    if (role.includes("Head Organizer")) team = "1_Head Organizer";
    else if (role.includes("Information Technology")) team = "2_IT Team";
    else if (role.includes("Fundraising")) team = "3_Fundraising Team";
    else if (role.includes("Logistics")) team = "4_Logistics Team";
    else if (role.includes("Academics")) team = "5_Academics Team";
    else if (role.includes("Activities")) team = "6_Activities Team";
    else if (role.includes("Graphic Design")) team = "7_Graphic Design Team";
    else if (role.includes("Public Relations")) team = "8_Public Relations Team";
    else if (role.includes("Ambassador")) team = "9_Ambassadors";

    if (!groupedTeams[team]) groupedTeams[team] = [];
    groupedTeams[team].push({ ...member, id: index });
  });

  // Sort IT team to place Iasonas directly after the coordinator
  if (groupedTeams["2_IT Team"]) {
    const iasonasIndex = groupedTeams["2_IT Team"].findIndex(m => m.name.toLowerCase().includes("zakynthinos"));
    const coordinatorIndex = groupedTeams["2_IT Team"].findIndex(m => m.role.includes("Coordinator"));
    if (iasonasIndex !== -1 && coordinatorIndex !== -1 && iasonasIndex !== coordinatorIndex + 1) {
      const [iasonas] = groupedTeams["2_IT Team"].splice(iasonasIndex, 1);
      groupedTeams["2_IT Team"].splice(coordinatorIndex + 1, 0, iasonas);
    }
  }

  const sortedGroups = Object.entries(groupedTeams).sort(([a], [b]) => a.localeCompare(b));

  return (
    // <div className={`min-h-screen ${backgroundColor}`}>
    //   <motion.div
    //     className={`flex flex-col justify-center items-center min-h-screen ${backgroundColor} pt-20`}
    //     initial="hidden"
    //     animate="visible"
    //     variants={staggerContainer}
    //   >
    //     <motion.h1
    //       variants={fadeInUp}
    //       className={`${textColor} text-4xl font-bold mb-8`}
    //     >
    //       Meet Our Members
    //     </motion.h1>

    //     {sortedGroups.map(([team, items]) => (
    //       <div key={team} className="w-full mb-16">
    //         <h2 className={`text-2xl font-semibold mb-6 text-center ${textColor}`}>{team.replace(/^\d+_/, '')}</h2>
    //         <motion.div
    //           className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 justify-center px-4"
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
    //                     className={`absolute -top-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center rounded-md ${tooltipBackgroundColor} z-50 shadow-xl px-4 py-2`}
    //                   >
    //                     <div className={`font-bold ${tooltipTextColor} text-base`}>
    //                       {item.name}
    //                     </div>
    //                     <div className={`${tooltipTextColor} text-xs mb-1`}>
    //                       {item.role}
    //                     </div>
    //                     {item.linkedin && (
    //                       <a
    //                         href={item.linkedin.startsWith("http") ? item.linkedin : `https://${item.linkedin}`}
    //                         target="_blank"
    //                         rel="noopener noreferrer"
    //                         className="mt-1"
    //                       >
    //                         <Image
    //                           src="/images/socials/linkedin.png"
    //                           alt="LinkedIn"
    //                           width={16}
    //                           height={16}
    //                         />
    //                       </a>
    //                     )}
    //                   </motion.div>
    //                 )}
    //               </AnimatePresence>

    //               <motion.div
    //                 className="relative h-52 w-52 overflow-hidden rounded-full border-2 group-hover:scale-105 group-hover:z-30 transition duration-500 mx-auto"
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
    //       </div>
    //     ))}
    //   </motion.div>
    // </div>
    <>
      <ComingSoon />
    </>
  );
};

export default Members;

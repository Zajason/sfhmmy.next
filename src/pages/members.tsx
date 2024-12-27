import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import NavbarWithBack from "../components/navbar/navbar"; // Ensure path is correct
import { membersData } from "../data/MembersData"; // Adjust path if necessary
import { useTheme } from "../utils/ThemeContext"; // Ensure path to ThemeContext is correct
import Image from "next/image"; // Import Next.js Image for optimized images

const Members = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);

  const { theme } = useTheme();

  // Set colors based on the theme
  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const cardBorderColor = theme === "dark" ? "border-white" : "border-gray-800";
  const tooltipBackgroundColor = theme === "dark" ? "bg-black" : "bg-gray-200";
  const tooltipTextColor = theme === "dark" ? "text-white" : "text-blue-900";

  // Rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );

  // Translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  // Map the membersData to match the structure required by the component
  const items = membersData.map((member, index) => ({
    id: index,
    name: member.name,
    designation: member.role,
    image: member.image,
  }));

  return (
    <div className={`min-h-screen ${backgroundColor}`}>
      <NavbarWithBack />
      <div
        className={`flex flex-col justify-center items-center min-h-screen ${backgroundColor} pt-20`}
      >
        <h1 className={`${textColor} text-4xl font-bold mb-8`}>
          Meet Our Members
        </h1>

        {/* CSS Grid for Members with responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
          {items.map((item) => (
            <div
              className="relative group"
              key={item.name}
              onMouseEnter={() => setHoveredIndex(item.id)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === item.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.6 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 260,
                        damping: 10,
                      },
                    }}
                    exit={{ opacity: 0, y: 20, scale: 0.6 }}
                    style={{
                      translateX: translateX,
                      rotate: rotate,
                      whiteSpace: "nowrap",
                    }}
                    className={`absolute -top-16 left-1/2 transform -translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md ${tooltipBackgroundColor} z-50 shadow-xl px-4 py-2`}
                  >
                    <div
                      className={`font-bold ${tooltipTextColor} relative z-30 text-base`}
                    >
                      {item.name}
                    </div>
                    <div className={`${tooltipTextColor} text-xs`}>
                      {item.designation}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div
                className="relative h-40 w-40 overflow-hidden rounded-full border-2 group-hover:scale-105 group-hover:z-30 transition duration-500"
                style={{
                  aspectRatio: "1 / 1", // Ensures the container is a perfect square
                  borderColor: cardBorderColor, // Dynamic border color
                }}
              >
                <Image
                  onMouseMove={handleMouseMove}
                  src={`${item.image}`} // Ensure the correct path
                  alt={item.name}
                  layout="fill" // Makes the image fill the container
                  objectFit="cover" // Ensures the image covers the container proportionally
                  objectPosition="center" // Centers the image within the container
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Members;

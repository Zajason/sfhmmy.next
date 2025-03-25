import React from "react";
import { motion } from "framer-motion";
import { sponsorsData } from "../data/SponsorsData";
import { Meteors } from "../components/meteorAnimation";
import { useTheme } from "../utils/ThemeContext";

const Sponsors = () => {
  const { theme } = useTheme();

  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const levels = ["Platinum", "Gold", "Silver"];

  const levelColors = {
    Platinum: "text-[#e5e4e2]", // soft platinum/silver tone
    Gold: "text-yellow-500",
    Silver: "text-gray-400",
  };

  return (
    <div className={`min-h-screen ${backgroundColor}`}>
      <div
        className={`relative w-full min-h-screen ${backgroundColor} flex flex-col items-center p-8`}
      >
        {/* Meteors Background */}
        <div className="absolute inset-0 z-0">
          <Meteors number={30} />
        </div>

        {/* Page Title */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className={`text-4xl font-bold pt-20 mb-12 z-10 ${textColor}`}
        >
          Our Sponsors
        </motion.h1>

        {/* Grouped Sponsors by Level */}
        {levels.map((level) => {
          const levelSponsors = sponsorsData.filter(
            (sponsor) => sponsor.level === level
          );

          if (levelSponsors.length === 0) return null;

          return (
            <div key={level} className="w-full z-10 mb-16">
              {/* Level Title */}
              <h2
                className={`text-3xl font-bold mb-6 text-center ${
                  levelColors[level as keyof typeof levelColors]
                }`}
              >
                {level.toUpperCase()} SPONSORS
              </h2>

              {/* Sponsor Logos */}
              <motion.div
                className="w-full px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 justify-items-center"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {levelSponsors.map((sponsor, idx) => (
                  <motion.a
                    key={idx}
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.1 }}
                    className="h-50 w-50 flex items-center justify-center"
                  >
                    <img
                      src={sponsor.image}
                      alt={sponsor.name}
                      className="object-contain h-full w-full"
                    />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sponsors;

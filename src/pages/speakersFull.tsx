import React from "react";
import { useRouter } from "next/router";
import { speakersData } from "../data/speakersData"; // Adjust the path as necessary
import { useTheme } from "../utils/ThemeContext"; // Ensure ThemeContext is correctly implemented
import Image from "next/image"; // Import Next.js Image component for optimized images
import { motion } from "framer-motion"; // Import framer-motion for animations

const SpeakersFull = () => {
  const router = useRouter();
  const { theme } = useTheme();

  // Set colors based on the theme
  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const cardBackgroundColor = theme === "dark" ? "bg-gray-900" : "bg-gray-200";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const secondaryTextColor =
    theme === "dark" ? "text-gray-400" : "text-gray-600";

    return (
      <div className={`min-h-screen pt-24 p-8 ${backgroundColor}`}>
        <h1 className={`text-3xl ${textColor} mb-8`}>All Speakers</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {speakersData.map((speaker, idx) => (
            <motion.div
              key={idx}
              className={`p-4 ${cardBackgroundColor} rounded-lg shadow-lg text-center cursor-pointer`}
              onClick={() => router.push(`/speakers/${speaker.name}`)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-24 h-24 mx-auto mb-4">
                <Image
                  src={
                    speaker.image.startsWith("/")
                      ? speaker.image
                      : `/images/${speaker.image}`
                  }
                  alt={speaker.name}
                  width={96}
                  height={96}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <h2 className={`text-lg ${textColor}`}>{speaker.name}</h2>
              <p className={`text-sm ${secondaryTextColor}`}>{speaker.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }    

export default SpeakersFull;

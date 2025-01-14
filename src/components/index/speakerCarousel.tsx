import React from "react";
import { useRouter } from "next/router"; // Import Next.js router
import { InfiniteMovingCards } from "../carousel"; // Adjust path as needed
import { speakersData } from "../../data/speakersData";
import { useTheme } from "../../utils/ThemeContext";

const SpeakersLite = () => {
  const router = useRouter();
  const { theme } = useTheme(); // Get the current theme

  const handleSeeSpeaker = (name: string) => {
    // Navigate to individual speaker detail page
    router.push(`/speakers/${name}`);
  };

  // Determine styles based on the theme
  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme === "dark" ? "text-blue-400" : "text-blue-600";

  return (
    <div
      className={`relative w-full h-[70vh] ${backgroundColor} flex justify-center items-center`}
    >
      {/* Infinite Moving Cards */}
      <InfiniteMovingCards
        items={speakersData}
        onClick={(name) => handleSeeSpeaker(name)} // Pass the click handler for navigation
      />

      {/* Button to see all speakers */}
      <button
        onClick={() => router.push("/speakersFull")} // Navigate to all speakers page
        className={`absolute bottom-4 right-1 ${textColor} underline cursor-pointer`}
      >
        See All Speakers
      </button>
    </div>
  );
};

export default SpeakersLite;

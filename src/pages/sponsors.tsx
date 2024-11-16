import React from "react";
import { sponsorsData } from "../data/SponsorsData";
import { Meteors } from "../components/meteorAnimation";
import NavbarWithBack from "../components/navbar";
import { useTheme } from "../utils/ThemeContext";

const Sponsors = () => {
  const { theme } = useTheme();

  const backgroundColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const cardBackgroundColor = theme === "dark" ? "bg-gray-800" : "bg-gray-200";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";

  return (
    <div className={`min-h-screen ${backgroundColor}`}>
      <NavbarWithBack />
      <div
        className={`relative w-full min-h-screen ${backgroundColor} flex flex-col items-center p-8 mt-10`}
      >
        <div className="absolute inset-0 z-0">
          <Meteors number={30} />
        </div>
        <h1 className={`text-4xl ${textColor} font-bold mb-8 z-10`}>
          Our Sponsors
        </h1>
        <div className="z-10 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {sponsorsData.map((sponsor, idx) => (
            <div
              key={idx}
              className={`${cardBackgroundColor} rounded-lg shadow-lg p-6 flex flex-col items-center`}
            >
              <a
                href={sponsor.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-blue-400 font-bold mb-4"
              >
                {sponsor.name}
              </a>
              <img
                src={sponsor.image}
                alt={sponsor.name}
                className="h-20 w-20 mb-4 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sponsors;

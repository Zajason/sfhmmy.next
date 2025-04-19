import React from "react";
import { pastData } from "../data/PastData";
import { Meteors } from "../components/meteorAnimation";
import { useTheme } from "../utils/ThemeContext";

const PastEvents = () => {
  const { theme } = useTheme();

  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const cardBackground = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-300";

  return (
    <div className={`relative w-full min-h-screen overflow-hidden ${backgroundColor}`}>
      <div className="absolute inset-0 z-0">
        <Meteors number={40} />
      </div>

      <div className="relative z-10 flex flex-col items-center pt-16 pb-24 px-4">
        <h1 className={`text-4xl font-bold mb-12 ${textColor}`}>Past ΣΦΗΜΜΥ Events</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 max-w-screen-lg w-full">
          {pastData.map((event, index) => (
            <div
              key={index}
              className={`flex flex-col items-center p-4 rounded-xl shadow-md ${cardBackground} border ${borderColor}`}
            >
              <img
                src={event.image}
                alt={event.name}
                className="w-40 h-40 object-contain mb-4"
              />
              <h2 className={`text-xl font-semibold text-center ${textColor}`}>{event.name}</h2>
              <p className={`text-sm mt-1 text-center ${textColor}`}>
                {event.location} — {event.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastEvents;

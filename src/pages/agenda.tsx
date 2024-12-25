// Agenda view incorporated in the scroll view

import React from "react";
import { eventsData } from "../data/AgendaData.ts";
import { useTheme } from "../utils/ThemeContext"; // Import the theme context

export const Schedule = () => {
  const { theme } = useTheme(); // Get the current theme

  // Manually group events into three days
  const day1Events = eventsData.slice(0, 5); // First 5 events
  const day2Events = eventsData.slice(5, 10); // Next 5 events
  const day3Events = eventsData.slice(10, 15); // Last 5 events

  // Helper function to render events for each day
  const renderEvents = (events: any[]) => {
    return events.map((event, index) => (
      <div
        key={index}
        className={`border-b py-4 ${
          theme === "dark" ? "border-gray-300" : "border-gray-400"
        }`}
      >
        <h3
          className={`text-xl font-semibold ${
            theme === "dark" ? "text-white" : "text-blue-900"
          }`}
        >
          {event.name}
        </h3>
        <p
          className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <strong>Type:</strong> {event.type}
        </p>
        <p
          className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <strong>Place:</strong> {event.place}
        </p>
        <p
          className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <strong>Time:</strong> {event.time}
        </p>
      </div>
    ));
  };

  // Determine background colors based on the theme
  const backgroundColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const cardBackgroundColor = theme === "dark" ? "bg-gray-800" : "bg-gray-200";
  const headingColor = theme === "dark" ? "text-white" : "text-blue-900";

  return (
    <div
      className={`flex flex-col items-center min-h-screen ${backgroundColor} py-8`}
    >
      <h1 className={`text-4xl font-bold mb-8 ${headingColor}`}>
        Event Schedule
      </h1>

      {/* Schedule for Day 1 */}
      <div className="w-full max-w-4xl px-4">
        <h2 className={`text-2xl font-bold mb-4 ${headingColor}`}>Day 1</h2>
        <div className={`${cardBackgroundColor} p-4 rounded-md`}>
          {renderEvents(day1Events)}
        </div>
      </div>

      {/* Schedule for Day 2 */}
      <div className="w-full max-w-4xl px-4 mt-8">
        <h2 className={`text-2xl font-bold mb-4 ${headingColor}`}>Day 2</h2>
        <div className={`${cardBackgroundColor} p-4 rounded-md`}>
          {renderEvents(day2Events)}
        </div>
      </div>

      {/* Schedule for Day 3 */}
      <div className="w-full max-w-4xl px-4 mt-8">
        <h2 className={`text-2xl font-bold mb-4 ${headingColor}`}>Day 3</h2>
        <div className={`${cardBackgroundColor} p-4 rounded-md`}>
          {renderEvents(day3Events)}
        </div>
      </div>
    </div>
  );
};

export default Schedule;

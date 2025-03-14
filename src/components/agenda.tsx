import React from "react";
import { motion } from "framer-motion";
import { eventsData } from "../data/AgendaData";
import { useTheme } from "../utils/ThemeContext";
import { FaCircle, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/router"; // Import useRouter from next/router
import Link from "next/link";

export const Schedule = () => {
  const { theme } = useTheme();
  const router = useRouter(); // Get the Next.js router

  const day1Events = eventsData.slice(0, 5);
  const day2Events = eventsData.slice(5, 10);
  const day3Events = eventsData.slice(10, 15);

  const renderEvents = (events: any[]) => {
    return events.map((event, index) => (
      <motion.div
        key={index}
        className="flex items-start space-x-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        {/* Icon */}
        <FaCircle className="text-blue-500 mt-10" size={10} />

        {/* Event Details */}
        <div
          className={`border-l-4 pl-4 ${
            theme === "dark" ? "border-blue-500" : "border-blue-900"
          }`}
        >
          <h3
            className={`text-lg font-semibold ${
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
      </motion.div>
    ));
  };

  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const cardBackgroundColor = theme === "dark" ? "bg-gray-900" : "bg-gray-200";
  const headingColor = theme === "dark" ? "text-white" : "text-blue-900";

  // Check if the current page is not /agenda
  const isNotAgendaPage = router.pathname !== "/agenda";

  return (
    <div className={`min-h-screen ${backgroundColor} py-12`}>
      <motion.h1
        className={`text-4xl font-bold text-center mb-12 ${headingColor}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Event Schedule
      </motion.h1>

      <div className="container mx-auto max-w-3xl space-y-12 px-6">
        {/* Day Sections */}
        {[{ day: "Day 1", events: day1Events }, { day: "Day 2", events: day2Events }, { day: "Day 3", events: day3Events }].map((dayData, dayIndex) => (
          <motion.div
            key={dayIndex}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: dayIndex * 0.2 }}
          >
            {/* Day Heading */}
            <h2 className={`text-3xl font-bold mb-6 ${headingColor}`}>
              {dayData.day}
            </h2>

            {/* Day Events */}
            <div
              className={`${cardBackgroundColor} p-6 rounded-lg shadow-lg relative`}
            >
              {/* Decorative Line */}
              <div className="absolute top-0 left-4 h-full border-l-2 border-dashed border-blue-500"></div>
              {renderEvents(dayData.events)}
            </div>
          </motion.div>
        ))}

        {/* Conditionally render the "View Full Agenda" button if not on the /agenda page */}
        {isNotAgendaPage && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/agenda" passHref>
             <div className="w-56 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md flex items-center justify-center mx-auto space-x-2">
                <span>View Full Agenda</span>
                <FaArrowRight />
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Schedule;

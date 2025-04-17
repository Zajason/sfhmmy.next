import React, { useState } from "react";
import { motion } from "framer-motion";
import { eventsData } from "../data/AgendaData";
import { useTheme } from "../utils/ThemeContext";
import { FaCircle, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/router";
import Link from "next/link";

interface EventData {
  name: string;
  type: string;
  place: string;
  room: string;
  time: string;
  day: string;
}

export const Schedule: React.FC = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const days = ["Παρασκευή", "Σάββατο", "Κυριακή"];
  const [selectedDay, setSelectedDay] = useState<string>(days[0]);

  // Utility to convert time strings to minutes for sorting
  const parseTime = (time: string): number => {
    const [range, period] = time.split(" ");
    const [start] = range.split("-");
    const [h, m] = start.split(":");
    let hours = parseInt(h, 10);
    const minutes = parseInt(m, 10);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  // Group events by day then by place, sorting each group
  const scheduleByDay = days.map((day) => {
    const dayEvents = eventsData.filter((e) => e.day === day) as EventData[];
    const places = Array.from(new Set(dayEvents.map((e) => e.place)));
    const byPlace = places.map((place) => {
      const events = dayEvents
        .filter((e) => e.place === place)
        .sort((a, b) => parseTime(a.time) - parseTime(b.time));
      return { place, events };
    });
    return { day, byPlace };
  });

  // Events renderer
  const renderEvents = (events: EventData[]) =>
    events.map((event, idx) => (
      <motion.div
        key={idx}
        className="flex items-start space-x-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: idx * 0.1 }}
      >
        <FaCircle className="text-blue-500 mt-10" size={10} />
        <div className={`border-l-4 pl-4 ${theme === "dark" ? "border-blue-500" : "border-blue-900"}`}>
          <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-blue-900"}`}>{event.name}</h3>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}><strong>Type:</strong> {event.type}</p>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}><strong>Room:</strong> {event.room}</p>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}><strong>Time:</strong> {event.time}</p>
        </div>
      </motion.div>
    ));

  const bg = theme === "dark" ? "bg-black" : "bg-white";
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-gray-200";
  const headingColor = theme === "dark" ? "text-white" : "text-blue-900";
  const isNotAgenda = router.pathname !== "/agenda";

  // Find data for the currently selected day
  const currentSchedule = scheduleByDay.find((d) => d.day === selectedDay);

  return (
    <div className={`min-h-screen ${bg} py-12`}>
      <motion.h1 className={`text-4xl font-bold text-center mb-6 ${headingColor}`} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        Event Schedule
      </motion.h1>

      {/* Day selector buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-md font-semibold ${
              selectedDay === day
                ? theme === "dark"
                  ? "bg-blue-500 text-white"
                  : "bg-blue-900 text-white"
                : theme === "dark"
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule for selected day */}
      {currentSchedule && (
        <div className="container mx-auto max-w-4xl space-y-12 px-6">
          {currentSchedule.byPlace.map((placeBlock, pi) => (
            <div key={pi} className="mb-10">
              <h2 className={`text-3xl font-semibold mb-4 ${headingColor}`}>{placeBlock.place}</h2>
              <div className={`${cardBg} p-6 rounded-lg shadow-lg relative`}>
                <div className="absolute top-0 left-4 h-full border-l-2 border-dashed border-blue-500"></div>
                {renderEvents(placeBlock.events)}
              </div>
            </div>
          ))}

          {isNotAgenda && (
            <motion.div className="text-center mt-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
              <Link href="/agenda" passHref>
                <div className="w-56 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md flex items-center justify-center mx-auto space-x-2">
                  <span>View Full Agenda</span>
                  <FaArrowRight />
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default Schedule;
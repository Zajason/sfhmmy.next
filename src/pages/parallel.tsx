import React from "react";
import Link from "next/link";
import { useTheme } from "../utils/ThemeContext";
import { ParallelData } from "../data/PrallelData.ts";

export default function Activities() {
  const { theme } = useTheme();
  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const cardBackground = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const borderColor = theme === "dark" ? "border-white" : "border-gray-300";

  return (
    <div className={`${backgroundColor} min-h-screen pt-24 px-6`}>
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className={`text-3xl font-extrabold text-center ${textColor}`}>🎉 Παράλληλες Δραστηριότητες</h1>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ParallelData.map((activity, idx) => (
            <Link
              key={idx}
              href={`/activities/${activity.slug ?? ""}`}
              className={`block border rounded-2xl p-6 transition duration-300 hover:scale-105 ${cardBackground} ${borderColor} border`}
            >
              <h2 className={`text-xl font-semibold mb-2 ${textColor}`}>{activity.name}</h2>
              <p className={`text-sm font-medium mb-1 ${textColor}`}>📍 Τοποθεσία: {activity.location}</p>
              <p className={`text-sm text-gray-500 line-clamp-3`}>{activity.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

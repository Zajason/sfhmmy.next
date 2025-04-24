import React from "react";
import { useRouter } from "next/router";
import { ParallelData } from "./../../data/PrallelData.ts";
import { useTheme } from "../../utils/ThemeContext";

export default function ActivityDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const { theme } = useTheme();

  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const cardBackground = theme === "dark" ? "bg-gray-900" : "bg-gray-100";

  const activity = ParallelData.find(
    (item) => item.slug === slug
  );

  if (!activity) {
    return (
      <div className={`min-h-screen pt-24 px-6 ${backgroundColor}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={`text-2xl font-bold ${textColor}`}>Δραστηριότητα δεν βρέθηκε 😢</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-24 px-6 ${backgroundColor}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className={`text-3xl font-extrabold ${textColor}`}>{activity.name}</h1>
        <p className={`text-sm font-medium ${textColor}`}>📍 Τοποθεσία: {activity.location}</p>
        <div className={`text-base whitespace-pre-line ${textColor}`}>{activity.description}</div>
      </div>
    </div>
  );
}
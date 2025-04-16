import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "../context/authContext"; // Adjust the path as needed

// Motion variants (feel free to modify these)
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

interface Announcement {
  id: number;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
}

const UpdatesFeed: React.FC = () => {
  // Using useAuth() to check for authentication
  const { isSignedIn, isLoading: authLoading } = useAuth();

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Only fetch announcements if the user is authenticated
    if (!isSignedIn) return;

    fetch("https://sfhmmy.gr/api/announcements", {
      credentials: "include", // include cookies for authentication
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch announcements");
        }
        return res.json();
      })
      .then((data: Announcement[]) => {
        setAnnouncements(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load announcements. Are you authenticated?");
        setLoading(false);
      });
  }, [isSignedIn]);

  // Display loading feedback when checking auth status
  if (authLoading) {
    return (
      <div className="bg-black text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <p>Loading user information...</p>
        </div>
      </div>
    );
  }

  // Display an error message if the user is not authenticated
  if (!isSignedIn) {
    return (
      <div className="bg-black text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <p>You must be authenticated to view this page.</p>
        </div>
      </div>
    );
  }

  // Display a loading state for the API call
  if (loading) {
    return (
      <div className="bg-black text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <p>Loading announcements...</p>
        </div>
      </div>
    );
  }

  // Display an error message if the API call fails
  if (error) {
    return (
      <div className="bg-black text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Main view: Display announcements in a styled feed
  return (
    <div className="bg-black text-white py-20">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold">Ανακοινώσεις</h1>
        </motion.div>

        {/* Announcements Feed */}
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <motion.div
              key={announcement.id}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="p-4 rounded-xl shadow-md border border-gray-700 bg-gray-800 text-white"
            >
              <div className="flex flex-wrap gap-2 mb-2">
                {announcement.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold bg-blue-600 text-white rounded-full px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/updates/${announcement.id}`}
                className="font-semibold text-md text-blue-400 hover:underline cursor-pointer"
              >
                {announcement.title}
              </Link>
              <div className="text-sm text-gray-400 mt-1">{announcement.date}</div>
              <p className="text-sm text-gray-300 mt-2">
                {announcement.description.substring(0, 100)}...
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpdatesFeed;

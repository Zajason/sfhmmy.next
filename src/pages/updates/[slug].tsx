import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import { getAnnouncements } from "../../apis/AuthApi.js"; // Adjust path as needed

type Announcement = {
  id: number;
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string | string[];
  content: string;
};

const AnnouncementPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (slug && typeof slug === "string") {
      getAnnouncements()
        .then((response) => {
          // The API returns an object like: { announcements: [ ... ] }
          let announcementsData: Announcement[] = [];
          if (response.announcements && Array.isArray(response.announcements)) {
            announcementsData = response.announcements;
          } else if (response.data && Array.isArray(response.data)) {
            announcementsData = response.data;
          } else {
            throw new Error("Announcements data is not an array");
          }

          // Find the announcement that matches the slug (match by slug property or id)
          const found = announcementsData.find(
            (ann) => ann.slug === slug || String(ann.id) === slug
          );

          if (found) {
            // If tags is a string, split it by comma into an array.
            if (typeof found.tags === "string") {
              found.tags = found.tags.split(",").map((t: string) => t.trim());
            }
            setAnnouncement(found);
          } else {
            setAnnouncement(null);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Error fetching announcement");
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading announcement...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-bold text-xl">
        {error}
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-bold text-xl">
        Announcement not found.
      </div>
    );
  }

  return (
    <div className="bg-black text-white py-20">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold">{announcement.title}</h1>
          <div className="mt-4 text-gray-400">{announcement.date}</div>
          <div className="flex justify-center space-x-2 mt-4">
            {Array.isArray(announcement.tags) &&
              announcement.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold bg-blue-600 text-white rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="prose prose-invert mx-auto text-lg"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: announcement.content }} />
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="mt-10 text-center"
        >
          <Link
            href="/updates"
            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 shadow-lg inline-block"
          >
            Back to Announcements
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AnnouncementPage;

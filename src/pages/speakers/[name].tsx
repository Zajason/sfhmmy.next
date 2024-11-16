import React from "react";
import { useRouter } from "next/router";
import { speakersData } from "../../data/speakersData"; // Adjust the path as necessary
import { useTheme } from "../../utils/ThemeContext"; // Ensure ThemeContext is correctly implemented
import Image from "next/image"; // Import Next.js Image component for optimized images

const SpeakerDetail = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { name } = router.query; // Access dynamic route parameter
  const speaker = speakersData.find((s) => s.name === name);

  // Set colors based on the theme
  const backgroundColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const secondaryTextColor =
    theme === "dark" ? "text-gray-400" : "text-gray-600";

  if (!speaker) {
    return (
      <div className={`${textColor} text-center p-4`}>Speaker not found</div>
    );
  }

  return (
    <div
      className={`w-full min-h-screen ${backgroundColor} p-4 flex flex-col justify-center items-center`}
    >
      {/* Speaker Image */}
      <Image
        src={
          speaker.image.startsWith("/")
            ? speaker.image
            : `/images/${speaker.image}`
        }
        alt={speaker.name}
        width={192} // Matches Tailwind `h-48 w-48`
        height={192}
        className="rounded-full mb-6 object-cover"
      />

      {/* Speaker Details */}
      <h1
        className={`text-3xl sm:text-4xl md:text-5xl mb-4 text-center ${textColor}`}
      >
        {speaker.name}
      </h1>
      <h2
        className={`text-xl sm:text-2xl md:text-3xl ${secondaryTextColor} mb-4 text-center`}
      >
        {speaker.title}
      </h2>
      <p
        className={`text-base sm:text-lg md:text-xl ${secondaryTextColor} mb-8 text-center px-4 md:px-16`}
      >
        {speaker.description}
      </p>

      {/* Social Links */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 items-center mb-8">
        {speaker.linkedin && (
          <a
            href={speaker.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center text-blue-400 underline mb-2 sm:mb-0`}
          >
            <Image
              src="/images/socials/linked.png"
              alt="LinkedIn Logo"
              width={24}
              height={24}
              className="mr-2"
            />
            LinkedIn
          </a>
        )}
        {speaker.facebook && (
          <a
            href={speaker.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center text-blue-400 underline mb-2 sm:mb-0`}
          >
            <Image
              src="/images/socials/facebook.png"
              alt="Facebook Logo"
              width={24}
              height={24}
              className="mr-2"
            />
            Facebook
          </a>
        )}
        {speaker.github && (
          <a
            href={speaker.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center text-blue-400 underline`}
          >
            <Image
              src="/images/socials/github-removebg-preview.png"
              alt="GitHub Logo"
              width={24}
              height={24}
              className="mr-2"
            />
            GitHub
          </a>
        )}
      </div>

      {/* Go Back Button */}
      <button
        onClick={() => router.back()} // Use Next.js's router.back()
        className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default SpeakerDetail;

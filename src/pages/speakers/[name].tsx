import React from "react";
import { useRouter } from "next/router";
import { speakersData } from "../../data/speakersData";
import { useTheme } from "../../utils/ThemeContext";
import Image from "next/image";

const SpeakerDetail = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { name } = router.query;
  const speaker = speakersData.find((s) => s.name === name);

  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const secondaryTextColor =
    theme === "dark" ? "text-gray-400" : "text-gray-600";

  if (!speaker) {
    return (
      <div className={`${textColor} text-left p-4`}>Speaker not found</div>
    );
  }

  return (
    <div
      className={`w-full min-h-screen ${backgroundColor} pt-24 p-4 flex flex-col items-center`} // pt-24 adds top space
    >
      <div className="w-full max-w-3xl flex flex-col items-start px-4 sm:px-8">
        {/* Speaker Image */}
        <div className="self-center mb-6">
          <Image
        src={
          speaker.image.startsWith("/")
            ? speaker.image
            : `/images/${speaker.image}`
        }
        alt={speaker.name}
        width={192}
        height={192}
        className="rounded-full object-cover w-48 h-48"
          />
        </div>

        {/* Speaker Details */}
        <h1 className={`text-3xl sm:text-4xl md:text-5xl mb-4 ${textColor}`}>
          {speaker.name}
        </h1>
        <h2
          className={`text-xl sm:text-2xl md:text-3xl ${secondaryTextColor} mb-4`}
        >
          {speaker.title}
        </h2>

        <p className={`text-base sm:text-lg md:text-xl ${secondaryTextColor} mb-8`}>
          {speaker.description.split("\n").map((line, lineIndex) => (
            <React.Fragment key={lineIndex}>
              {line.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  const clean = part.slice(2, -2);
                  return (
                    <React.Fragment key={i}>
                      <br />
                      <br />
                      <span className="font-bold underline">{clean}</span>
                      <br />
                    </React.Fragment>
                  );
                }
                return <React.Fragment key={i}>{part}</React.Fragment>;
              })}
              <br />
            </React.Fragment>
          ))}
        </p>

        {/* Go Back Button */}
        <button
          onClick={() => router.back()}
          className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default SpeakerDetail;

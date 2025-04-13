import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { workshopsData } from "../../data/WorkshopsData";
import {
  FaBolt,
  FaCogs,
  FaMicrochip,
  FaLaptop,
  FaSatelliteDish,
  FaBrain,
  FaCheck,
} from "react-icons/fa";

type Workshop = {
  name: string;
  slug: string;
  room: string;
  time: string;
  max_participants: number;
  icon: string;
  description: string;
};

interface WorkshopProps {
  workshop: Workshop;
}

// Map the icon name from your data to a styled react-icon component.
const iconMap: Record<string, JSX.Element> = {
  FaBolt: <FaBolt className="text-yellow-400 text-6xl mb-4" />,
  FaCogs: <FaCogs className="text-gray-400 text-6xl mb-4" />,
  FaMicrochip: <FaMicrochip className="text-green-400 text-6xl mb-4" />,
  FaLaptop: <FaLaptop className="text-blue-400 text-6xl mb-4" />,
  FaSatelliteDish: <FaSatelliteDish className="text-purple-400 text-6xl mb-4" />,
  FaBrain: <FaBrain className="text-pink-400 text-6xl mb-4" />,
};

const WorkshopDetails: React.FC<WorkshopProps> = ({ workshop }) => {
  const IconComponent = iconMap[workshop.icon] || null;
  // Simulate the number of spots filled for this workshop.
  const [spotsFilled, setSpotsFilled] = useState<number>(0);
  // This state indicates if the user has registered.
  const [registered, setRegistered] = useState<boolean>(false);

  useEffect(() => {
    // For demonstration, we simulate a random number of participants filled.
    // This could be replaced with actual data from a backend.
    const filled = Math.floor(Math.random() * (workshop.max_participants + 1));
    setSpotsFilled(filled);
  }, [workshop.max_participants]);

  // Determine if the workshop is full.
  const isFull = spotsFilled >= workshop.max_participants;

  // This function is a stub for later registration functionality.
  const handleRegister = () => {
    // Only allow registration if not full and not already registered.
    if (!isFull && !registered) {
      setRegistered(true);
      // Optionally, increase spotsFilled state here if desired:
      // setSpotsFilled(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 pt-20">
      <div className="max-w-2xl mx-auto bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
        {IconComponent && (
          <div className="flex justify-center">
            {IconComponent}
          </div>
        )}
        <h1 className="text-4xl font-bold text-center mb-4">
          {workshop.name}
        </h1>
        <div className="mb-6">
          <p className="text-lg">
            <span className="font-semibold">Time:</span> {workshop.time}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Room:</span> {workshop.room}
          </p>
        </div>
        <div className="mb-6">
          <p className="text-base">{workshop.description}</p>
        </div>
        {/* Display capacity information */}
        <div className="mb-6 text-center">
          <p className="text-lg font-semibold">
            {spotsFilled} / {workshop.max_participants} spots filled
          </p>
        </div>
        {/* Registration Button */}
        <div className="flex justify-center mb-6">
          {isFull ? (
            <button
              disabled
              className="bg-blue-200 px-6 py-3 rounded-md text-white cursor-not-allowed"
            >
              Full
            </button>
          ) : (
            <button
              onClick={handleRegister}
              className={`inline-block px-6 py-3 rounded-md text-white transition-colors flex items-center space-x-2 ${
                registered ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {registered && <FaCheck />}
              <span>{registered ? "Registered" : "Register"}</span>
            </button>
          )}
        </div>
        <div className="flex justify-center">
          <Link
            href="/workshops"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md"
          >
            &larr; Back to Workshops
          </Link>
        </div>
      </div>
    </div>
  );
};

// Generate a path for each workshop slug.
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = workshopsData.map((workshop) => ({
    params: { slug: workshop.slug },
  }));

  return {
    paths,
    fallback: false, // Returns 404 for non-existing workshops
  };
};

// Fetch the corresponding workshop details based on the slug.
export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;
  const workshop = workshopsData.find((workshop) => workshop.slug === slug);

  if (!workshop) {
    return { notFound: true };
  }

  return {
    props: {
      workshop,
    },
  };
};

export default WorkshopDetails;

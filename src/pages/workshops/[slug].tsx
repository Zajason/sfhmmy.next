import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { workshopFetch } from "../../apis/AuthApi";
import { FaCheck } from "react-icons/fa";

// Define Workshop interface matching API response
interface Workshop {
  workshop_id: string;  // now string to accommodate UUIDs
  title: string;
  description: string;
  date: string;
  hour: string;
  availability: number;
  image_url: string;
  max_participants: number;
}

const WorkshopDetails: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Use slug directly as workshop_id (string)
  const workshopId = Array.isArray(slug) ? slug[0] : slug;

  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [spotsFilled, setSpotsFilled] = useState<number>(0);
  const [registered, setRegistered] = useState<boolean>(false);

  useEffect(() => {
    if (!workshopId) return;
    async function fetchWorkshop() {
      try {
        const data: Workshop[] = await workshopFetch();
        const match = data.find((w) => w.workshop_id === workshopId);
        setWorkshop(match || null);
        if (match) {
            setSpotsFilled(match.max_participants - match.availability);
        }
      } catch (err) {
        console.error("Error fetching workshops:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkshop();
  }, [workshopId]);

  if (loading) {
    return <div className="text-center text-white py-24">Loading workshop...</div>;
  }
  if (!workshop) {
    return <div className="text-center text-white py-24">Workshop not found</div>;
  }

  const isFull = spotsFilled >= workshop.max_participants;
  const handleRegister = () => {
    if (!isFull && !registered) {
      setRegistered(true);
      setSpotsFilled((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 pt-20">
      <div className="max-w-2xl mx-auto bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
      <img
                src={`/images/${workshop.image_url}`}
                alt={workshop.title}
                className="w-full max-w-[500px] max-h-[500px] object-contain rounded mb-4"
              />
        <h1 className="text-4xl font-bold text-center mb-4">
          {workshop.title}
        </h1>
        {/* All details come inside description */}
        <div className="mb-6">
          <p className="text-base whitespace-pre-line">
            <div
              dangerouslySetInnerHTML={{ __html: workshop.description }}
            />
          </p>
        </div>
        <div className="mb-6 text-center">
          <p className="text-lg font-semibold">
            {spotsFilled} / {workshop.max_participants} spots filled
          </p>
        </div>
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

export default WorkshopDetails;

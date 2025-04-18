import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { workshopFetch, workshopEnroll, workshopUnenroll, getUserWorkshops } from "../../apis/AuthApi";
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
  const workshopId = Array.isArray(slug) ? slug[0] : slug;

  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [spotsFilled, setSpotsFilled] = useState<number>(0);
  const [registered, setRegistered] = useState<boolean>(false);
  const [enrolling, setEnrolling] = useState<boolean>(false);
  const [unenrolling, setUnenrolling] = useState<boolean>(false);

  useEffect(() => {
    if (!workshopId) return;
  
    async function fetchWorkshop() {
      setLoading(true);
      try {
        // fire both requests in parallel
        const [allWorkshops, userEnrollments]: [Workshop[], any[]] = await Promise.all([
          workshopFetch(),
          getUserWorkshops()
        ]);
  
        // find the workshop we care about
        const current = allWorkshops.find(w => w.workshop_id === workshopId) || null;
        setWorkshop(current);
  
        if (current) {
          // update spots filled as before
          setSpotsFilled(current.max_participants - current.availability);
  
          // pull out the IDs from your enrollment payload
          // if getUserWorkshops() returns an array of IDs: 
          //   const enrolledIds = userEnrollments as string[];
          // if it returns full objects with a `.pivot.workshop_id`:
          const enrolledIds = userEnrollments.map(e => 
            // pivot might live under e.pivot.workshop_id
            e.pivot?.workshop_id ?? e.workshop_id
          );
  
          // now set registered based on whether the current one is in that list:
          setRegistered(enrolledIds.includes(workshopId));
        }
      } catch (err) {
        console.error("Error loading workshop + enrollments:", err);
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

  const handleRegister = async () => {
    if (isFull || registered || enrolling || unenrolling) return;

    setEnrolling(true);
    try {
      await workshopEnroll(workshop.workshop_id);
      setRegistered(true);
      setSpotsFilled((prev) => prev + 1);
    } catch (err) {
      console.error("Enrollment failed:", err);
    } finally {
      setEnrolling(false);
    }
  };

  const handleLeave = async () => {
    if (!registered || enrolling || unenrolling) return;

    setUnenrolling(true);
    try {
      await workshopUnenroll(workshop.workshop_id);
      setRegistered(false);
      setSpotsFilled((prev) => prev - 1);
    } catch (err) {
      console.error("Unenrollment failed:", err);
    } finally {
      setUnenrolling(false);
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
        <div className="mb-6">
          <div className="text-base whitespace-pre-line" dangerouslySetInnerHTML={{ __html: workshop.description }} />
        </div>
        <div className="mb-6 text-center">
          <p className="text-lg font-semibold">
            {spotsFilled} / {workshop.max_participants} spots filled
          </p>
        </div>
        <div className="flex justify-center mb-6">
          {isFull && !registered ? (
            <button
              disabled
              className="bg-blue-200 px-6 py-3 rounded-md text-white cursor-not-allowed"
            >
              Full
            </button>
          ) : registered ? (
            <button
              onClick={handleLeave}
              disabled={unenrolling}
              className={`inline-block px-6 py-3 rounded-md text-white transition-colors flex items-center space-x-2 ${
                unenrolling
                  ? "bg-gray-600 cursor-wait"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              <span>
                {unenrolling ? "Leaving…" : "Leave"}
              </span>
            </button>
          ) : (
            <button
              onClick={handleRegister}
              disabled={enrolling}
              className={`inline-block px-6 py-3 rounded-md text-white transition-colors flex items-center space-x-2 ${
                enrolling
                  ? "bg-gray-600 cursor-wait"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <span>
                {enrolling ? "Registering…" : "Register"}
              </span>
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
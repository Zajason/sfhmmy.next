// pages/workshops/[slug].tsx
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { marked } from "marked";
import Link from "next/link";
import {
  workshopFetch,
  workshopEnroll,
  workshopUnenroll,
  getUserWorkshops,
  joinWaitingList,
  leaveWaitingList,
  getUserWaitingList,
} from "../../apis/AuthApi";

// Define Workshop interface matching API response
interface Workshop {
  workshop_id: string;
  title: string;
  description: string;
  date: string;
  hour: string;            // start time
  end_time: string | null; // end time
  availability: number;     // remaining seats
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

  // enrollment states
  const [registered, setRegistered] = useState<boolean>(false);
  const [enrolling, setEnrolling] = useState<boolean>(false);
  const [unenrolling, setUnenrolling] = useState<boolean>(false);

  // waiting‑list states (sticky)
  const [waitingListed, setWaitingListed] = useState<boolean>(false);
  const [joiningWait, setJoiningWait] = useState<boolean>(false);
  const [leavingWait, setLeavingWait] = useState<boolean>(false);

  const html = workshop ? marked(workshop.description) : "";

  // Fetch details and user statuses
  const fetchWorkshop = useCallback(async () => {
    if (!workshopId) return;
    setLoading(true);
    try {
      const [allWorkshops, userEnrollments, userWaiting]: [Workshop[], any[], any[]] = await Promise.all([
        workshopFetch(),
        getUserWorkshops(),
        getUserWaitingList(),
      ]);

      const match = allWorkshops.find((w) => w.workshop_id === workshopId) ?? null;
      setWorkshop(match);

      if (match) {
        // calculate how many are enrolled
        const filled = match.max_participants - match.availability;
        setSpotsFilled(filled);

        // compute enrolled & waiting IDs
        const enrolledIds = userEnrollments.map((e) => e.pivot?.workshop_id ?? e.workshop_id);
        const waitingIds  = userWaiting   .map((w) => w.pivot?.workshop_id ?? w.workshop_id);

        // enrollment flag (always driven by API)
        setRegistered(enrolledIds.includes(workshopId));

        // waiting‑list flag: once on wait‑list, stay until explicit leave
        setWaitingListed((prev) => prev || waitingIds.includes(workshopId));
      }
    } catch (err) {
      console.error("Error fetching workshop data:", err);
    } finally {
      setLoading(false);
    }
  }, [workshopId]);

  // initial load + polling + focus + route change
  useEffect(() => {
    fetchWorkshop();
  }, [fetchWorkshop]);

  useEffect(() => {
    const id = setInterval(fetchWorkshop, 30000);
    return () => clearInterval(id);
  }, [fetchWorkshop]);

  useEffect(() => {
    window.addEventListener("focus", fetchWorkshop);
    return () => window.removeEventListener("focus", fetchWorkshop);
  }, [fetchWorkshop]);

  useEffect(() => {
    const onComplete = () => fetchWorkshop();
    router.events.on("routeChangeComplete", onComplete);
    return () => router.events.off("routeChangeComplete", onComplete);
  }, [fetchWorkshop, router.events]);

  const isFull = !!workshop && spotsFilled >= workshop.max_participants;

  // Enrollment actions
  const handleRegister = async () => {
    if (!workshop || isFull || registered || enrolling || unenrolling) return;
    setEnrolling(true);
    try {
      await workshopEnroll(workshop.workshop_id);
      await fetchWorkshop();
    } catch (err) {
      console.error("Enrollment failed:", err);
    } finally {
      setEnrolling(false);
    }
  };

  const handleLeave = async () => {
    if (!workshop || !registered || enrolling || unenrolling) return;
    setUnenrolling(true);
    try {
      await workshopUnenroll(workshop.workshop_id);
      await fetchWorkshop();
    } catch (err) {
      console.error("Unenrollment failed:", err);
    } finally {
      setUnenrolling(false);
    }
  };

  // Waiting‑list actions
  const handleJoinWaiting = async () => {
    if (!workshop || !isFull || joiningWait || leavingWait) return;
    setJoiningWait(true);
    try {
      await joinWaitingList(workshop.workshop_id);
      setWaitingListed(true);
      await fetchWorkshop();
    } catch (err) {
      console.error("Join waiting list failed:", err);
    } finally {
      setJoiningWait(false);
    }
  };

  const handleLeaveWaiting = async () => {
    if (!workshop || !waitingListed || joiningWait || leavingWait) return;
    setLeavingWait(true);
    try {
      await leaveWaitingList(workshop.workshop_id);
      setWaitingListed(false);
      await fetchWorkshop();
    } catch (err) {
      console.error("Leave waiting list failed:", err);
    } finally {
      setLeavingWait(false);
    }
  };

  if (loading) {
    return <div className="text-center text-white py-24">Loading workshop…</div>;
  }
  if (!workshop) {
    return <div className="text-center text-white py-24">Workshop not found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-10 pt-20">
      <div className="max-w-2xl mx-auto bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
        <div className="flex flex-col items-center mb-6">
          <img
            src={`/images/${workshop.image_url}`}
            alt={workshop.title}
            className="w-full max-w-[500px] max-h-[500px] object-contain rounded mb-4"
          />
          <h1 className="text-4xl font-bold text-center mb-4">{workshop.title}</h1>
        </div>

        <div className="mb-6 text-center">
          <p className="text-lg">
            <span className="font-semibold">Date:</span> {workshop.date}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Duration:</span> {workshop.hour.slice(0, 5)} – {workshop.end_time ? workshop.end_time.slice(0, 5) : "TBD"}
          </p>
        </div>

        <div className="mb-6">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>

        <div className="mb-6 text-center">
          <p className="text-lg font-semibold">
            {spotsFilled} / {workshop.max_participants} spots filled
          </p>
        </div>

        <div className="flex justify-center mb-6">
          {registered ? (
            <div className="inline-block px-6 py-3 rounded-md text-white bg-green-600 flex items-center space-x-2">
              <span>ENROLLED</span>
            </div>
          ) : (
            <>
              {isFull ? (
                waitingListed ? (
                  <button
                    onClick={handleLeaveWaiting}
                    disabled={leavingWait}
                    className={`inline-block px-6 py-3 rounded-md text-white transition-colors flex items-center space-x-2 ${
                      leavingWait ? "bg-gray-600 cursor-wait" : "bg-purple-600 hover:bg-purple-700"
                    }`}
                  >
                    <span>{leavingWait ? "Leaving…" : "Leave Waiting List"}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleJoinWaiting}
                    disabled={joiningWait}
                    className={`inline-block px-6 py-3 rounded-md text-white transition-colors flex items-center space-x-2 ${
                      joiningWait ? "bg-gray-600 cursor-wait" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    <span>{joiningWait ? "Joining…" : "Join Waiting List"}</span>
                  </button>
                )
              ) : (
                <button
                  onClick={handleRegister}
                  disabled={enrolling}
                  className={`inline-block px-6 py-3 rounded-md text-white transition-colors flex items-center space-x-2 ${
                    enrolling ? "bg-gray-600 cursor-wait" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  <span>{enrolling ? "Registering…" : "Register"}</span>
                </button>
              )}
            </>
          )}
        </div>

        <div className="flex justify-center">
          <Link href="/workshops">
            <a className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md">
              &larr; Back to Workshops
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkshopDetails;

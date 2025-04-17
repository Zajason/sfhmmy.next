import React, { useState, useEffect } from "react";
import { HoverEffect } from "../components/card-hover-effect.tsx";
import { workshopFetch } from "../apis/AuthApi";
import ComingSoon from "../components/ComingSoon";

// Define the Workshop interface to type our fetched data
interface Workshop {
  workshop_id: number;
  title: string;
  description: string;
  date: string;
  hour: string;
  availability: number;
  image_url: string;
  max_participants: number;
}

const WorkshopsPage: React.FC = () => {
  return (
    <>
      <ComingSoon />
    </>
  );
  // const [workshops, setWorkshops] = useState<Workshop[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   async function loadWorkshops() {
  //     try {
  //       const data: Workshop[] = await workshopFetch();
  //       setWorkshops(data);
  //     } catch (error) {
  //       console.error("Error fetching workshops:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   loadWorkshops();
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="text-center text-white py-24">Loading workshops...</div>
  //   );
  // }

  // return (
  //   <div className="bg-black min-h-screen text-white py-24 px-10">
  //     <h1 className="text-4xl font-bold text-center mb-16">Workshops</h1>
  //     {/* Cast items as any to allow JSX descriptions */}
  //     <HoverEffect
  //       className="mt-10"
  //       items={workshops.map((workshop: Workshop) => ({
  //         title: workshop.title,
  //         description: (
  //           <div>
  //             <img
  //               src={`/images/${workshop.image_url}`}
  //               alt={workshop.title}
  //               className="w-full max-w-[500px] max-h-[500px] object-contain rounded mb-4"
  //             />
  //             <p className="text-sm text-gray-400">
  //               Date: {new Date(workshop.date).toLocaleDateString()} at {workshop.hour}
  //             </p>
  //             <p className="text-sm text-gray-400">
  //               Participants: {workshop.max_participants - workshop.availability}/{workshop.max_participants}
  //             </p>
  //           </div>
  //         ),
  //         link: `/workshops/${encodeURIComponent(workshop.workshop_id)}`,
  //       })) as any}
  //     />
  //   </div>
  // );
};

export default WorkshopsPage;

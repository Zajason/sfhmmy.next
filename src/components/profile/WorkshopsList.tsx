import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { ThemeColors, UserData, defaultUserData } from "./types";
import { getUserWorkshops } from "@/apis/AuthApi";

// Local type for workshops returned by API
interface Workshop {
  workshop_id: number;
  title: string;
  description?: string;
  date?: string;
  hour?: string;
  availability?: number;
  image_url?: string;
  max_participants?: number;
  created_at?: string;
  updated_at?: string;
  end_time?: string;
  pivot?: any;
}

interface WorkshopsListProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  themeColors: ThemeColors;
  theme: string;
}

const WorkshopsList: React.FC<WorkshopsListProps> = ({ 
  userData = defaultUserData,
  setUserData, 
  themeColors, 
  theme 
}) => {
  const [isEditingWorkshops, setIsEditingWorkshops] = useState(false);
  const [workshops, setWorkshops] = useState<Workshop[]>(
    (userData.registeredWorkshops as any[]) || []
  );
  const [isLoading, setIsLoading] = useState(true);
  const { textColor, borderColor } = themeColors;

  useEffect(() => {
    let isMounted = true;
    const fetchWorkshops = async () => {
      try {
        const data: Workshop[] = await getUserWorkshops();
        if (isMounted) {
          setWorkshops(data);
          // Store only titles in UserData.registeredWorkshops to match string[]
          setUserData(prev => ({ 
            ...prev, 
            registeredWorkshops: data.map(w => w.title)
          }));
        }
      } catch (error) {
        console.error("Error fetching workshops:", error);
        toast.error("Failed to load your workshops. Please try again later.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchWorkshops();
    return () => { isMounted = false; };
  }, [setUserData]);

  const handleRemoveWorkshop = (indexToRemove: number) => {
    const updated = workshops.filter((_, idx) => idx !== indexToRemove);
    setWorkshops(updated);
    // Update UserData with remaining titles
    setUserData(prev => ({
      ...prev,
      registeredWorkshops: updated.map(w => w.title),
    }));
    toast.success('Workshop removed successfully');
  };

  const toggleEditWorkshops = () => {
    setIsEditingWorkshops(!isEditingWorkshops);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className={`${textColor} text-xl font-bold border-b ${borderColor} pb-2 flex-grow`}>
          Registered Workshops
        </h2>
      </div>

      {isLoading ? (
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} italic`}>Loading workshops...</p>
      ) : (
        workshops.length > 0 ? (
          <ul className="space-y-2">
            {workshops.map((workshop) => (
              <li
                key={workshop.workshop_id}
                className={`p-3 rounded-lg ${theme === "dark" ? "bg-blue-900/20" : "bg-blue-50"} border ${theme === "dark" ? "border-blue-800" : "border-blue-100"}`}
              >
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span className={`${theme === "dark" ? "text-blue-300" : "text-blue-700"}`}>
                    {workshop.title}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} italic`}>
            You haven't registered for any workshops yet.
          </p>
        )
      )}
    </div>
  );
};

export default WorkshopsList;

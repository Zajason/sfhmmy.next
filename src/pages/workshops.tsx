import React, { useEffect } from "react";
import { useRouter } from "next/router";
import RegisterButton from "../components/button";
import { workshopsData } from "../data/WorkshopsData"; // Adjust path if necessary
import NavbarWithBack from "../components/navbar"; // Ensure NavbarWithBack is updated for Next.js
import { useTheme } from "../utils/ThemeContext"; // Ensure the path to ThemeContext is correct
import { useMockAuth } from "../context/mockAuthContext"; // Import global authentication context
import Image from "next/image"; // Import Next.js Image for optimized images

const Workshops = () => {
  const { theme } = useTheme();
  const { signedIn } = useMockAuth(); // Access global authentication state
  const router = useRouter();

  // Redirect to SignIn page if not signed in
  useEffect(() => {
    if (!signedIn) {
      router.push("/signIn");
    }
  }, [signedIn, router]);

  // Set colors based on the theme
  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const cardBackgroundColor = theme === "dark" ? "bg-gray-900" : "bg-gray-200";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const mutedTextColor = theme === "dark" ? "text-gray-400" : "text-gray-600";

  // Render Workshops page only if signed in
  if (!signedIn) {
    return null; // Avoid rendering content before redirecting
  }

  return (
    <div className={`min-h-screen ${backgroundColor}`}>
      {/* Use the NavbarWithBack at the top */}
      <NavbarWithBack />

      <div className={`min-h-screen py-8 px-4 mt-10 ${backgroundColor}`}>
        <h1 className={`${textColor} text-4xl font-bold mb-8 text-center`}>
          Workshops
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workshopsData.map((workshop, index) => (
            <div
              key={index}
              className={`${cardBackgroundColor} p-6 rounded-lg shadow-lg flex flex-col justify-between`}
            >
              {/* Workshop header: Title, room, and date */}
              <div className="flex justify-between items-start">
                <div className={`${textColor}`}>
                  <h2 className="text-2xl font-bold">{workshop.name}</h2>
                  <p className={`text-sm ${mutedTextColor} mt-1`}>
                    <strong>Room:</strong> {workshop.place}
                  </p>
                  <p className={`text-sm ${mutedTextColor} mt-1`}>
                    <strong>Date:</strong> {workshop.time}
                  </p>
                </div>

                {/* Workshop image */}
                <div className="ml-4">
                  <Image
                    src={`${workshop.image}`} // Adjust image path based on location
                    alt={workshop.name}
                    width={96} // Set exact dimensions for optimization
                    height={96}
                    className="rounded-md"
                  />
                </div>
              </div>

              {/* Workshop description */}
              <p className={`${mutedTextColor} mt-4`}>{workshop.description}</p>

              {/* Register button */}
              <div className="mt-6">
                <RegisterButton />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workshops;

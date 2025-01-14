import React from "react";
import Schedule from "../components/agenda"; // Import the Schedule component from the new file

export const AgendaPage = () => {
  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Render the updated Schedule component */}
      <Schedule />
    </div>
  );
};

export default AgendaPage;

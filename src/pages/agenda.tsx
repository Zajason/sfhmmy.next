import React from "react";
import Schedule from "../components/agenda";
import Future from "./future"; // Import the Schedule component from the new file

export const AgendaPage = () => {
  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Render the updated Schedule component */}
      <Future />
      {/* <Schedule />*/}
    </div>
  );
};

export default AgendaPage;

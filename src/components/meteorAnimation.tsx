import { cn } from "../lib/utils.ts";
import React from "react";
import { useTheme } from "../utils/ThemeContext"; // Import the useTheme hook

//TODO: animation looks weird when changing to light mode and also goes through borders somehow fix the old animation to get light mode
export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const { theme } = useTheme(); // Get the current theme

  // Set the meteor and trail colors based on the theme
  const meteorColor = theme === "dark" ? "bg-white" : "bg-blue-900"; // Meteor color
  const trailColor = theme === "dark" ? "from-white" : "from-blue-700"; // Trail color changes based on the theme

  const meteors = new Array(number || 20).fill(true); // Generates an array of meteor elements
  return (
    <>
      {meteors.map((el, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute h-1 w-1 rounded-full",
            meteorColor, // Apply the theme-based color for the meteor itself
            "shadow-md before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%]",
            "before:w-[80px] before:h-[1px] before:bg-gradient-to-r",
            `before:${trailColor} before:to-transparent`, // Use theme-based trail color
            className
          )}
          style={{
            top: Math.floor(Math.random() * 100) + "vh", // Randomly position vertically within the viewport height
            left: Math.floor(Math.random() * 100) + "vw", // Randomly position horizontally within the viewport width
            animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s", // Random delay for each animation
            animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s", // Random duration for each animation
          }}
        ></span>
      ))}
    </>
  );
};

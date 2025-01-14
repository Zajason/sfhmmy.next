import { cn } from "../lib/utils.ts";
import React, { useEffect, useState } from "react";
import { useTheme } from "../utils/ThemeContext"; // Import the useTheme hook

// This component simulates meteors with trails based on the current theme.
export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const { theme } = useTheme(); // Get the current theme
  const [mounted, setMounted] = useState(false); // State to check if the component has mounted

  // Set the meteor and trail colors based on the theme
  const meteorColor = theme === "dark" ? "bg-white" : "bg-blue-900"; // Meteor color
  const trailColor = theme === "dark" ? "from-white" : "from-blue-700"; // Trail color changes based on the theme

  const meteors = new Array(number || 20).fill(true); // Generates an array of meteor elements

  // On mount, update mounted state to trigger a re-render and avoid SSR issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render meteors after the component has mounted (to avoid hydration issues)
  if (!mounted) return null;

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
            top: Math.floor(Math.random() * 100) + "vh", // Ensure meteors stay within the viewport (90% of the height)
            left: Math.floor(Math.random() * 100) + "vw", // Ensure meteors stay within the viewport (90% of the width)
            animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s", // Random delay for each animation
            animationDuration: Math.floor(Math.random() * (10 - 3) + 3) + "s", // Random duration for each animation (between 3 and 10 seconds)
            transition: "opacity 0.5s ease", // Fade effect to improve theme change transition
          }}
        ></span>
      ))}
    </>
  );
};

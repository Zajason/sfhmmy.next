import { cn } from "../lib/utils.ts";
import React, { useEffect, useState } from "react";
import { useTheme } from "../utils/ThemeContext";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const meteorColor = theme === "dark" ? "bg-white" : "bg-blue-900";
  const trailColor = theme === "dark" ? "from-white" : "from-blue-700";

  const meteors = new Array(number || 20).fill(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {meteors.map((el, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute h-1 w-1 rounded-full",
            meteorColor,
            "shadow-md before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%]",
            "before:w-[80px] before:h-[1px] before:bg-gradient-to-r",
            `before:${trailColor} before:to-transparent`,
            className
          )}
          style={{
            // Limit positioning to prevent overflow
            top: Math.floor(Math.random() * 100) + "vh",
            left: Math.floor(Math.random() * 90) + "vw", // Limit to 90% to account for trail width
            animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
            animationDuration: Math.floor(Math.random() * (10 - 3) + 3) + "s",
            transition: "opacity 0.5s ease",
          }}
        ></span>
      ))}
    </div>
  );
};
"use client";

import { cn } from "../lib/utils.ts";
import React, { useEffect, useState } from "react";
import { useTheme } from "../utils/ThemeContext"; // Import the theme context

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
  onClick, // Add onClick as a prop
}: {
  items: {
   
    name: string;
    title: string;
    image: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  onClick?: (name: string) => void;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);
  const { theme } = useTheme(); // Get the current theme

  // Trigger the animation after the component mounts
  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplicate items to allow continuous scrolling
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true); // Start the animation
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "60s");
      }
    }
  };

  // Determine styles based on the theme
  const cardBackground =
    theme === "dark"
      ? "linear-gradient(180deg, var(--slate-800), var(--slate-900))"
      : "linear-gradient(180deg, var(--gray-200), var(--gray-300))";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";
  const subtitleColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const quoteColor = theme === "dark" ? "text-gray-200" : "text-gray-800";

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 overflow-hidden",
        className
      )}
    >
    {/* Left and Right Fading Effect */}
    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent pointer-events-none z-30" />
    <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none z-30" />

      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll", // Apply animation class when the animation starts
          pauseOnHover && "hover:[animation-play-state:paused]" // Pause on hover
        )}
      >
        {items.map((item, idx) => (
          <li
            key={`${item.name}-${idx}`}
            className={`cursor-pointer w-[350px] max-w-full relative rounded-2xl border border-slate-700 p-4 md:w-[450px] ${textColor}`}
            onClick={() => onClick?.(item.name)} // Handle click event
            style={{
              background: cardBackground,
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-24 w-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h2 className={`text-lg ${textColor}`}>{item.name}</h2>
            <p className={`text-sm ${subtitleColor}`}>{item.title}</p>
           
          </li>
        ))}
      </ul>
    </div>
  );
};

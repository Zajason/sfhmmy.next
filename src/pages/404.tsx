//meme page for when the link doesnt exist

import React from "react";
import { Meteors } from "../components/meteorAnimation.tsx";

const NotFoundPage = () => {
  return (
    <div className="relative w-full h-screen bg-gray-900 flex flex-col justify-center items-center">
      {/* Meteor animation */}
      <div className="absolute inset-0 z-0">
        <Meteors number={50} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* 404 Large Text */}
        <h1 className="text-white text-9xl font-extrabold mb-8">404</h1>

        <p className="text-gray-400 text-xl mb-8">
          Oops, the page you are looking for is not found!
        </p>

        {/* Travolta GIF */}
        <div className="w-full flex justify-center">
          <img
            src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExODl0a3hieWV4bWt5dThtYjFkNDlud2JtcjN3b2d1MmY0bHVsc3RocyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UdM6BoaQyIZHMU7YHu/giphy.gif" // Replace with your local or hosted link
            alt="Confused Travolta"
            className="w-64 h-64 sm:w-96 sm:h-96 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

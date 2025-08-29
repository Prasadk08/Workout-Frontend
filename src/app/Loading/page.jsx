"use client";
import React from "react";

const Loading = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white">
      <img
      className="animate-bounce"
        src="/loadingIcon.png"
        height="60px"
        width="60px"

      />
      <p className="text-lg font-semibold text-[#FF527B] animate-pulse">Loading...</p>
    </div>
  );
};

export default Loading;

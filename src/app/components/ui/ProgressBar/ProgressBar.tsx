"use client";

import React from "react";

function ProgressBar({
  percentage,
  fillBackground,
  background = "#FFFFFF66",
  width = "53px",
}: {
  percentage: number;
  background?: string;
  fillBackground: string;
  width?: string;
}) {
  return (
    <div
      className="relative h-[6px] rounded-[2px]"
      style={{
        width: width,
        background: background,
      }}
    >
      <div
        className="absolute top-0 left-0 h-[6px] rounded-[2px]"
        style={{
          width: `${percentage}%`,
          background: fillBackground,
        }}
      ></div>
    </div>
  );
}

export default ProgressBar;

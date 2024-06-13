"use client";

import React from "react";

function ProgressBar({
  percentage,
  fillBackground,
  background = "bg-[#FFFFFF66]",
  width = "w-[53px]",
}: {
  percentage: number;
  background?: string;
  fillBackground: string;
  width?: string;
}) {
  return (
    <div className={`relative h-[6px] rounded-[2px] ${width} ${background}`}>
      <div
        className={`absolute top-0 left-0 h-[6px] rounded-[2px] ${fillBackground} ${percentage}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;

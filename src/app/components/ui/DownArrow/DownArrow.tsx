import React from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";

const DownArrow = () => {
  const isDark = useSelector(selectIsDark);
  return (
    <svg
      width="8"
      height="4"
      viewBox="0 0 8 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.99935 3.66699L7.33268 0.333659L0.666016 0.333659L3.99935 3.66699Z"
        fill={isDark ? "white" : "#353570"}
      />
    </svg>
  );
};

export default DownArrow;

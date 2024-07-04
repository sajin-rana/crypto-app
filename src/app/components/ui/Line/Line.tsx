import React from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";

const Line = () => {
  const isDark = useSelector(selectIsDark);
  return (
    <div
      className={`mt-[10px] sm:mt-[20px] mb-[10px] sm:mb-[20px] w-[full] border-b-[1px] ${
        isDark ? "border-[#FFFFFF1A] " : "border-[#494982]"
      }`}
    />
  );
};

export default Line;

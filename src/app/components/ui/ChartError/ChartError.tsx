import React from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";

const ChartError = () => {
  const isDark = useSelector(selectIsDark);
  return (
    <div className="h-[100%] flex items-center justify-center">
      <p
        className={`${
          isDark ? "text-[#ffffff]" : "text-[#181825]"
        } font-[500] sm:font-[700] text-[18px] sm:text-[28px] `}
      >
        Oops! Something went wrong
      </p>
    </div>
  );
};

export default ChartError;

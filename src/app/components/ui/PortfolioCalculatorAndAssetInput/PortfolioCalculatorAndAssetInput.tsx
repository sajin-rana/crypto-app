import React from "react";
import { useSelector } from "react-redux";
import DownArrow from "../DownArrow/DownArrow";
import { handleKeyDown } from "@/app/utils/utils";
import { selectIsDark } from "@/lib/features/cryptoSlice";

const PortfolioCalculatorAndAssetInput = ({
  style,
  value,
  handleChange,
  setterFunction,
  placeholder = "Select coins",
}: {
  value: any;
  style: string;
  handleChange: any;
  setterFunction?: any;
  placeholder?: string;
}) => {
  const isDark = useSelector(selectIsDark);
  return (
    <div
      className={`${style} h-[44px] rounded-[4px] p-[8px] flex items-center justify-between relative ${
        isDark ? "bg-[#191925]" : "bg-[#EBEBFD]"
      }`}
    >
      <input
        type="text"
        className={`h-full w-full border-0 focus:outline-none  placeholder:w-400 placeholder:text-[16px] ${
          isDark
            ? "bg-[#191925] placeholder-[#D1D1D6]"
            : "bg-[#EBEBFD] placeholder-[#424286]"
        }`}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        onKeyDown={(e) => handleKeyDown(e, setterFunction)}
      />
      <DownArrow />
    </div>
  );
};

export default PortfolioCalculatorAndAssetInput;

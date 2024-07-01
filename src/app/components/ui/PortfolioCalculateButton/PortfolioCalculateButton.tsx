import React from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";

const PortfolioCalculateButton = ({
  isValueSelected,
  handleCalculation,
}: {
  handleCalculation: any;
  isValueSelected: boolean;
}) => {
  const isDark = useSelector(selectIsDark);
  return (
    <button
      className={`w-full h-[45px] text-[16px] font-[500] text-[#ffffff] flex items-center justify-center rounded-[6px] mt-[16px] ${
        isDark ? "darkGlowBackground" : "lightGlowBackground"
      }`}
      onClick={handleCalculation}
    >
      {`Calculate (${isValueSelected ? "VCA" : "DCA"})`}
    </button>
  );
};

export default PortfolioCalculateButton;

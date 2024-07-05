import React from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";

const PortfolioValueAndDollarButton = ({
  isValueSelected,
  isDollarSelected,
  setIsValueSelected,
  setIsDollarSelected,
}: {
  setIsValueSelected: any;
  isValueSelected: boolean;
  setIsDollarSelected: any;
  isDollarSelected: boolean;
}) => {
  const isDark = useSelector(selectIsDark);
  const darkValueColor = isValueSelected
    ? "darkGlowBackground"
    : "bg-[#232336]";
  const darkDollorColor = isDollarSelected
    ? "darkGlowBackground"
    : "bg-[#232336]";
  const lightValueColor = isValueSelected
    ? "text-[#ffffff] lightGlowBackground"
    : "text-[#B0B0EB] bg-[#EBEBFD]";
  const lightDollarColor = isDollarSelected
    ? "text-[#ffffff] lightGlowBackground"
    : "text-[#B0B0EB] bg-[#EBEBFD]";

  const valueColor = isDark ? darkValueColor : lightValueColor;
  const dollorColor = isDark ? darkDollorColor : lightDollarColor;

  function handleClick(buttonName: string) {
    if (buttonName === "value") {
      setIsValueSelected((isSelected: boolean) => !isSelected);
      setIsDollarSelected((isSelected: boolean) => !isSelected);
    } else if (buttonName === "dollar") {
      setIsValueSelected((isSelected: boolean) => !isSelected);
      setIsDollarSelected((isSelected: boolean) => !isSelected);
    }
  }
  return (
    <div className="flex items-center text-[12px] sm:text-[16px] font-[500] sm:font-[400] text-[#ffffff] mt-[10px] sm:mt-[32px]">
      <button
        onClick={() => handleClick("value")}
        className={`w-[50%] py-[12px] px-[8px] sm:px-[32px] rounded-[6px] ${valueColor}`}
      >
        Value cost averaging
      </button>
      <button
        onClick={() => handleClick("dollar")}
        className={`w-[50%] py-[12px] px-[8px] sm:px-[32px] rounded-[6px] ${dollorColor}`}
      >
        Dollar cost averaging
      </button>
    </div>
  );
};

export default PortfolioValueAndDollarButton;

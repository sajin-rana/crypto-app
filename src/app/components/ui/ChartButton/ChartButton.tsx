import React from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";

function selectedButtonStyle(isDark: boolean) {
  if (isDark) {
    return "text-[#E4E4F0] darkGlowBackground bg-[#42428A] ";
  } else {
    return "text-[#181825] lightGlowBackground bg-[#42428A]";
  }
}

function unSelectedButtonStyle(isDark: boolean) {
  return isDark ? "text-[#A7A7CC]" : "text-[#424286] ";
}

const ChartButton = ({ days, setDays }: { days: number; setDays: any }) => {
  const isDark = useSelector(selectIsDark);
  const daysNumber = [1, 7, 14, 30, 91, 182, 365];
  const buttonOptions = ["1D", "7D", "14D", "1M", "3M", "6M", "1Y"];

  return (
    <div
      className={` flex mt-[10px] sm:mt-[40px]  items-center  justify-around  p-[4px] gap-[8px] rounded-[6px] w-[343px] sm:w-[463px] h-[42px] ${
        isDark ? "bg-[#232336]" : "bg-[#E2E5FB]  "
      } `}
    >
      {buttonOptions.map((item, index) => (
        <p
          key={item}
          className={`cursor-pointer w-[40px] sm:w-[56px]  text-[12px] font-[500] sm:text-[14px] sm:font-[400]  h-[34px] rounded-[6px] sm:py[8px] sm:px-[20px] py[84x] px-[12px] flex items-center justify-center  ${
            days === daysNumber[index]
              ? selectedButtonStyle(isDark)
              : unSelectedButtonStyle(isDark)
          } `}
          onClick={() => setDays(daysNumber[index])}
        >
          {item}
        </p>
      ))}
    </div>
  );
};

export default ChartButton;

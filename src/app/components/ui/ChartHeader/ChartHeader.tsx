import React from "react";
import { useSelector } from "react-redux";
import { month } from "@/app/utils/utils";
import {
  selectCurrency,
  selectIsCompare,
  selectIsDark,
} from "@/lib/features/cryptoSlice";

function paragraphStyle(
  isCompare: boolean,
  isVolume: boolean,
  isDark: boolean,
  paragraph: string
) {
  if (isCompare) {
    if (paragraph === "first-paragraph") {
      if (isVolume) {
        return `sm:font-[700] font-[500] text-[20px] sm:text-[28px] ${
          isDark ? "text-[#ffffff]" : "text-[#181825] "
        }`;
      } else {
        return "hidden";
      }
    } else if (paragraph === "second-paragraph") {
      if (!isVolume) {
        return `sm:font-[700] font-[500] text-[20px] sm:text-[28px] ${
          isDark ? "text-[#ffffff]" : "text-[#181825]"
        }`;
      }
    }
  }
}

const ChartHeader = ({
  name,
  amounts,
  isVolume,
}: {
  name: string;
  amounts: any;
  isVolume: boolean;
}) => {
  const isDark = useSelector(selectIsDark);
  const isCompare = useSelector(selectIsCompare);
  const currencySign = useSelector(selectCurrency);
  const d = new Date();
  const currentMonth = month[d.getMonth()];
  const currentDate = d.getDate();
  const currentYear = d.getFullYear();

  return (
    <div className="flex flex-row justify-between sm:flex-col sm:gap-[10px]">
      {" "}
      <p
        className={`font-[400] text-[16px] sm:text-[20px]  ${
          isDark ? "text-[#D1D1D1]" : "text-[#191932]"
        } ${paragraphStyle(isCompare, isVolume, isDark, "first-paragraph")} `}
      >
        {name}
      </p>
      <div className="">
        <p
          className={`sm:font-[700] font-[500] text-[20px] sm:text-[28px] ${
            isDark ? "text-[#ffffff]" : "text-[#181825]"
          } ${isCompare ? "hidden" : ""}`}
        >
          {currencySign.sign}
          {amounts}
          {}
        </p>
        <p
          className={`font-[400] text-[12px] sm:text-[16px] ${
            isDark ? "text-[#B9B9BA]" : "text-[#424286]"
          } ${paragraphStyle(isCompare, isVolume, isDark, "second-paragraph")}`}
        >
          {currentMonth} {currentDate}, {currentYear}
        </p>
      </div>
    </div>
  );
};

export default ChartHeader;

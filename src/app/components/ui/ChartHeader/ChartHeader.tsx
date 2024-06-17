import React from "react";
import { useSelector } from "react-redux";
import {
  selectCurrency,
  selectIsCompare,
  selectIsDark,
} from "@/lib/features/cryptoSlice";
import { month } from "@/app/utils/utils";

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

  function firstParagraphStyle() {
    if (isCompare) {
      if (isVolume) {
        return `font-[700] text-[28px] ${
          isDark ? "text-[#ffffff]" : "text-[#181825] "
        }`;
      } else {
        return "hidden";
      }
    }
  }

  function thirdParagraphStyle() {
    if (isCompare) {
      if (isVolume) {
        return "";
      } else {
        return `font-[700] text-[28px] ${
          isDark ? "text-[#ffffff]" : "text-[#181825]"
        }`;
      }
    }
  }
  return (
    <div>
      {" "}
      <p
        className={`font-[400] text-[20px]  ${
          isDark ? "text-[#D1D1D1]" : "text-[#191932]"
        } ${firstParagraphStyle()} `}
      >
        {name}
      </p>
      <p
        className={`font-[700] text-[28px] mt-[10px] ${
          isDark ? "text-[#ffffff]" : "text-[#181825]"
        } ${isCompare ? "hidden" : ""}`}
      >
        {currencySign.sign}
        {amounts}
        {}
      </p>
      <p
        className={`font-[400] text-[16px] ${
          isDark ? "text-[#B9B9BA]" : "text-[#424286]"
        } ${thirdParagraphStyle()}`}
      >
        {currentMonth} {currentDate}, {currentYear}
      </p>
    </div>
  );
};

export default ChartHeader;

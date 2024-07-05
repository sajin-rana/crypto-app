import React, { useRef } from "react";
import { useSelector } from "react-redux";
import CalendarSvg from "../CalendarSvg/CalendarSvg";
import { handleCalendarClick } from "@/app/utils/utils";
import { selectIsDark } from "@/lib/features/cryptoSlice";
import PortfolioTooltip from "../PortfolioTooltip/PortfolioTooltip";

const PortfolioDateAndQuantity = ({
  endDateAndTime,
  startDateAndTime,
  setEndDateAndTime,
  setStartDateAndTime,
}: {
  setEndDateAndTime: any;
  endDateAndTime: string;
  setStartDateAndTime: any;
  startDateAndTime: string;
}) => {
  const isDark = useSelector(selectIsDark);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  return (
    <div className="flex items-center w-full justify-between mt-[10px] sm:mt-[16px]">
      <div className="block sm:flex w-full items-center gap-[16px]">
        <div
          className={`h-[36px] w-full sm:w-[260px] rounded-[8px] p-[16px] flex items-center justify-between  gap-[8px] ${
            isDark ? "bg-[#191932]" : "bg-[#F3F5F9]"
          }`}
        >
          <div
            onClick={() => handleCalendarClick(startDateRef)}
            className={`h-[20px] w-[20px] rounded-[4px] flex justify-center items-center cursor-pointer ${
              isDark ? "bg-[#2C2C4A]" : "bg-[#B0B0EB]"
            }`}
          >
            <CalendarSvg />
          </div>
          <input
            ref={startDateRef}
            type="datetime-local"
            value={startDateAndTime}
            placeholder="Start date and time"
            onChange={(e) => setStartDateAndTime(e.target.value)}
            className={`outline-none portfolio-date-input text-[14px] sm:text-[16px] font-[500] overflow-scroll ${
              isDark
                ? "bg-[#191932] text-[#01F1E3]"
                : "bg-[#F3F5F9] text-[#00B1A7]"
            }`}
          />
          <PortfolioTooltip
            dataTooltipId="start-date-and-time"
            content="Start date and time of investments."
          />
        </div>
        <div
          className={`h-[36px] mt-[10px] sm:mt-[0px] w-full sm:w-[260px]  rounded-[8px] p-[16px] flex items-center justify-between  gap-[8px] ${
            isDark ? "bg-[#191932]" : "bg-[#F3F5F9]"
          }`}
        >
          <div
            onClick={() => handleCalendarClick(endDateRef)}
            className={`h-[20px] w-[20px] rounded-[4px] flex justify-center items-center cursor-pointer ${
              isDark ? "bg-[#2C2C4A]" : "bg-[#B0B0EB]"
            }`}
          >
            <CalendarSvg />
          </div>
          <input
            ref={endDateRef}
            type="datetime-local"
            value={endDateAndTime}
            placeholder="End date and time"
            onChange={(e) => setEndDateAndTime(e.target.value)}
            className={`outline-none portfolio-date-input text-[14px] sm:text-[16px] font-[500] overflow-scroll ${
              isDark
                ? "bg-[#191932] text-[#01F1E3]"
                : "bg-[#F3F5F9] text-[#00B1A7]"
            }`}
          />
          <PortfolioTooltip
            dataTooltipId="end-date-and-time"
            content="End date and time of investments."
          />
        </div>
      </div>
      <div
        className={` items-center justify-center w-[83px] h-[36px] rounded-[8px] hidden sm:flex ${
          isDark ? "bg-[#191932]" : "bg-[#F3F5F9]"
        }`}
      >
        <p
          className={`font-[500] text-[16px] ${
            isDark ? "text-[#01F1E3]" : "text-[#00B1A7]"
          }`}
        >
          Q-ty
        </p>
      </div>
    </div>
  );
};

export default PortfolioDateAndQuantity;

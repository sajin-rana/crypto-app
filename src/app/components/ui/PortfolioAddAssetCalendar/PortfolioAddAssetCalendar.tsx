import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import DownArrow from "../DownArrow/DownArrow";
import CalendarSvg from "../CalendarSvg/CalendarSvg";
import { handleCalendarClick } from "@/app/utils/utils";
import { selectIsDark } from "@/lib/features/cryptoSlice";

const PortfolioAddAssetCalendar = ({
  purchaseDate,
  setPurchaseDate,
}: {
  purchaseDate: any;
  setPurchaseDate: any;
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const isDark = useSelector(selectIsDark);
  const dateRef = useRef(null);

  return (
    <div
      className={`mt-[16px] w-full h-[44px] rounded-[4px] p-[8px] flex items-center justify-between  cursor-pointer ${
        isDark ? "bg-[#191925]" : "bg-[#EBEBFD] "
      }`}
    >
      {showCalendar ? (
        <div className="flex items-center justify-between  gap-[8px]">
          <div
            className={`h-[20px] w-[20px] rounded-[4px] flex justify-center items-center cursor-pointer ${
              isDark ? "bg-[#2C2C4A]" : "bg-[#B0B0EB]"
            }`}
            onClick={() => handleCalendarClick(dateRef)}
          >
            <CalendarSvg />
          </div>
          <input
            type="datetime-local"
            className={`h-full w-full border-0 focus:outline-none  placeholder:w-400 placeholder:text-[16px] portfolio-date-input  ${
              isDark
                ? "bg-[#191925] placeholder-[#D1D1D6]"
                : "bg-[#EBEBFD] placeholder-[#424286]"
            }`}
            placeholder="Purchased date"
            ref={dateRef}
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
        </div>
      ) : (
        <input
          type="text"
          className={`h-full w-full border-0 focus:outline-none  placeholder:w-400 placeholder:text-[16px] cursor-pointer   ${
            isDark
              ? "bg-[#191925] placeholder-[#D1D1D6]"
              : "bg-[#EBEBFD] placeholder-[#424286]"
          }`}
          placeholder="Purchased date"
          value=""
          onClick={() => setShowCalendar((calendar) => !calendar)}
        />
      )}
      <div
        className="cursor-pointer"
        onClick={() => setShowCalendar((calendar) => !calendar)}
      >
        <DownArrow />
      </div>
    </div>
  );
};

export default PortfolioAddAssetCalendar;

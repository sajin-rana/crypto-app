import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import CalendarSvg from "../CalendarSvg/CalendarSvg";
import { selectIsDark } from "@/lib/features/cryptoSlice";
import { useOpenCalendar } from "@/app/customHook/CustomHook";
import { disableFutureDate, handleCalendarClick } from "@/app/utils/utils";

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
  useOpenCalendar(setShowCalendar, dateRef);

  return (
    <div
      className={`mt-[10px] sm:mt-[16px] w-full h-[44px] rounded-[4px] p-[8px] flex items-center justify-between  cursor-pointer ${
        isDark ? "bg-[#191925]" : "bg-[#EBEBFD] "
      }`}
    >
      {showCalendar ? (
        <div className="flex items-center justify-between  gap-[8px]">
          <div
            onClick={() => handleCalendarClick(dateRef)}
            className={`h-[20px] w-[20px] rounded-[4px] flex justify-center items-center cursor-pointer ${
              isDark ? "bg-[#2C2C4A]" : "bg-[#B0B0EB]"
            }`}
          >
            <CalendarSvg />
          </div>
          <input
            ref={dateRef}
            value={purchaseDate}
            type="datetime-local"
            max={disableFutureDate()}
            placeholder="Purchased date"
            onClick={() => handleCalendarClick(dateRef)}
            onChange={(e) => setPurchaseDate(e.target.value)}
            className={`h-full w-full border-0 focus:outline-none  placeholder:w-400 placeholder:text-[14px] sm:placeholder:text-[16px] portfolio-date-input  ${
              isDark
                ? "bg-[#191925] placeholder-[#D1D1D6]"
                : "bg-[#EBEBFD] placeholder-[#424286]"
            }`}
          />
        </div>
      ) : (
        <input
          value=""
          type="text"
          placeholder="Purchased date"
          onClick={() => setShowCalendar((calendar) => !calendar)}
          className={`h-full w-full border-0 focus:outline-none  placeholder:w-400  placeholder:text-[14px] sm:placeholder:text-[16px] cursor-pointer   ${
            isDark
              ? "bg-[#191925] placeholder-[#D1D1D6]"
              : "bg-[#EBEBFD] placeholder-[#424286]"
          }`}
        />
      )}
    </div>
  );
};

export default PortfolioAddAssetCalendar;

import React from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";

export const CoinPageBox = ({ children }: { children: any }) => {
  const isDark = useSelector(selectIsDark);
  return (
    <div
      className={`py-[20px] sm:py-[40px] px-[16px] sm:px-[32px] rounded-[12px] w-full sm:w-[640px] flex flex-col gap-[16px] sm:gap-[32px] ${
        isDark ? "bg-[#1E1932]" : "bg-[white]"
      }`}
    >
      {children}
    </div>
  );
};

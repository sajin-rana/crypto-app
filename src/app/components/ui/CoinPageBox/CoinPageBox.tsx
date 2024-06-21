import React from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";

export const CoinPageBox = ({ children }: { children: any }) => {
  const isDark = useSelector(selectIsDark);
  return (
    <div
      className={`py-[40px] px-[32px] rounded-[12px] w-[640px] flex flex-col gap-[32px] ${
        isDark ? "bg-[#1E1932]" : "bg-[white]"
      }`}
    >
      {children}
    </div>
  );
};

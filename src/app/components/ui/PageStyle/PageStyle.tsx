"use client";
import React from "react";
import { selectIsDark } from "@/lib/features/cryptoSlice";
import { useSelector } from "react-redux";

const PageStyle = ({ children }: { children: any }) => {
  const isDark = useSelector(selectIsDark);
  return (
    <div
      className={`w-full  flex justify-center flex-col items-center ${
        isDark ? "bg-[#13121B]" : "bg-[#F2F5F9]"
      }`}
    >
      <div className="w-[1296px] ">{children}</div>
    </div>
  );
};

export default PageStyle;

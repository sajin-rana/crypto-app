"use client";
import React from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";

const PageStyle = ({ children }: { children: any }) => {
  const isDark = useSelector(selectIsDark);
  return (
    <div
      className={` w-full  flex justify-center flex-col items-center  ${
        isDark ? "bg-[#13121B]" : "bg-[#F2F5F9]"
      }`}
    >
      <div className="min-h-[calc(100vh-136px)] sm:w-[1296px] w-[343px] ">
        {children}
      </div>
    </div>
  );
};

export default PageStyle;

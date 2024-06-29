import React from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";

const PortfolioLine = () => {
  const isDark = useSelector(selectIsDark);
  return (
    <div
      className={` w-[full] border-b-[1px] ${
        isDark ? "border-[#363049] " : "border-[##B0B0EB]"
      }`}
    />
  );
};

export default PortfolioLine;

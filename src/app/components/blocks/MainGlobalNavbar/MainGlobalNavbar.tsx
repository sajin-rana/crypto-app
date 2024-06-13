"use client";
import React from "react";
import CurrencyDropDown from "../../ui/CurrencyDropDown/CurrencyDropDown";
import DarkLightButton from "../../ui/DarkLightButton/DarkLightButton";
import NavBarInput from "../../ui/NavBarInput/NavBarInput";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";
import Logo from "../../ui/Logo/Logo";
import HomePortifolio from "../../ui/HomePortifolio/HomePortifolio";

const MainGlobalNavbar = () => {
  const isDark = useSelector(selectIsDark);
  const svgIsDarkColor = isDark ? "#D1D1D6" : "#424286";
  const isDarkColor = isDark ? "bg-[#191925]" : "bg-[#EBEBFC]";
  const textColor = isDark ? "text-[#D1D1D3]" : "text-[#6464A2]";
  const hoverColor = isDark ? "hover:bg-[rgb(5,5,15)]" : "hover:bg-[white]";
  return (
    <div
      className={`w-full  flex justify-center flex-col items-center ${
        isDark ? "bg-[#13121B]" : "bg-[rgba(255, 255, 255, 1)]"
      }`}
    >
      <div className="text-white pt-6 pb-4 flex justify-between items-center  w-[1296px]">
        <Logo isDark={isDark} />
        <HomePortifolio isDark={isDark} />
        <div className="flex items-center gap-[24px]">
          <NavBarInput
            isDark={isDark}
            svgIsDarkColor={svgIsDarkColor}
            isDarkColor={isDarkColor}
            textColor={textColor}
            hoverColor={hoverColor}
          />
          <CurrencyDropDown
            isDark={isDark}
            svgIsDarkColor={svgIsDarkColor}
            isDarkColor={isDarkColor}
            textColor={textColor}
            hoverColor={hoverColor}
          />
          <DarkLightButton />
        </div>
      </div>
    </div>
  );
};

export default MainGlobalNavbar;

"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Logo from "../../ui/Logo/Logo";
import { selectIsDark } from "@/lib/features/cryptoSlice";
import NavBarInput from "../../ui/NavBarInput/NavBarInput";
import { useWindowWidth } from "@/app/customHook/CustomHook";
import HomePortifolio from "../../ui/HomePortifolio/HomePortifolio";
import DarkLightButton from "../../ui/DarkLightButton/DarkLightButton";
import CurrencyDropDown from "../../ui/CurrencyDropDown/CurrencyDropDown";

const MainGlobalNavbar = () => {
  const [mobileShowInput, setMobileShowInput] = useState(false);
  const isDark = useSelector(selectIsDark);
  const svgIsDarkColor = isDark ? "#D1D1D6" : "#424286";
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1107;
  return (
    <div
      className={`w-full  flex justify-center  flex-col items-center border-none ${
        isDark ? "bg-[#13121B]" : "bg-[rgba(255, 255, 255, 1)]"
      }`}
    >
      <div className="text-white sm:w-[1296px] w-[343px]  pt-4 pb-4 sm:px-4 flex justify-between items-center gap-3">
        <Logo isDark={isDark} />
        {!mobileShowInput && <HomePortifolio isDark={isDark} />}

        <div className="flex items-center  sm:gap-[24px] gap-[3px]">
          <NavBarInput
            isDark={isDark}
            isMobile={isMobile}
            mobileShowInput={mobileShowInput}
            setMobileShowInput={setMobileShowInput}
          />
          <CurrencyDropDown isDark={isDark} svgIsDarkColor={svgIsDarkColor} />
          <DarkLightButton />
        </div>
      </div>
    </div>
  );
};

export default MainGlobalNavbar;

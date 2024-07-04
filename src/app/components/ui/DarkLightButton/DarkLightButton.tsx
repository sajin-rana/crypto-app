"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SunIcon from "../SunIcon/SunIcon";
import MoonIcon from "../MoonIcon/MoonIcon";
import { setLocalStorage } from "@/app/utils/utils";
import { selectIsDark, setIsDark } from "@/lib/features/cryptoSlice";

function DarkLightButton() {
  const isDark = useSelector(selectIsDark);
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(setIsDark(!isDark));
    setLocalStorage("isDark", !isDark);
  }
  return (
    <div>
      <div
        className={`flex items-center justify-center rounded-[12px] cursor-pointer sm:w-[48px] sm:h-[48px] h-[36px] w-[36px] ${
          isDark ? "bg-[#191925] border border-[#FFFFFF0D] " : "bg-[#EBEBFD]"
        } `}
        onClick={handleClick}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </div>
    </div>
  );
}

export default DarkLightButton;

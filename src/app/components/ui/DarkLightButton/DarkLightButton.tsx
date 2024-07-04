"use client";
import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import SunSvg from "../../../assets/SunSvg.svg";
import MoonSvg from "../../../assets/Moonsvg.svg";
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
        <Image src={isDark ? SunSvg : MoonSvg} alt="sun image" />
      </div>
    </div>
  );
}

export default DarkLightButton;

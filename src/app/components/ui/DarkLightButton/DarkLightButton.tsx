"use client";
import React from "react";
import SunSvg from "../../../assets/SunSvg.svg";
import MoonSvg from "../../../assets/Moonsvg.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { selectIsDark, setIsDark } from "@/lib/features/cryptoSlice";
import { setLocalStorage } from "@/app/utils/utils";

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
        className={`flex items-center justify-center p-[11px] rounded-[12px] cursor-pointer ${
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

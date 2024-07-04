"use client";
import { useRef } from "react";
import React, { useState } from "react";
import DropDown from "../DropDown/DropDown";
import SearchIcon from "../SearchIcon/SearchIcon";
import { dropDownColor, handleKeyDown } from "@/app/utils/utils";
import { useHandleClickOutside } from "@/app/customHook/CustomHook";

const NavBarInput = ({
  isDark,
  isMobile,
  mobileShowInput,
  setMobileShowInput,
}: {
  isDark: boolean;
  isMobile: boolean;
  setMobileShowInput: any;
  mobileShowInput: boolean;
}) => {
  const [input, setInput] = useState("");
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const { isDarkColor, textColor } = dropDownColor(isDark);
  const ref: any = useRef();
  useHandleClickOutside(ref, setDropDownOpen);
  useHandleClickOutside(ref, setMobileShowInput);

  function handleChange(e: any) {
    setInput(e.target.value);
    setDropDownOpen(true);
  }

  function showSearchInMobile(isMobile: boolean) {
    if (isMobile) {
      setMobileShowInput(true);
    }
  }

  return (
    <div className="flex flex-col relative  " ref={ref}>
      <div
        className={`flex items-center gap-[12px] ease-in duration-300 transition-[width]  sm:py-[8px] sm:px-[16px] sm:rounded-[6px] border border-[#FFFFFF0D] sm:w-[356px] h-[40px] sm:h-[48px]  ${
          mobileShowInput
            ? "w-[190px]  py-[8px] px-[16px] "
            : " w-[36px] justify-center"
        } rounded-[12px]  ${isDarkColor}`}
        onClick={() => showSearchInMobile(isMobile)}
      >
        <SearchIcon />
        <input
          type="text"
          className={`border-0 focus:outline-none  ease-in duration-300 transition-[width] placeholder:w-400 placeholder:text-[14px]  w-full h-full  sm:block ${
            mobileShowInput ? "block " : "hidden"
          }  ${
            isDark
              ? "placeholder-[#D1D1D6] bg-[#191925]"
              : "placeholder-[#424286] bg-[#EBEBFD]"
          } ${textColor} `}
          value={input}
          placeholder="Search..."
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e, setDropDownOpen)}
        />
      </div>
      {input && dropdownOpen && (
        <DropDown
          input={input}
          isDark={isDark}
          setInput={setInput}
          setMobileShowInput={setMobileShowInput}
        />
      )}
    </div>
  );
};

export default NavBarInput;

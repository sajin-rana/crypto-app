"use client";
import React, { useState } from "react";
import { useRef } from "react";
import DropDown from "../DropDown/DropDown";
import SearchIcon from "../SearchIcon/SearchIcon";
import { useHandleClickOutside } from "@/app/customHook/CustomHook";
import { dropDownColor, handleKeyDown } from "@/app/utils/utils";

const NavBarInput = ({ isDark }: { isDark: boolean }) => {
  const [input, setInput] = useState("");
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const { isDarkColor, textColor } = dropDownColor(isDark);

  function handleChange(e: any) {
    setInput(e.target.value);
    setDropDownOpen(true);
  }

  const ref: any = useRef();
  useHandleClickOutside(ref, setDropDownOpen);

  return (
    <div className="flex flex-col relative" ref={ref}>
      <div
        className={`flex items-center gap-[12px]  py-[8px] px-[16px] rounded-[6px] border border-[#FFFFFF0D] w-[356px] h-[48px] ${isDarkColor}`}
      >
        <SearchIcon />
        <input
          type="text"
          className={`border-0 focus:outline-none  placeholder:w-400 placeholder:text-[14px]  w-full h-full ${
            isDark
              ? "placeholder-[#D1D1D6] bg-[#191925]"
              : "placeholder-[#424286] bg-[#EBEBFD]"
          } ${textColor} `}
          placeholder="Search..."
          value={input}
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e, setDropDownOpen)}
        />
      </div>
      {input && dropdownOpen && (
        <DropDown isDark={isDark} input={input} setInput={setInput} />
      )}
    </div>
  );
};

export default NavBarInput;

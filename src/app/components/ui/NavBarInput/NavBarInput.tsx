"use client";
import React, { useState } from "react";
import DropDown from "../DropDown/DropDown";
import { useRef } from "react";
import { useHandleClickOutside } from "@/app/customHook/CustomHook";

const NavBarInput = ({
  isDark,
  svgIsDarkColor,
  isDarkColor,
  textColor,
  hoverColor,
}: {
  isDark: boolean;
  svgIsDarkColor: string;
  isDarkColor: string;
  textColor: string;
  hoverColor: string;
}) => {
  const [input, setInput] = useState("");
  const [dropdownOpen, setDropDownOpen] = useState(false);

  function handleChange(e: any) {
    setInput(e.target.value);
    setDropDownOpen(true);
  }

  function handleKeyDown(e: any) {
    if (e.key === "Escape") {
      e.currentTarget.blur();
      setDropDownOpen(false);
    }
  }

  const ref: any = useRef();
  useHandleClickOutside(ref, setDropDownOpen);

  return (
    <div className="flex flex-col relative" ref={ref}>
      <div
        className={`flex items-center gap-[12px]  py-[8px] px-[16px] rounded-[6px] border border-[#FFFFFF0D] w-[356px] h-[48px] ${isDarkColor}`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.33366 2.08301C9.49864 2.08296 10.6404 2.40852 11.6302 3.02294C12.62 3.63737 13.4184 4.5162 13.9352 5.56026C14.452 6.60432 14.6668 7.77206 14.5552 8.93168C14.4436 10.0913 14.0101 11.1967 13.3037 12.123L17.2562 16.0772C17.4056 16.2271 17.4924 16.4284 17.4988 16.64C17.5053 16.8516 17.431 17.0578 17.2909 17.2166C17.1509 17.3754 16.9557 17.4749 16.7449 17.495C16.5342 17.5151 16.3236 17.4542 16.1562 17.3247L16.0778 17.2555L12.1237 13.303C11.3345 13.9048 10.4134 14.3099 9.43652 14.485C8.45967 14.6601 7.45518 14.6 6.50616 14.3098C5.55713 14.0195 4.69086 13.5075 3.97903 12.816C3.2672 12.1245 2.73028 11.2734 2.41268 10.3332C2.09508 9.39294 2.00595 8.39061 2.15265 7.4091C2.29935 6.42759 2.67768 5.49513 3.25632 4.68886C3.83496 3.8826 4.59727 3.22572 5.48019 2.77258C6.36311 2.31944 7.34124 2.08306 8.33366 2.08301ZM8.33366 3.74967C7.11808 3.74967 5.95229 4.23256 5.09275 5.0921C4.23321 5.95164 3.75032 7.11743 3.75032 8.33301C3.75032 9.54858 4.23321 10.7144 5.09275 11.5739C5.95229 12.4335 7.11808 12.9163 8.33366 12.9163C9.54923 12.9163 10.715 12.4335 11.5746 11.5739C12.4341 10.7144 12.917 9.54858 12.917 8.33301C12.917 7.11743 12.4341 5.95164 11.5746 5.0921C10.715 4.23256 9.54923 3.74967 8.33366 3.74967Z"
            fill={svgIsDarkColor}
          />
        </svg>

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
          onKeyDown={handleKeyDown}
        />
      </div>
      {input && dropdownOpen && (
        <DropDown
          isDark={isDark}
          isDarkColor={isDarkColor}
          textColor={textColor}
          input={input}
          setInput={setInput}
          hoverColor={hoverColor}
        />
      )}
    </div>
  );
};

export default NavBarInput;

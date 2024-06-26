"use client";
import React, { useState, useRef } from "react";
import { dropDownColor, setLocalStorage } from "@/app/utils/utils";
import { useHandleClickOutside } from "@/app/customHook/CustomHook";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrency, setCurrency } from "@/lib/features/cryptoSlice";
import CurrencyDropLists from "../CurrencyDropLists/CurrencyDropLists";

function CurrencyDropDown({
  isDark,
  svgIsDarkColor,
}: {
  isDark: boolean;
  svgIsDarkColor: string;
}) {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);
  const { isDarkColor, textColor } = dropDownColor(isDark);

  function handleClick(item: any) {
    dispatch(setCurrency(item));
    setLocalStorage("currency", item);
    setDropDownOpen(false);
  }

  const ref: any = useRef();
  useHandleClickOutside(ref, setDropDownOpen);
  return (
    <div className="relative" ref={ref}>
      <button
        className={`flex items-center gap-[8px] py-[12px] px-[16px] rounded-[6px]  border border-[#FFFFFF0D] ${isDarkColor}`}
        onClick={() => setDropDownOpen((isOpen) => !isOpen)}
      >
        <p
          className={`flex items-center justify-center h-[20px] w-[20px] rounded-full  p-3 ${
            isDark ? "text-[black] bg-[white]" : "text-[#EBEBFE] bg-[#353570]"
          }`}
        >
          {currency.sign}
        </p>
        <p className={`${textColor}`}>{currency.name}</p>
        <svg
          width="15"
          height="15"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.99976 4.50024L5.99988 7.50012L3 4.5"
            stroke={svgIsDarkColor}
          />
        </svg>
      </button>
      {dropDownOpen && (
        <CurrencyDropLists
          isDark={isDark}
          handleClick={handleClick}
          currency={currency}
        />
      )}
    </div>
  );
}

export default CurrencyDropDown;

"use client";
import React, { useRef } from "react";
import { handleKeyDown } from "@/app/utils/utils";
import {
  useInputFocus,
  useHandleClickOutside,
} from "@/app/customHook/CustomHook";

const PortfolioInput = ({
  isDark,
  quantity,
  setShowInput,
  handleQuantityChange,
}: {
  isDark: boolean;
  quantity: number;
  setShowInput: any;
  handleQuantityChange: any;
}) => {
  const quantityRef: any = useRef();
  useHandleClickOutside(quantityRef, setShowInput);
  useInputFocus(quantityRef);

  return (
    <input
      type="text"
      value={quantity}
      ref={quantityRef}
      onChange={handleQuantityChange}
      placeholder="Enter coin quantity"
      onKeyDown={(e) => handleKeyDown(e, setShowInput)}
      className={`py-[4px] sm:py-[8px] px-[8px] sm:px-[16px] rounded-[6px] border border-[#FFFFFF0D] w-[150px] sm:w-[200px] h-[25px] sm:h-[40px]  focus:outline-none  placeholder:w-400 placeholder:text-[12px] sm:placeholder:text-[14px] ${
        isDark
          ? "placeholder-[#D1D1D6] bg-[#191925]"
          : "placeholder-[#424286] bg-[#EBEBFD]"
      }`}
    />
  );
};

export default PortfolioInput;

"use client";
import React, { useRef } from "react";
import { handleKeyDown } from "@/app/utils/utils";
import { useHandleClickOutside } from "@/app/customHook/CustomHook";

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
  return (
    <input
      type="text"
      value={quantity}
      ref={quantityRef}
      onChange={handleQuantityChange}
      placeholder="Enter coin quantity"
      onKeyDown={(e) => handleKeyDown(e, setShowInput)}
      className={`py-[8px] px-[16px] rounded-[6px] border border-[#FFFFFF0D] w-[200px] h-[40px]  focus:outline-none  placeholder:w-400 placeholder:text-[14px] ${
        isDark
          ? "placeholder-[#D1D1D6] bg-[#191925]"
          : "placeholder-[#424286] bg-[#EBEBFD]"
      }`}
    />
  );
};

export default PortfolioInput;

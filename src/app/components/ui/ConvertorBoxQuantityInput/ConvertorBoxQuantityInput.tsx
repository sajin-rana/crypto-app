import React, { useRef } from "react";
import { handleKeyDown } from "@/app/utils/utils";
import { useHandleClickOutside } from "@/app/customHook/CustomHook";

const ConvertorBoxQuantityInput = ({
  isDark,
  coinQuantity,
  setIsQuantityOpen,
  handleQuantityChange,
}: {
  isDark: boolean;
  coinQuantity: number;
  setIsQuantityOpen: any;
  handleQuantityChange: any;
}) => {
  const quantityRef: any = useRef();
  useHandleClickOutside(quantityRef, setIsQuantityOpen);
  return (
    <input
      type="text"
      ref={quantityRef}
      value={coinQuantity}
      onChange={handleQuantityChange}
      placeholder="Enter coin quantity"
      onKeyDown={(e) => handleKeyDown(e, setIsQuantityOpen)}
      className={`py-[4px] px-[8px] sm:py-[8px] sm:px-[16px] rounded-[6px] border border-[#FFFFFF0D] w-[120px] sm:w-[200px] h-[30px] sm:h-[40px]  focus:outline-none  placeholder:w-400 placeholder:text-[14px] ${
        isDark
          ? "placeholder-[#D1D1D6] bg-[#191925]"
          : "placeholder-[#424286] bg-[#EBEBFD]"
      }`}
    />
  );
};

export default ConvertorBoxQuantityInput;

import React from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";

function saveAndContinueColor(isReadyToSave: boolean, isDark: boolean) {
  if (isReadyToSave) {
    if (isDark) {
      return "darkGlowBackground";
    } else {
      return "lightGlowBackground";
    }
  } else {
    if (isDark) {
      return "bg-[#232336]";
    } else {
      return "bg-[#EBEBFC] text-[#232336]";
    }
  }
}

const PortfolioSaveAndCancelButton = ({
  handleSubmit,
  isReadyToSave,
  setIsAddAssetOpen,
}: {
  handleSubmit: any;
  isReadyToSave: boolean;
  setIsAddAssetOpen: any;
}) => {
  const isDark = useSelector(selectIsDark);

  return (
    <div className="mt-[10px] sm:mt-[32px] flex items-center text-[14px] sm:text-[16px] gap-[10px] text-[#ffffff]">
      <button
        onClick={() => setIsAddAssetOpen(false)}
        className={`w-[222.5px] h-[44px] rounded-[6px] ${
          isDark ? "bg-[#232336]" : "bg-[#EBEBFC] text-[#232336]"
        }`}
      >
        Cancel
      </button>
      <button
        onClick={handleSubmit}
        className={`w-[222.5px] h-[44px] rounded-[6px] ${saveAndContinueColor(
          isReadyToSave,
          isDark
        )}`}
      >
        Save and Continue
      </button>
    </div>
  );
};

export default PortfolioSaveAndCancelButton;

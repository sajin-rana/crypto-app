import React from "react";
import UpDownArrow from "../UpDownArrow/UpDownArrow";
import { greaterThanZero } from "@/app/utils/utils";

const PricePercentage = ({ percentage }: { percentage: number }) => {
  return (
    <div className="flex items-center justify-center">
      <span>
        <UpDownArrow priceChangePercentage={percentage} />
      </span>
      <span
        className={`text-[14px] font-[400] ${
          greaterThanZero(percentage) ? "text-[#00B1A7]" : "text-[#FE2264]"
        }`}
      >
        {Math.abs(+percentage?.toFixed(2))}%
      </span>
    </div>
  );
};

export default PricePercentage;

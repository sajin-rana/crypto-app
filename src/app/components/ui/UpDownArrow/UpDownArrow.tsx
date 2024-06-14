import { greaterThanZero } from "@/app/utils/utils";
import React from "react";

const UpDownArrow = ({
  priceChangePercentage,
}: {
  priceChangePercentage: number;
}) => {
  return (
    <svg
      transform={
        greaterThanZero(priceChangePercentage) ? "rotate(0)" : "rotate(180)"
      }
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.00065 6.33301L4.66732 9.66634H11.334L8.00065 6.33301Z"
        fill={greaterThanZero(priceChangePercentage) ? "#00B1A7" : "#FE2264"}
        fillOpacity={1}
      />
    </svg>
  );
};

export default UpDownArrow;

import React from "react";
import { numberWithCommas } from "@/app/utils/utils";

const ConvertorBoxQuantity = ({
  coinQuantity,
  setIsQuantityOpen,
}: {
  coinQuantity: number;
  setIsQuantityOpen: any;
}) => {
  return (
    <h4
      onClick={() => setIsQuantityOpen(true)}
      className="text-[24px]  h-[40px] font-[700] cursor-pointer"
    >
      {numberWithCommas(coinQuantity)}
    </h4>
  );
};

export default ConvertorBoxQuantity;

import React from "react";
import { numberWithCommas } from "@/app/utils/utils";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";

const ConvertorBoxQuantity = ({
  isError,
  isLoading,
  coinQuantity,
  setIsQuantityOpen,
}: {
  isError: any;
  isLoading: boolean;
  coinQuantity: number;
  setIsQuantityOpen: any;
}) => {
  return (
    <>
      {isError || isLoading ? (
        <LoadingSkeleton style="w-[50px] h-[22px] sm:w-[80px] sm:h-[32px] rounded-[8px]" />
      ) : (
        <h4
          onClick={() => setIsQuantityOpen(true)}
          className="text-[20px] sm:text-[24px] h-[30px] sm:h-[40px] font-[500] sm:font-[700] cursor-pointer"
        >
          {numberWithCommas(coinQuantity)}
        </h4>
      )}
    </>
  );
};

export default ConvertorBoxQuantity;

import React from "react";
import { numberWithCommas } from "@/app/utils/utils";

const ConvertorBoxCoinPrice = ({
  isDark,
  isError,
  isLoading,
  coinPrice,
  coinSymbol,
  currencySign,
}: {
  isError: any;
  isDark: boolean;
  coinPrice: number;
  coinSymbol: string;
  isLoading: boolean;
  currencySign: string;
}) => {
  return (
    <>
      {isError || isLoading ? (
        <div className="skeleton w-[150px] h-[22px] sm:w-[177px] sm:h-[32px] rounded-[8px] mt-[10px]" />
      ) : (
        <div className="flex items-center text-[14px] font-[400] gap-[3px] mt-[10px]">
          <p className={isDark ? "text-[#D1D1D6]" : "text-[#5D5D90]"}>
            1 {coinSymbol} =
          </p>
          <p className={isDark ? "text-[#ffffff]" : "text-[#353574]"}>
            {currencySign}
            {numberWithCommas(coinPrice)}
            {}
          </p>
        </div>
      )}
    </>
  );
};

export default ConvertorBoxCoinPrice;

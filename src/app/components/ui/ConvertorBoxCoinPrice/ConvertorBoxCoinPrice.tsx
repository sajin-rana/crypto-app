import React from "react";
import { numberWithCommas } from "@/app/utils/utils";

const ConvertorBoxCoinPrice = ({
  isDark,
  coinPrice,
  coinSymbol,
  currencySign,
}: {
  isDark: boolean;
  coinPrice: number;
  coinSymbol: string;
  currencySign: string;
}) => {
  return (
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
  );
};

export default ConvertorBoxCoinPrice;

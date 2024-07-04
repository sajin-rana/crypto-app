import React from "react";
import { useSelector } from "react-redux";
import { firstLetterCapitalize } from "@/app/utils/utils";
import {
  selectIsDark,
  selectedCoinOne,
  selectedCoinTwo,
  selectedCoinOneSymbol,
  selectedCoinTwoSymbol,
} from "@/lib/features/cryptoSlice";

const ConvertorChartHeading = () => {
  const isDark = useSelector(selectIsDark);
  const coinOne = useSelector(selectedCoinOne) || "bitcoin";
  const coinOneSymbol = useSelector(selectedCoinOneSymbol) || "btc";
  const coinTwo = useSelector(selectedCoinTwo) || "ethereum";
  const coinTwoSymbol = useSelector(selectedCoinTwoSymbol) || "eth";
  return (
    <div
      className={`text-[16px] sm:text-[20px] font-[400] flex items-center gap-[8px] sm:gap-[16px] ${
        isDark ? "text-[#FFFFFF]" : "text-[#353570]"
      }`}
    >
      <p>
        {firstLetterCapitalize(coinOne)} ({coinOneSymbol?.toUpperCase()})
      </p>
      <p className={`${isDark ? "text-[#D1D1D1]" : "text-[#35357099]"}`}>to</p>
      <p>
        {firstLetterCapitalize(coinTwo)} ({coinTwoSymbol?.toUpperCase()})
      </p>
    </div>
  );
};

export default ConvertorChartHeading;

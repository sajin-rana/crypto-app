import React from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";

const PortfolioFooter = ({ isValueSelected }: { isValueSelected: boolean }) => {
  const isDark = useSelector(selectIsDark);
  return (
    <p
      className={`mt-[16px] font-[400] text-[14px] ${
        isDark ? "text-[#FFFFFF]" : "text-[#424286]"
      }`}
    >
      {isValueSelected
        ? "Value-cost averaging (VCA) -- is an investment strategy focuses on the value of the investment rather than the number of coins purchased. In VCA, investors aim to invest a consistent amount of money at regular intervals, but instead of buying a fixed quantity of assets each time."
        : "Dollar-cost averaging (DCA) -- is to reduce the impact of market volatility on the average cost of acquiring the investment. By consistently investing over time, investors may be able to lower their average cost per coin and potentially benefit from long-term market appreciation"}
    </p>
  );
};

export default PortfolioFooter;

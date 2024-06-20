import React from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/lib/hooks";
import { colors, formatNumber, getPercentage } from "@/app/utils/utils";
import { selectCurrency, selectIsDark } from "@/lib/features/cryptoSlice";
import TableProgressBar from "../TableProgressBar/TableProgressBar";

const TableBar = ({
  index,
  currentMarket,
  totalMarket,
}: {
  index: number;
  totalMarket: number;
  currentMarket: number;
}) => {
  const isDark = useSelector(selectIsDark);
  const currencySign = useAppSelector(selectCurrency);
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[4px]">
          <span
            className="h-[6px] w-[6px] rounded-full"
            style={{ background: colors[index % 17] }}
          />
          <span
            className="text-[12px] font-[400]"
            style={{ color: colors[index % 17] }}
          >
            {" "}
            {currencySign.sign}
            {String(formatNumber(totalMarket)).replace(/\s/g, "")}
          </span>
        </div>
        <div className="flex items-center gap-[4px]">
          <span
            className="h-[6px] w-[6px] rounded-full"
            style={{ background: colors[index % 17], opacity: 0.5 }}
          />
          <span
            className={`text-[12px] font-[400] ${
              isDark ? "text-[#ffffff]" : "text-[#232336]"
            }`}
          >
            {" "}
            {currencySign.sign}
            {String(formatNumber(currentMarket)).replace(/\s/g, "")}
          </span>
        </div>
      </div>
      <TableProgressBar
        percentage={getPercentage(totalMarket, currentMarket)}
        color={colors[index % 17]}
      />
    </div>
  );
};

export default TableBar;

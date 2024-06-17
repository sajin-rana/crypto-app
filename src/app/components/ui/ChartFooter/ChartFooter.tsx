import React from "react";
import { useSelector } from "react-redux";
import { selectCurrency, selectIsDark } from "@/lib/features/cryptoSlice";

const ChartFooter = ({
  coinOne,
  coinTwo,
  amountsOne,
  amountsTwo,
}: {
  coinOne: string;
  coinTwo: string;
  amountsOne: any;
  amountsTwo: any;
}) => {
  const isDark = useSelector(selectIsDark);
  const currencySign = useSelector(selectCurrency);
  return (
    <div
      className={`flex items-center  gap-[24px] font-[400] text-[20px] ${
        isDark ? "text-[#D1D1D1]" : "text-[#424286]"
      }`}
    >
      <div className="flex items-center justify-center gap-[8px]">
        <div className="h-[24px] w-[24px] rounded-[2px] bg-[#7878FA]" />
        <p>{coinOne}</p>
        <p>
          {currencySign.sign}
          {amountsOne}
        </p>
      </div>
      {coinTwo && (
        <div className="flex items-center justify-center gap-[8px]">
          <div className="h-[24px] w-[24px] rounded-[2px] bg-[#D878FA]" />
          <p>{coinTwo}</p>
          <p>
            {currencySign.sign}
            {amountsTwo}
          </p>
        </div>
      )}
    </div>
  );
};

export default ChartFooter;

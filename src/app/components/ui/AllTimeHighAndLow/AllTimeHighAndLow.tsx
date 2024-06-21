import React from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";
import { numberWithCommas } from "@/app/utils/utils";
import BigArrow from "../BigArrow/BigArrow";

const AllTimeHighAndLow = ({
  allTimeDate,
  allTimeMoney,
  currencySign,
  text,
  isUpArrow,
}: {
  allTimeDate: any;
  allTimeMoney: any;
  currencySign: string;
  text: string;
  isUpArrow: boolean;
}) => {
  const isDark = useSelector(selectIsDark);
  return (
    <div className="flex w-[full] items-start justify-between">
      <div className="flex items-start gap-[16px]">
        <div className="mt-[10px]">
          <BigArrow isUpArrow={isUpArrow} />
        </div>
        <div className="">
          <h4 className="text-[20px] font-[400]">{text}</h4>
          <p
            className={`text-[16px] font-[400] ${
              isDark ? "text-[#B9B9BA] " : "text-[#424286]"
            }`}
          >
            {new Date(allTimeDate)?.toUTCString()}
          </p>
        </div>
      </div>
      <p className="text-[24px] font-[500]">
        {currencySign}
        {numberWithCommas(allTimeMoney)}
      </p>
    </div>
  );
};

export default AllTimeHighAndLow;

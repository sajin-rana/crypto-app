import React from "react";
import { useSelector } from "react-redux";
import BigArrow from "../BigArrow/BigArrow";
import { numberWithCommas } from "@/app/utils/utils";
import { selectIsDark } from "@/lib/features/cryptoSlice";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";

const AllTimeHighAndLow = ({
  text,
  isError,
  isLoading,
  isUpArrow,
  allTimeDate,
  allTimeMoney,
  currencySign,
}: {
  isError: any;
  text: string;
  allTimeDate: any;
  allTimeMoney: any;
  isLoading: boolean;
  isUpArrow: boolean;
  currencySign: string;
}) => {
  const isDark = useSelector(selectIsDark);
  return (
    <div
      className={`flex w-[full] ${
        isLoading || isError ? "items-center" : "items-start"
      }   justify-between`}
    >
      <div className="flex items-start gap-[8px] sm:gap-[16px]">
        <div className="mt-[10px]">
          <BigArrow isUpArrow={isUpArrow} />
        </div>
        <div className="">
          <h4 className="text-[16px] sm:text-[20px] font-[400]">{text}</h4>
          {isError || isLoading ? (
            <LoadingSkeleton style="w-[100px] h-[12px] sm:w-[177px] sm:h-[22px] rounded-[8px]" />
          ) : (
            <p
              className={`text-[12px] sm:text-[16px] font-[400] ${
                isDark ? "text-[#B9B9BA] " : "text-[#424286]"
              }`}
            >
              {new Date(allTimeDate)?.toUTCString()}
            </p>
          )}
        </div>
      </div>
      {isError || isLoading ? (
        <LoadingSkeleton style="w-[50px] h-[22px] sm:w-[100px] sm:h-[32px] rounded-[8px]" />
      ) : (
        <p className="text-[20px] sm:text-[24px] font-[500]">
          {currencySign}
          {numberWithCommas(allTimeMoney)}
        </p>
      )}
    </div>
  );
};

export default AllTimeHighAndLow;

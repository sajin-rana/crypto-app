"use client";
import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";
import PortfolioSearchCoinInput from "../PortfolioSearchCoinInput/PortfolioSearchCoinInput";

const PortfolioSelectAndSearchCoin = ({
  data,
  isError,
  isLoading,
}: {
  data: any;
  isError: any;
  isLoading: boolean;
}) => {
  const isDark = useSelector(selectIsDark);

  return (
    <div className="flex items-center justify-between mt-[10px] sm:mt-[32px]">
      <div
        className={`w-[141px] sm:w-[230px] rounded-[8px] h-[44px] p-[8px] flex items-center gap-[8px]  ${
          isDark ? "bg-[#191932]" : "bg-[#EBEBFD]"
        }`}
      >
        {isLoading || isError ? (
          <>
            <LoadingSkeleton style="w-[24px] sm:w-[28px] h-[24px] sm:h-[28px] rounded-full " />
            <LoadingSkeleton style="w-[100px] h-[12px] sm:w-[177px] sm:h-[22px] rounded-[8px]" />
          </>
        ) : (
          <>
            <div
              className={`w-[24px] sm:w-[28px] h-[24px] sm:h-[28px] rounded-[8px] flex items-center justify-center ${
                isDark ? "bg-[#2C2C4A]" : "bg-[#E3E5F9]"
              }`}
            >
              <Image
                width={28}
                height={28}
                alt={data?.name}
                src={data?.image?.large}
              />
            </div>
            <h4 className="text-[14px] sm:text-[16px] font-[700] h-[22px]  overflow-hidden ">
              {data?.name} ({data?.symbol.toUpperCase()})
            </h4>
          </>
        )}
      </div>
      <PortfolioSearchCoinInput />
    </div>
  );
};

export default PortfolioSelectAndSearchCoin;

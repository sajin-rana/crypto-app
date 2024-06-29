"use client";
import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";
import PortfolioSearchCoinInput from "../PortfolioSearchCoinInput/PortfolioSearchCoinInput";

const PortfolioSelectAndSearchCoin = ({ data }: { data: any }) => {
  const isDark = useSelector(selectIsDark);

  return (
    <div className="flex items-center justify-between mt-[32px]">
      <div
        className={`w-[230px] rounded-[8px] h-[44px] p-[8px] flex items-center gap-[8px]  ${
          isDark ? "bg-[#191932]" : "bg-[#EBEBFD]"
        }`}
      >
        <div
          className={`w-[28px] h-[28px] rounded-[8px] flex items-center justify-center ${
            isDark ? "bg-[#2C2C4A]" : "bg-[#E3E5F9]"
          }`}
        >
          <Image
            width={20}
            height={20}
            alt={data?.name}
            src={data?.image?.large}
          />
        </div>
        <h4 className="text-[16px] font-[700] h-[22px]  overflow-hidden ">
          {data?.name} ({data?.symbol.toUpperCase()})
        </h4>
      </div>
      <PortfolioSearchCoinInput />
    </div>
  );
};

export default PortfolioSelectAndSearchCoin;

import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";

const PortfolioImageContainer = ({
  data,
  style,
  isError,
  isLoading,
  isLightBackground = "bg-[white]",
  isLightImageBackground = "bg-[#EBEBFC]",
}: {
  data: any;
  style: string;
  isError?: boolean;
  isLoading?: boolean;
  isLightBackground?: string;
  isLightImageBackground?: string;
}) => {
  const isDark = useSelector(selectIsDark);
  return (
    <div
      className={`${style} flex items-center justify-center  flex-col gap-[6px] sm:gap-[24px] ${
        isDark
          ? "bg-[#1E1931] text-[white]"
          : `${isLightBackground} text-[#191925]`
      }`}
    >
      <div
        className={`w-[48px] h-[48px] sm:h-[64px] sm:w-[64px] flex items-center justify-center rounded-[8px] ${
          isDark ? "bg-[#2C2C4A]" : isLightImageBackground
        }`}
      >
        {isLoading || isError ? (
          <div className="skeleton w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] rounded-full" />
        ) : (
          <div className="h-[24px] w-[24px] sm:h-[32px] sm:w-[32px]">
            <Image
              width={32}
              height={32}
              alt={data?.coin}
              src={data?.image.small}
            />
          </div>
        )}
      </div>
      {isLoading || isError ? (
        <div className="skeleton w-[150px] h-[22px] sm:w-[177px] sm:h-[42px] rounded-[8px]" />
      ) : (
        <h4
          className={`text-[20px] font-[500] sm:text-[28px] sm:font-[700] ${
            isLoading ? "skeleton" : ""
          }`}
        >
          {data?.name} ({data?.symbol?.toUpperCase()})
        </h4>
      )}
    </div>
  );
};

export default PortfolioImageContainer;

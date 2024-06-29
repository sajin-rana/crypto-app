import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";

const PortfolioImageContainer = ({
  data,
  style,
  isLightBackground = "bg-[white]",
  isLightImageBackground = "bg-[#EBEBFC]",
}: {
  data: any;
  style: string;
  isLightBackground?: string;
  isLightImageBackground?: string;
}) => {
  const isDark = useSelector(selectIsDark);
  return (
    <div
      className={`${style} flex items-center justify-center flex-col gap-[24px] ${
        isDark
          ? "bg-[#1E1931] text-[white]"
          : `${isLightBackground} text-[#191925]`
      }`}
    >
      <div
        className={`h-[64px] w-[64px] flex items-center justify-center rounded-[8px] ${
          isDark ? "bg-[#2C2C4A]" : isLightImageBackground
        }`}
      >
        <Image
          width={32}
          height={32}
          alt={data?.coin}
          src={data?.image.small}
        />
      </div>
      <h4 className="text-[28px] font-[700]">
        {data?.name} ({data?.symbol?.toUpperCase()})
      </h4>
    </div>
  );
};

export default PortfolioImageContainer;

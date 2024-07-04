import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { selectIsDark } from "@/lib/features/cryptoSlice";

const CoinConvertorButton = () => {
  const isDark = useSelector(selectIsDark);
  const isCoinSelected = usePathname() === "/";
  const isCovertorSelected = usePathname() === "/convertor";

  const lightCoinTextColor = isCoinSelected ? "text-[white]" : "text-[#424286]";

  const lightCovertorTextColor = isCovertorSelected
    ? "text-[white]"
    : "text-[#424286]";

  const darkCoinBackground = isCoinSelected
    ? "darkGlowBackground"
    : "bg-[#232336]";

  const lightCoinBackground = isCoinSelected
    ? "lightGlowBackground"
    : "bg-[#ffff]";

  const darkConvertorBackground = isCovertorSelected
    ? "darkGlowBackground"
    : "bg-[#232336]";
  const lightConvertorBackground = isCovertorSelected
    ? "lightGlowBackground"
    : "bg-[#ffff]";

  const coinBackground = isDark ? darkCoinBackground : lightCoinBackground;

  const convertorBackground = isDark
    ? darkConvertorBackground
    : lightConvertorBackground;

  return (
    <div
      className={`sm:w-[506px] w-full  sm:h-[53px] h-[40px] flex justify-center items-center sm:mt-[40px] mt-[20px] ${
        isDark ? "bg-[#191925]" : "bg-[#ffff]"
      } rounded-[6px] pt-[4px]  pb-[4px] pl-[4px] pr-[15px] sm:text-[16px] text-[14px] font-[500]`}
    >
      <Link
        href="/"
        className={`w-[50%] h-full rounded-[6px] flex justify-center items-center ${coinBackground} `}
      >
        <p className={`${isDark ? "text-[white]" : lightCoinTextColor}`}>
          Coin
        </p>
      </Link>
      <Link
        href="/convertor"
        className={`w-[50%]  h-full rounded-[6px] flex justify-center items-center ${convertorBackground}`}
      >
        <p className={`${isDark ? "text-[white]" : lightCovertorTextColor}`}>
          Convertor
        </p>
      </Link>
    </div>
  );
};

export default CoinConvertorButton;

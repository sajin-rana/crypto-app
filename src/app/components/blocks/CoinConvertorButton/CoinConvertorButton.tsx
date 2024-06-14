import React from "react";
import { selectIsDark } from "@/lib/features/cryptoSlice";
import { useSelector } from "react-redux";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
      className={`w-[506px] h-[53px] flex justify-center items-center mt-[40px] ${
        isDark ? "bg-[#191925]" : "bg-[#ffff]"
      } rounded-[6px] pt-[4px]  pb-[4px] pl-[4px] pr-[15px] text-[16px] font-[400]`}
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

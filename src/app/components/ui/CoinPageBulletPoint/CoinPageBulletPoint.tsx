import React from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";

const CoinPageBulletPoint = ({
  text,
  amount,
  isError,
  isLoading,
}: {
  text: string;
  isError: any;
  isLoading: boolean;
  amount: string | number;
}) => {
  const isDark = useSelector(selectIsDark);
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-[8px] sm:gap-[12px]">
        <span
          className={`h-[20px] w-[20px] sm:h-[24px] sm:w-[24px] rounded-full flex items-center justify-center ${
            isDark ? "darkGlowBackground " : "lightGlowBackground text-[white]"
          }`}
        >
          +
        </span>
        <p className="text-[14px] sm:text-[16px] font-[400]">{text}</p>
      </div>
      {isError || isLoading ? (
        <div className="skeleton w-[50px] h-[22px] sm:w-[100px] sm:h-[32px] rounded-[8px] mt-[5px] sm:mt-[10px]" />
      ) : (
        <p className="text-[16px] sm:text-[20px] font-[500]">{amount}</p>
      )}
    </div>
  );
};

export default CoinPageBulletPoint;

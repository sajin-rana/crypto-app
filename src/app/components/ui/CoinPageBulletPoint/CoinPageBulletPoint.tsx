import React from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";

const CoinPageBulletPoint = ({
  text,
  amount,
}: {
  text: string;
  amount: string | number;
}) => {
  const isDark = useSelector(selectIsDark);
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-[12px]">
        <span
          className={` h-[24px] w-[24px] rounded-full flex items-center justify-center ${
            isDark ? "darkGlowBackground " : "lightGlowBackground text-[white]"
          }`}
        >
          +
        </span>
        <p className="text-[16px] font-[400]">{text}</p>
      </div>
      <p className="text-[20px] font-[500]">{amount}</p>
    </div>
  );
};

export default CoinPageBulletPoint;

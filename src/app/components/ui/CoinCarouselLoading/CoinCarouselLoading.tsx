import React from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";

const CoinCarouselLoading = () => {
  const isDark = useSelector(selectIsDark);
  const array = new Array(5)
    .fill(crypto.randomUUID())
    .map(() => crypto.randomUUID());
  return (
    <div className="flex">
      {array.map((id) => (
        <div
          key={id}
          className={`w-[168px] h-[51px] sm:w-[252.8px] sm:h-full shrink-0 grow-0 min-w-0 ml-[5px] mr-[5px]  relative rounded-[6px] flex items-center cursor-pointer gap-[8px] sm:gap-[16px] p-[16px] py-[8px] px-[10px] sm:p-[16px] ${
            isDark ? "bg-[#191925]" : "bg-[white]"
          } 
        `}
        >
          <div className="flex items-center gap-[8px] sm:gap-[16px]">
            <div className="h-[24px] w-[24px] sm:h-[32px] sm:w-[32px] rounded-full skeleton"></div>
            <div className="">
              <p className="w-[100px] h-[10px] sm:w-[150px] rounded-[5px] sm:h-[16px] skeleton"></p>
              <div className="flex gap-[5px] sm:gap-[10px] mt-[10px]">
                <p className="w-[60px] h-[10px] sm:w-[100px] rounded-[5px] sm:h-[16px]  skeleton"></p>
                <p className="w-[30px] h-[10px] sm:w-[40px] rounded-[5px] sm:h-[16px]  skeleton"></p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoinCarouselLoading;

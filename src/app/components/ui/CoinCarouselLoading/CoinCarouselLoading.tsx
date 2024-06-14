import React from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";

const CoinCarouselLoading = () => {
  const isDark = useSelector(selectIsDark);
  const array = new Array(5).fill(crypto.randomUUID());
  return (
    <div className="flex">
      {array.map(() => (
        <div
          key={crypto.randomUUID()}
          className={`w-[252.8px] h-full shrink-0 grow-0 min-w-0 ml-[5px] mr-[5px]  relative rounded-[6px] flex items-center cursor-pointer  gap-[16px] p-[16px] ${
            isDark ? "bg-[#191925]" : "bg-[white]"
          } 
        `}
        >
          <div className="flex items-center  gap-[16px]">
            <div className="h-[32px] w-[32px] rounded-full skeleton"></div>
            <div className="">
              <p className="w-[150px] rounded-[5px] h-[16px] skeleton"></p>
              <div className="flex gap-[10px] mt-[10px]">
                <p className="w-[100px] rounded-[5px] h-[16px]  skeleton"></p>
                <p className="w-[40px] rounded-[5px] h-[16px]  skeleton"></p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoinCarouselLoading;

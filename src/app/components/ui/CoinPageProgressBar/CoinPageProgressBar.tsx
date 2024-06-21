import React from "react";

const CoinPageProgressBar = ({ data }: { data: number }) => {
  return (
    <div className="flex flex-col gap-[4px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[4px]">
          <span className="h-[6px] w-[6px] rounded-full bg-[#D4770C]" />
          <span className="text-[12px] font-[400] text-[#D4770C]">
            {100 - data}%
          </span>
        </div>
        <div className="flex items-center gap-[4px]">
          <span className="h-[6px] w-[6px] rounded-full bg-[#F8D2A6]" />
          <span className="text-[12px] font-[400] text-[#F8D2A6]">{data}%</span>
        </div>
      </div>
      <div className="relative w-full">
        <div className="absolute top-0 left-0 h-[6px] w-full rounded-[2px] bg-[#F8D2A6] " />
        <div
          className="absolute top-0 left-0 h-[6px] rounded-[2px] bg-[#D4770C] "
          style={{ width: `${100 - data}%` }}
        />
      </div>
    </div>
  );
};

export default CoinPageProgressBar;

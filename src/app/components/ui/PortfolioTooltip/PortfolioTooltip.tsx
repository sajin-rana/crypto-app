import React from "react";
import { useSelector } from "react-redux";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { selectIsDark } from "@/lib/features/cryptoSlice";

const PortfolioTooltip = ({
  content,
  dataTooltipId,
}: {
  content: string;
  dataTooltipId: string;
}) => {
  const isDark = useSelector(selectIsDark);

  return (
    <>
      <div
        className={`h-[17.5px] w-[17.5px]  rounded-full flex justify-center items-center cursor-pointer text-[14px] font-[600]  ${
          isDark ? "bg-[#ffffff] text-[#191932]" : "bg-[#B0B0EB] text-[#F3F5F9]"
        }`}
        data-tooltip-id={dataTooltipId}
      >
        ?
      </div>
      <ReactTooltip
        place="top"
        content={content}
        id={dataTooltipId}
        style={{ fontSize: "12px", maxWidth: "400px", textAlign: "center" }}
      />
    </>
  );
};

export default PortfolioTooltip;

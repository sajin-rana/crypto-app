import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import NavbarLoading from "../NavbarLoading/NavbarLoading";

const TotalVolume = ({
  totalVolume,
  isLoading,
  totalVolumePercentage,
}: {
  isLoading: boolean;
  totalVolume: string | number;
  totalVolumePercentage: number;
}) => {
  return (
    <div className=" flex items-center gap-[5px]">
      {isLoading ? (
        <NavbarLoading />
      ) : (
        <p className="text-[12px] font-[500] whitespace-nowrap text-[#FFFFFF] ">
          {totalVolume}
        </p>
      )}
      <ProgressBar
        fillBackground="bg-[#FFFFFF]"
        percentage={totalVolumePercentage}
      />
    </div>
  );
};

export default TotalVolume;

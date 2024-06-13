import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import NavbarLoading from "../NavbarLoading/NavbarLoading";

const TotalVolume = ({
  totalVolume,
  totalVolumePercentage,
  isLoading,
}: {
  totalVolume: string | number;
  totalVolumePercentage: number;
  isLoading: boolean;
}) => {
  return (
    <div className=" flex items-center gap-[5px] ">
      {isLoading ? (
        <NavbarLoading />
      ) : (
        <p className="text-[12px] font-[500] text-[#FFFFFF] ">{totalVolume}</p>
      )}
      <ProgressBar
        percentage={totalVolumePercentage}
        fillBackground="bg-[#FFFFFF]"
      />
    </div>
  );
};

export default TotalVolume;

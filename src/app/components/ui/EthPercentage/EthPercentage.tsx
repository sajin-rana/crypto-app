import React from "react";
import Image from "next/image";
import Ethereum from "../../../assets/Ethereum.svg";
import ProgressBar from "../ProgressBar/ProgressBar";
import NavbarLoading from "../NavbarLoading/NavbarLoading";

const EthPercentage = ({
  isLoading,
  ethPercentage,
}: {
  isLoading: boolean;
  ethPercentage: number;
}) => {
  return (
    <div className=" flex items-center gap-[5px]">
      <Image src={Ethereum} alt="bit-coin image" />
      {isLoading ? (
        <NavbarLoading />
      ) : (
        <p className="text-[12px] font-[500] text-[#FFFFFF] ">
          {ethPercentage}%
        </p>
      )}
      <ProgressBar percentage={ethPercentage} fillBackground="bg-[#849DFF]" />
    </div>
  );
};

export default EthPercentage;

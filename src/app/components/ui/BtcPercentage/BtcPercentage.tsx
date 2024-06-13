import React from "react";
import Image from "next/image";
import BitCoin from "../../../assets/BitCoin.svg";
import ProgressBar from "../ProgressBar/ProgressBar";
import NavbarLoading from "../NavbarLoading/NavbarLoading";

const BtcPercentage = ({
  btcPercentage,
  isLoading,
}: {
  btcPercentage: number;
  isLoading: boolean;
}) => {
  return (
    <div className=" flex items-center gap-[5px] ">
      <Image src={BitCoin} alt="bit-coin image" />
      {isLoading ? (
        <NavbarLoading />
      ) : (
        <p className="text-[12px] font-[500] text-[#FFFFFF] ">
          {btcPercentage}%
        </p>
      )}
      <ProgressBar percentage={btcPercentage} fillBackground="bg-[#F7931A]" />
    </div>
  );
};

export default BtcPercentage;

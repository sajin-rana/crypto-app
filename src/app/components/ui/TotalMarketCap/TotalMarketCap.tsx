import React from "react";
import Image from "next/image";
import UpArrow from "../../../assets/UpArrow.svg";
import NavbarLoading from "../NavbarLoading/NavbarLoading";

const TotalMarketCap = ({
  isLoading,
  totalMarketCap,
}: {
  isLoading: boolean;
  totalMarketCap: string | number;
}) => {
  return (
    <div className=" flex items-center gap-[4px] ">
      <Image src={UpArrow} alt="up arrow image" />
      {isLoading ? (
        <NavbarLoading />
      ) : (
        <p className="text-[12px] font-[500] whitespace-nowrap text-[#FFFFFF] ">
          {totalMarketCap}
        </p>
      )}
    </div>
  );
};

export default TotalMarketCap;

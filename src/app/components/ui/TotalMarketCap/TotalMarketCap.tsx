import React from "react";
import Image from "next/image";
import UpArrow from "../../../assets/UpArrow.svg";
import NavbarLoading from "../NavbarLoading/NavbarLoading";

const TotalMarketCap = ({
  totalMarketCap,
  isLoading,
}: {
  totalMarketCap: string | number;
  isLoading: boolean;
}) => {
  return (
    <div className="flex">
      <div className=" flex items-center gap-[4px] ">
        <Image src={UpArrow} alt="up arrow image" />
        {isLoading ? (
          <NavbarLoading />
        ) : (
          <p className="text-[12px] font-[500] text-[#FFFFFF] ">
            {totalMarketCap}
          </p>
        )}
      </div>
    </div>
  );
};

export default TotalMarketCap;

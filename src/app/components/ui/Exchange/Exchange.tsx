import React from "react";
import Image from "next/image";
import ExchangeSvg from "../../../assets/Exchange.svg";
import NavbarLoading from "../NavbarLoading/NavbarLoading";

const Exchange = ({
  exchange,
  isLoading,
}: {
  exchange: number;
  isLoading: boolean;
}) => {
  return (
    <div className="flex gap-[8px]">
      <div className=" flex items-center gap-[4px] ">
        <Image src={ExchangeSvg} alt="exchange image" />
        <p className="text-[12px] font-[500] text-[#D1D1D1] ">Exchange</p>
      </div>
      {isLoading ? (
        <NavbarLoading />
      ) : (
        <p className="text-[12px] font-[500] text-[#FFFFFF] ">{exchange}</p>
      )}
    </div>
  );
};

export default Exchange;

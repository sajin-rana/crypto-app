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
    <div className="flex gap-[8px] items-center ">
      <div className=" flex items-center gap-[4px] ">
        <Image src={ExchangeSvg} alt="exchange image" />
        <p className="text-[12px] font-[500] text-[#D1D1D1] ">Exchange</p>
        {isLoading ? (
          <NavbarLoading />
        ) : (
          <div className="text-[12px] block font-[500] text-[#FFFFFF] ">
            {exchange}
          </div>
        )}
      </div>
    </div>
  );
};

export default Exchange;

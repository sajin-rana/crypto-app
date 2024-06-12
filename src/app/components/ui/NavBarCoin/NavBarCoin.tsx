import React from "react";
import Image from "next/image";
import CoinSvg from "../../../assets/CoinSvg.svg";
import NavbarLoading from "../NavbarLoading/NavbarLoading";

const NavBarCoin = ({
  coin,
  isLoading,
}: {
  coin: number;
  isLoading: boolean;
}) => {
  return (
    <div className="flex gap-[8px]">
      <div className=" flex items-center gap-[4px] ">
        <Image src={CoinSvg} alt="coin image" />
        <p className="text-[12px] font-[500] text-[#D1D1D1] ">Coins</p>
      </div>
      {isLoading ? (
        <NavbarLoading />
      ) : (
        <p className="text-[12px] font-[500] text-[#FFFFFF] ">{coin}</p>
      )}
    </div>
  );
};

export default NavBarCoin;

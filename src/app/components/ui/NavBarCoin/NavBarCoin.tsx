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
    <div className="flex gap-[8px] items-center ">
      <div className=" flex items-center gap-[4px] ">
        <Image src={CoinSvg} alt="coin image" />
        <div className="text-[12px] block font-[500] text-[#D1D1D1] ">
          Coins
        </div>
        {isLoading ? (
          <NavbarLoading />
        ) : (
          <div className="text-[12px] font-[500] block text-[#FFFFFF] ">
            {coin}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBarCoin;

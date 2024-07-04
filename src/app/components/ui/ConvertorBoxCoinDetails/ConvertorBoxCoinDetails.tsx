import React from "react";
import Image from "next/image";
import DownArrow from "../DownArrow/DownArrow";

const ConvertorBoxCoinDetails = ({
  data,
  coinSymbol,
  setIsCoinDropDownOpen,
}: {
  data: any;
  coinSymbol: string;
  setIsCoinDropDownOpen: any;
}) => {
  return (
    <div
      className="flex items-center gap-[8px] cursor-pointer  "
      onClick={() => setIsCoinDropDownOpen(true)}
    >
      <Image src={data?.image?.large} height={24} width={24} alt={data?.id} />
      <h4 className="whitespace-nowrap  text-[16px] sm:text-[20px] font-[500]">
        {data?.name} ({coinSymbol})
      </h4>
      <DownArrow />
    </div>
  );
};

export default ConvertorBoxCoinDetails;

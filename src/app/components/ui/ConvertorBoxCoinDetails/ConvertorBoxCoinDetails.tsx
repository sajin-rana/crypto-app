import React from "react";
import Image from "next/image";
import DownArrow from "../DownArrow/DownArrow";

const ConvertorBoxCoinDetails = ({
  setIsCoinDropDownOpen,
  data,
  coinSymbol,
}: {
  setIsCoinDropDownOpen: any;
  data: any;
  coinSymbol: string;
}) => {
  return (
    <div
      className="flex items-center gap-[8px] cursor-pointer  "
      onClick={() => setIsCoinDropDownOpen(true)}
    >
      <Image src={data?.image?.large} height={24} width={24} alt={data?.id} />
      <h4 className="text-[20px] font-[500]">
        {data?.name} ({coinSymbol})
      </h4>
      <DownArrow />
    </div>
  );
};

export default ConvertorBoxCoinDetails;

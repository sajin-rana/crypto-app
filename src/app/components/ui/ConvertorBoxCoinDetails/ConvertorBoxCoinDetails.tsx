import React from "react";
import Image from "next/image";
import DownArrow from "../DownArrow/DownArrow";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";

const ConvertorBoxCoinDetails = ({
  data,
  isError,
  isLoading,
  coinSymbol,
  setIsCoinDropDownOpen,
}: {
  data: any;
  isError: any;
  isLoading: boolean;
  coinSymbol: string;
  setIsCoinDropDownOpen: any;
}) => {
  return (
    <div
      className="flex items-center gap-[8px] cursor-pointer  "
      onClick={() => setIsCoinDropDownOpen(true)}
    >
      {isError || isLoading ? (
        <LoadingSkeleton style="w-[100px] h-[22px] sm:w-[177px] sm:h-[32px] rounded-[8px]" />
      ) : (
        <>
          <Image src={data?.image} height={24} width={24} alt={data?.id} />
          <h4 className="whitespace-nowrap  text-[16px] sm:text-[20px] font-[500]">
            {data?.name} ({coinSymbol})
          </h4>
          <DownArrow />
        </>
      )}
    </div>
  );
};

export default ConvertorBoxCoinDetails;

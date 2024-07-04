import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import TableBar from "../TableBar/TableBar";
import TableChart from "../TableChart/TableChart";
import { numberWithCommas } from "@/app/utils/utils";
import PricePercentage from "../PricePercentage/PricePercentage";
import { selectCurrency, selectIsDark } from "@/lib/features/cryptoSlice";

const TableCoinList = ({ item, index }: { item: any; index: number }) => {
  const isDark = useSelector(selectIsDark);
  const getCurrency = useSelector(selectCurrency);
  const currencySign = getCurrency.sign;

  return (
    <Link href={`/coin/${item?.id}`}>
      <div
        className={`flex w-full items-center p-[12px] sm:py-[16px] sm:px-[20px] rounded-[12px] mb-[10px] cursor-pointer  justify-between ${
          isDark ? "bg-[#191925]" : "bg-[#FFFFFF]"
        }`}
      >
        <div
          className={`text-[16px] font-[500] w-[16px] hidden sm:block ${
            isDark ? "text-[#D1D1D1]" : "text-[#424286]"
          }`}
        >
          {index + 1}
        </div>
        <div className="flex items-center gap-[16px] sm:hidden">
          <div className="h-[24px] w-[24px]">
            <Image src={item.image} alt={item.id} height={24} width={24} />
          </div>
          <div className="flex flex-col sm:hidden w-[68px] h-[45px] ">
            <p
              className={` text-[16px] font-[500] ${
                isDark ? "text-[#ffffff]" : "text-[#232336]"
              }`}
            >
              {item.symbol.toUpperCase()}
            </p>
            <p
              className={`text-[10px] font-[400] overflow-hidden h-[13px]  ${
                isDark ? "text-[#FFFFFF80]" : "text-[#353570CC]"
              }`}
            >
              {item.name}
            </p>
          </div>
        </div>

        <div className="sm:h-[32px] sm:w-[32px] hidden sm:block">
          <Image src={item.image} alt={item.id} height={32} width={32} />
        </div>
        <div
          className={`text-[16px] font-[500]  w-[160px] overflow-hidden hidden sm:block ${
            isDark ? "text-[#ffffff]" : "text-[#232336]"
          }`}
        >
          {item.name} ({item.symbol.toUpperCase()}){" "}
        </div>
        <div
          className={` text-[14px] sm:text-[16px] font-[500] w-[64px]  sm:w-[80px]  ${
            isDark ? "text-[#FFFFFF]" : "text-[#232336]"
          }`}
        >
          {currencySign}
          {numberWithCommas(item.current_price)}
        </div>
        <div className="w-[64px] sm:w-[72px]">
          <PricePercentage
            percentage={item.price_change_percentage_1h_in_currency}
          />
        </div>
        <div className="w-[64px] sm:w-[72px]">
          <PricePercentage
            percentage={item.price_change_percentage_24h_in_currency}
          />
        </div>
        <div className="w-[72px] hidden sm:block">
          <PricePercentage
            percentage={item.price_change_percentage_7d_in_currency}
          />
        </div>
        <div className="w-[228px] hidden sm:block">
          <TableBar
            index={index}
            currentMarket={item.market_cap}
            totalMarket={item.total_volume}
          />
        </div>
        <div className="w-[228px] hidden sm:block">
          <TableBar
            index={index}
            totalMarket={item.circulating_supply}
            currentMarket={item.total_supply}
          />
        </div>
        <div className="w-[120px] hidden sm:block">
          <TableChart index={index} chartData={item.sparkline_in_7d.price} />
        </div>
      </div>
    </Link>
  );
};

export default TableCoinList;

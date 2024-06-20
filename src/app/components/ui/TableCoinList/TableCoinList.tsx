import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import PricePercentage from "../PricePercentage/PricePercentage";
import TableBar from "../TableBar/TableBar";
import TableChart from "../TableChart/TableChart";
import { selectCurrency, selectIsDark } from "@/lib/features/cryptoSlice";
import { numberWithCommas } from "@/app/utils/utils";

const TableCoinList = ({ item, index }: { item: any; index: number }) => {
  const isDark = useSelector(selectIsDark);
  const getCurrency = useSelector(selectCurrency);
  const currencySign = getCurrency.sign;

  return (
    <Link href={`/coin/${item?.id}`}>
      <div
        className={`flex w-full items-center py-[16px] px-[20px] rounded-[12px] mb-[10px] cursor-pointer justify-between ${
          isDark ? "bg-[#191925]" : "bg-[#FFFFFF]"
        }`}
      >
        <div
          className={`text-[16px] font-[500] w-[16px] ${
            isDark ? "text-[#D1D1D1]" : "text-[#424286]"
          }`}
        >
          {index + 1}
        </div>
        <div className="h-[32px] w-[32px]">
          <Image src={item.image} alt={item.id} width={32} height={32} />
        </div>
        <div
          className={`text-[16px] font-[500]  w-[160px] overflow-hidden ${
            isDark ? "text-[#ffffff]" : "text-[#232336]"
          }`}
        >
          {item.name} ({item.symbol.toUpperCase()}){" "}
        </div>
        <div
          className={`text-[16px] font-[500] w-[80px] ${
            isDark ? "text-[#FFFFFF]" : "text-[#232336]"
          }`}
        >
          {currencySign}
          {numberWithCommas(item.current_price)}
        </div>
        <div className="w-[72px]">
          <PricePercentage
            percentage={item.price_change_percentage_1h_in_currency}
          />
        </div>
        <div className="w-[72px]">
          <PricePercentage
            percentage={item.price_change_percentage_24h_in_currency}
          />
        </div>
        <div className="w-[72px]">
          <PricePercentage
            percentage={item.price_change_percentage_7d_in_currency}
          />
        </div>
        <div className="w-[228px]">
          <TableBar
            index={index}
            currentMarket={item.market_cap}
            totalMarket={item.total_volume}
          />
        </div>
        <div className="w-[228px]">
          <TableBar
            index={index}
            totalMarket={item.circulating_supply}
            currentMarket={item.total_supply}
          />
        </div>
        <div className="w-[120px]">
          <TableChart index={index} chartData={item.sparkline_in_7d.price} />
        </div>
      </div>
    </Link>
  );
};

export default TableCoinList;

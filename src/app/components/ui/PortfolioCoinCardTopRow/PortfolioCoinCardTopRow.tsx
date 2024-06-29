import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import UpDownArrow from "../UpDownArrow/UpDownArrow";
import { greaterThanZero, numberWithCommas } from "@/app/utils/utils";

const PortfolioCoinCardTopRow = ({
  data,
  currency,
  currencySign,
  currentPrice,
  marketVsVolume,
  circVsMaxSupply,
}: {
  data: any;
  currency: string;
  currencySign: string;
  currentPrice: number;
  marketVsVolume: number;
  circVsMaxSupply: string;
}) => {
  return (
    <div className="flex item-center justify-between text-[14px] font-[400]">
      <div className="flex flex-col justify-center items-center w-[93px] ">
        <p>Current price:</p>
        <p className="text-[16px]  font-[500] text-[#01F1E3]">
          {currencySign}
          {numberWithCommas(currentPrice)}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center w-[137px] ">
        <p>Price exchange 24h:</p>
        <div className="flex items-center gap-[4px]">
          <UpDownArrow
            priceChangePercentage={
              data?.market_data.price_change_24h_in_currency
            }
          />
          <p
            className={` text-[16px] font-[500] ${
              greaterThanZero(data?.market_data.price_change_24h_in_currency)
                ? "text-[#00B1A7]"
                : "text-[#FE2264]"
            }`}
          >
            {currencySign}
            {numberWithCommas(
              Math.abs(
                data?.market_data.price_change_24h_in_currency[currency]
              ).toFixed(2)
            )}
          </p>
        </div>
      </div>
      <div className=" flex flex-col justify-center items-center w-[152px] ">
        <p>Market Cap vs Volume:</p>
        <div className="flex items-center gap-[8px]">
          <p>{marketVsVolume}%</p>
          <ProgressBar
            percentage={marketVsVolume}
            fillBackground="bg-[#00B1A7]"
          />
        </div>
      </div>
      <div className=" flex flex-col justify-center items-center w-[179px] ">
        <p>Circ supply vs max supply:</p>
        <p className="text-[16px] font-[500] text-[#01F1E3]">
          {circVsMaxSupply}
        </p>
      </div>
    </div>
  );
};

export default PortfolioCoinCardTopRow;

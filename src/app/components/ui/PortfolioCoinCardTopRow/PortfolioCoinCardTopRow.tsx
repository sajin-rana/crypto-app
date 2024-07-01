import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import UpDownArrow from "../UpDownArrow/UpDownArrow";
import { greaterThanZero, numberWithCommas } from "@/app/utils/utils";
import PortfolioCoinCardLoading from "../PortfolioCoinCardLoading/PortfolioCoinCardLoading";

const PortfolioCoinCardTopRow = ({
  isLoading,
  currencySign,
  currentPrice,
  marketVsVolume,
  circVsMaxSupply,
  priceChange24hInCurrency,
}: {
  isLoading: boolean;
  currencySign: string;
  currentPrice: number;
  marketVsVolume: number;
  circVsMaxSupply: string;
  priceChange24hInCurrency: any;
}) => {
  return (
    <div className="flex item-center justify-between text-[14px] font-[400]">
      <div className="flex flex-col justify-center items-center w-[93px] ">
        <p>Current price:</p>
        {isLoading ? (
          <PortfolioCoinCardLoading />
        ) : (
          <p className="text-[16px]  font-[500] text-[#01F1E3]">
            {currencySign}
            {numberWithCommas(currentPrice)}
          </p>
        )}
      </div>
      <div className="flex flex-col justify-center items-center w-[137px] ">
        <p>Price exchange 24h:</p>
        {isLoading ? (
          <PortfolioCoinCardLoading />
        ) : (
          <div className="flex items-center gap-[4px]">
            <UpDownArrow
              upArrowColor="#01F1E3"
              priceChangePercentage={priceChange24hInCurrency}
            />
            <p
              className={` text-[16px] font-[500] ${
                greaterThanZero(priceChange24hInCurrency)
                  ? "text-[#01F1E3]"
                  : "text-[#FE2264]"
              }`}
            >
              {currencySign}
              {numberWithCommas(Math.abs(priceChange24hInCurrency).toFixed(2))}
            </p>
          </div>
        )}
      </div>
      <div className=" flex flex-col justify-center items-center w-[152px] ">
        <p>Market Cap vs Volume:</p>
        {isLoading ? (
          <PortfolioCoinCardLoading />
        ) : (
          <div className="flex items-center gap-[8px]">
            <p>{marketVsVolume}%</p>
            <ProgressBar
              percentage={marketVsVolume}
              fillBackground="bg-[#00B1A7]"
            />
          </div>
        )}
      </div>
      <div className=" flex flex-col justify-center items-center w-[179px] ">
        <p>Circ supply vs max supply:</p>
        {isLoading ? (
          <PortfolioCoinCardLoading />
        ) : (
          <p className="text-[16px] font-[500] text-[#01F1E3]">
            {circVsMaxSupply}
          </p>
        )}
      </div>
    </div>
  );
};

export default PortfolioCoinCardTopRow;

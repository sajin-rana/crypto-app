import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Line from "../Line/Line";
import CopyIcon from "../CopyIcon/CopyIcon";
import UpDownArrow from "../UpDownArrow/UpDownArrow";
import AllTimeHighAndLow from "../AllTimeHighAndLow/AllTimeHighAndLow";
import {
  greaterThanZero,
  numberWithCommas,
  getNumberUsingPercentage,
} from "@/app/utils/utils";

function profitLossColor(priceChangePercentage: number) {
  return greaterThanZero(priceChangePercentage)
    ? "text-[#01F1E3]"
    : "text-[#FE2264]";
}

const CoinPageMainBox = ({
  data,
  isDark,
  isError,
  currency,
  isLoading,
  handleIsCopy,
  currencySign,
  currentPrice,
}: {
  data: any;
  isError: any;
  isDark: boolean;
  currency: string;
  handleIsCopy: any;
  isLoading: boolean;
  currencySign: string;
  currentPrice: number;
}) => {
  const allTimeHighDate = data?.market_data.ath_date?.[currency];
  const allTimeHighMoney = data?.market_data.ath?.[currency];
  const allTimeLowDate = data?.market_data.atl_date?.[currency];
  const allTimeLowMoney = data?.market_data.atl?.[currency];
  const priceChangePercentage =
    data?.market_data.price_change_percentage_24h_in_currency?.[currency];
  return (
    <div
      className={`w-full sm:w-[564px] rounded-[12px] py-[20px] px-[15px] sm:py-[40px] sm:px-[32px] ${
        isDark ? "bg-[#1E1932]" : "bg-[#ffffff] "
      }`}
    >
      {isLoading || isError ? (
        <div className="flex items-center gap-[16px] sm:gap-[24px]">
          {" "}
          <div className="skeleton w-[32px] h-[32px] sm:w-[42px] sm:h-[42px] rounded-full" />
          <div className="">
            <div className="skeleton w-[150px] h-[22px] sm:w-[177px] sm:h-[32px] rounded-[8px]" />
            <div className="skeleton w-[150px] h-[22px] sm:w-[177px] sm:h-[32px] rounded-[8px] mt-[5px] sm:mt-[10px]" />
          </div>
        </div>
      ) : (
        <div className="flex items-center h-[32px] w-[32px] sm:h-[48px] sm:w-[48px] gap-[16px] sm:gap-[24px]">
          <Image
            width={48}
            height={48}
            alt={data?.name}
            src={data?.image?.large}
          />
          <div>
            <h4 className=" text-[20px] font-[500] sm:text-[24px] sm:font-[700]">
              {data?.name} ({data?.symbol.toUpperCase()})
            </h4>
            <div className="flex items-center gap-[8px] text-[14px] sm:text-[16px] font-[500] cursor-pointer hover:underline underline-offset-[2px] ">
              <Link href={data?.links?.homepage[0] || ""} target="_blank">
                {data?.links.homepage[0]}
              </Link>
              <CopyToClipboard
                text={data?.links.homepage[0]}
                onCopy={handleIsCopy}
              >
                <span>
                  <CopyIcon />
                </span>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      )}

      {isLoading || isError ? (
        <div>
          <div className="skeleton w-[150px] h-[22px] sm:w-[177px] sm:h-[32px] rounded-[8px] mt-[20px] sm:mt-[40px]" />
          <div className="skeleton w-[150px] h-[22px] sm:w-[177px] sm:h-[32px] rounded-[8px] mt-[5px] sm:mt-[10px]" />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-[8px] sm:gap-[16px] mt-[20px] sm:mt-[40px]">
            <h4 className="text-[26px] font-[500] sm:text-[36px] sm:font-[700]">
              {currencySign}
              {numberWithCommas(currentPrice)}
            </h4>
            <div className="flex items-center gap-[4px]">
              <span>
                <UpDownArrow priceChangePercentage={priceChangePercentage} />
              </span>
              <span
                className={`text-[16px] sm:text-[20px] font-[500]
          ${profitLossColor(priceChangePercentage)}`}
              >
                {Math.abs(priceChangePercentage).toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="mt-[10px] sm:mt-[20px] flex items-center gap-[8px] sm:gap-[16px]">
            <p className="text-[16px] sm:text-[20px] font-[400]">
              {greaterThanZero(priceChangePercentage) ? "Profit:" : "Loss:"}
            </p>
            <p
              className={`text-[20px] sm:text-[24px] font-[500] ${profitLossColor(
                priceChangePercentage
              )}`}
            >
              {currencySign}
              {numberWithCommas(
                getNumberUsingPercentage(priceChangePercentage, currentPrice)
              )}
            </p>
          </div>
        </>
      )}
      <Line />
      <AllTimeHighAndLow
        isUpArrow={true}
        isError={isError}
        text="All time high:"
        isLoading={isLoading}
        currencySign={currencySign}
        allTimeDate={allTimeHighDate}
        allTimeMoney={allTimeHighMoney}
      />

      <div className="mt-[10px] sm:mt-[20px]">
        <AllTimeHighAndLow
          isUpArrow={false}
          isError={isError}
          text="All time low:"
          isLoading={isLoading}
          currencySign={currencySign}
          allTimeDate={allTimeLowDate}
          allTimeMoney={allTimeLowMoney}
        />
      </div>
    </div>
  );
};

export default CoinPageMainBox;

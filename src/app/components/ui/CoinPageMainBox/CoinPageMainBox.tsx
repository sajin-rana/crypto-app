import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  getNumberUsingPercentage,
  greaterThanZero,
  numberWithCommas,
} from "@/app/utils/utils";
import UpDownArrow from "../UpDownArrow/UpDownArrow";
import CopyIcon from "../CopyIcon/CopyIcon";
import Line from "../Line/Line";
import AllTimeHighAndLow from "../AllTimeHighAndLow/AllTimeHighAndLow";

function profitLossColor(priceChangePercentage: number) {
  return greaterThanZero(priceChangePercentage)
    ? "text-[#00B1A7]"
    : "text-[#FE2264]";
}

const CoinPageMainBox = ({
  isDark,
  data,
  handleIsCopy,
  currencySign,
  currentPrice,
  currency,
}: {
  isDark: boolean;
  data: any;
  handleIsCopy: any;
  currencySign: string;
  currentPrice: number;
  currency: string;
}) => {
  const allTimeHighDate = data?.market_data.ath_date?.[currency];
  const allTimeHighMoney = data?.market_data.ath?.[currency];
  const allTimeLowDate = data?.market_data.atl_date?.[currency];
  const allTimeLowMoney = data?.market_data.atl?.[currency];
  const priceChangePercentage =
    data?.market_data.price_change_percentage_24h_in_currency?.[currency];
  return (
    <div
      className={`w-[564px] rounded-[12px] py-[40px] px-[32px] ${
        isDark ? "bg-[#1E1932]" : "bg-[#ffffff] "
      }`}
    >
      <div className="flex items-center gap-[24px]">
        <Image
          src={data?.image?.large}
          alt={data?.name}
          height={48}
          width={48}
        />
        <div>
          <h4 className="text-[24px] font-[700]">
            {data?.name} ({data?.symbol.toUpperCase()})
          </h4>
          <div className="flex items-center gap-[8px] cursor-pointer hover:underline underline-offset-[2px] ">
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
      <div className="flex items-center gap-[16px] mt-[40px]">
        <h4 className="text-[36px] font-[700]">
          {currencySign}
          {numberWithCommas(currentPrice)}
        </h4>
        <div className="flex items-center gap-[4px]">
          <span>
            <UpDownArrow priceChangePercentage={priceChangePercentage} />
          </span>
          <span
            className={`text-[20px] font-[500]
          ${profitLossColor(priceChangePercentage)}`}
          >
            {Math.abs(priceChangePercentage).toFixed(2)}%
          </span>
        </div>
      </div>
      <div className="mt-[20px] flex items-center gap-[16px]">
        <p className="text-[20px] font-[400]">
          {greaterThanZero(priceChangePercentage) ? "Profit:" : "Loss:"}
        </p>
        <p
          className={`text-[24px] font-[500] ${profitLossColor(
            priceChangePercentage
          )}`}
        >
          {currencySign}
          {getNumberUsingPercentage(priceChangePercentage, currentPrice)}
        </p>
      </div>
      <Line />
      <AllTimeHighAndLow
        currencySign={currencySign}
        allTimeDate={allTimeHighDate}
        allTimeMoney={allTimeHighMoney}
        text="All time high:"
        isUpArrow={true}
      />

      <div className="mt-[20px]">
        <AllTimeHighAndLow
          currencySign={currencySign}
          allTimeDate={allTimeLowDate}
          allTimeMoney={allTimeLowMoney}
          text="All time low:"
          isUpArrow={false}
        />
      </div>
    </div>
  );
};

export default CoinPageMainBox;

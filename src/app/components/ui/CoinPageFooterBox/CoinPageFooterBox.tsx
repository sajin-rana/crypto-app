import React from "react";
import { CoinPageBox } from "../CoinPageBox/CoinPageBox";
import { getPercentage, numberWithCommas } from "@/app/utils/utils";
import CoinPageBulletPoint from "../CoinPageBulletPoint/CoinPageBulletPoint";
import CoinPageProgressBar from "../CoinPageProgressBar/CoinPageProgressBar";

const CoinPageFooterBox = ({
  data,
  currency,
  currencySign,
}: {
  data: any;
  currency: string;
  currencySign: string;
}) => {
  return (
    <>
      <div className="block sm:flex  justify-between ">
        <CoinPageBox>
          <CoinPageBulletPoint
            text="Total Volume"
            amount={`${numberWithCommas(
              data?.market_data.total_volume?.[currency]
            )} ${data?.symbol?.toLocaleUpperCase()}`}
          />
          <CoinPageBulletPoint
            text="Volume 24h"
            amount={`${currencySign}${numberWithCommas(
              Math.abs(
                data?.market_data.market_cap_change_24h_in_currency?.[currency]
              ).toFixed(2)
            )}`}
          />
          <CoinPageBulletPoint
            text="Volume/Market"
            amount={(
              data?.market_data.total_volume?.[currency] /
              data?.market_data?.market_cap?.[currency]
            ).toFixed(5)}
          />
        </CoinPageBox>
        <div className="mt-[20px] sm:mt-[0px]">
          <CoinPageBox>
            <CoinPageBulletPoint
              text="Max Supply"
              amount={`${numberWithCommas(
                data?.market_data.max_supply
              )} ${data?.symbol?.toLocaleUpperCase()}`}
            />
            <CoinPageBulletPoint
              text="Circulating Supply"
              amount={`${numberWithCommas(
                data?.market_data.circulating_supply
              )} ${data?.symbol?.toLocaleUpperCase()}`}
            />
            <CoinPageProgressBar
              data={getPercentage(
                data?.market_data?.circulating_supply,
                data?.market_data?.max_supply
              )}
            />
          </CoinPageBox>
        </div>
      </div>
      <div className="mt-[20px] sm:mt-[18px] mb-[50px]">
        <CoinPageBox>
          <CoinPageBulletPoint
            text="Market Cap"
            amount={`${currencySign}${numberWithCommas(
              data?.market_data.market_cap?.[currency].toFixed(2)
            )}`}
          />
          <CoinPageBulletPoint
            text="Fully Diluted Valuation"
            amount={`${currencySign}${numberWithCommas(
              data?.market_data.fully_diluted_valuation?.[currency].toFixed(2)
            )}`}
          />
        </CoinPageBox>
      </div>
    </>
  );
};

export default CoinPageFooterBox;

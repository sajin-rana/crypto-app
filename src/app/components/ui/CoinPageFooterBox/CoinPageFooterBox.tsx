import React from "react";
import { CoinPageBox } from "../CoinPageBox/CoinPageBox";
import CoinPageBulletPoint from "../CoinPageBulletPoint/CoinPageBulletPoint";
import { getPercentage, numberWithCommas } from "@/app/utils/utils";
import CoinPageProgressBar from "../CoinPageProgressBar/CoinPageProgressBar";

const CoinPageFooterBox = ({
  data,
  currencySign,
  currency,
}: {
  data: any;
  currencySign: string;
  currency: string;
}) => {
  return (
    <>
      <div className="flex  justify-between ">
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
      <div className="mt-[18px] mb-[50px]">
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

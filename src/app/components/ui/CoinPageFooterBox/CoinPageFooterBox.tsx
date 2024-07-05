import React from "react";
import { CoinPageBox } from "../CoinPageBox/CoinPageBox";
import { getPercentage, numberWithCommas } from "@/app/utils/utils";
import CoinPageBulletPoint from "../CoinPageBulletPoint/CoinPageBulletPoint";
import CoinPageProgressBar from "../CoinPageProgressBar/CoinPageProgressBar";

const CoinPageFooterBox = ({
  data,
  isError,
  currency,
  isLoading,
  currencySign,
}: {
  data: any;
  isError: any;
  currency: string;
  isLoading: boolean;
  currencySign: string;
}) => {
  return (
    <>
      <div className="block sm:flex  justify-between ">
        <CoinPageBox>
          <CoinPageBulletPoint
            isError={isError}
            text="Total Volume"
            isLoading={isLoading}
            amount={`${numberWithCommas(
              data?.market_data.total_volume?.[currency]
            )} ${data?.symbol?.toLocaleUpperCase()}`}
          />
          <CoinPageBulletPoint
            isError={isError}
            text="Volume 24h"
            isLoading={isLoading}
            amount={`${currencySign}${numberWithCommas(
              Math.abs(
                data?.market_data.market_cap_change_24h_in_currency?.[currency]
              ).toFixed(2)
            )}`}
          />
          <CoinPageBulletPoint
            isError={isError}
            text="Volume/Market"
            isLoading={isLoading}
            amount={(
              data?.market_data.total_volume?.[currency] /
              data?.market_data?.market_cap?.[currency]
            ).toFixed(5)}
          />
        </CoinPageBox>
        <div className="mt-[20px] sm:mt-[0px]">
          <CoinPageBox>
            <CoinPageBulletPoint
              isError={isError}
              text="Max Supply"
              isLoading={isLoading}
              amount={`${numberWithCommas(
                data?.market_data.max_supply
              )} ${data?.symbol?.toLocaleUpperCase()}`}
            />
            <CoinPageBulletPoint
              isError={isError}
              isLoading={isLoading}
              text="Circulating Supply"
              amount={`${numberWithCommas(
                data?.market_data.circulating_supply
              )} ${data?.symbol?.toLocaleUpperCase()}`}
            />
            <CoinPageProgressBar
              isError={isError}
              isLoading={isLoading}
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
            isError={isError}
            text="Market Cap"
            isLoading={isLoading}
            amount={`${currencySign}${numberWithCommas(
              data?.market_data.market_cap?.[currency].toFixed(2)
            )}`}
          />
          <CoinPageBulletPoint
            isError={isError}
            isLoading={isLoading}
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

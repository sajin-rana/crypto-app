"use client";
import React from "react";
import { useSelector } from "react-redux";
import { getPercentage, setLocalStorage } from "@/app/utils/utils";
import ConvertorBoxLine from "../ConvertorBoxLine/ConvertorBoxLine";
import { selectCurrency, selectIsDark } from "@/lib/features/cryptoSlice";
import PortfolioImageContainer from "../PortfolioImageContainer/PortfolioImageContainer";
import PortfolioCoinCardTopRow from "../PortfolioCoinCardTopRow/PortfolioCoinCardTopRow";
import PortfolioCoinCardHeading from "../PortfolioCoinCardHeading/PortfolioCoinCardHeading";
import PortfolioCoinCardBottomRow from "../PortfolioCoinCardBottomRow/PortfolioCoinCardBottomRow";
import {
  useGetOneCoinDetailQuery,
  useGetHistoryDateCoinDetailQuery,
} from "@/lib/features/cryptoApi";

function hasErrorStyle(isDark: boolean, isError: boolean) {
  if (isError) {
    if (isDark) {
      return "w-full flex items-center justify-center bg-[#191934] text-[white]";
    } else {
      return "w-full flex items-center justify-center bg-[#EBEBFC] text-[#191925]";
    }
  }
}

const PortfolioCoinCard = ({
  coin,
  purchasedCoinList,
  setPurchasedCoinList,
}: {
  coin: any;
  purchasedCoinList: any;
  setPurchasedCoinList: any;
}) => {
  const isDark = useSelector(selectIsDark);
  const getCurrency = useSelector(selectCurrency);
  const currency = getCurrency.name.toLowerCase();
  const currencySign = getCurrency.sign;
  const coinName = coin.coin;
  const { data, isLoading, isError } = useGetOneCoinDetailQuery(coinName);
  const purchaseDate = coin.purchaseTime?.split("-").reverse().join("-");
  const query = `${coinName}/history?date=${purchaseDate}`;
  const {
    isError: historyIsError,
    data: historyDateCoinData,
    isLoading: historyIsLoading,
  } = useGetHistoryDateCoinDetailQuery(query);

  const marketVsVolume = getPercentage(
    data?.market_data?.total_volume?.[currency],
    data?.market_data?.market_cap?.[currency]
  );

  const circVsMaxSupply = (
    data?.market_data?.circulating_supply / data?.market_data?.max_supply
  ).toFixed(2);

  const amountValue =
    coin?.amount * data?.market_data?.current_price?.[currency];

  const currentPrice = data?.market_data?.current_price?.[currency];
  const purchasePrice =
    historyDateCoinData?.market_data?.current_price[currency];

  const priceChangeAmount = (currentPrice / purchasePrice) * 100;
  const isGainOrLoss = currentPrice - purchasePrice;
  const gainOrLossAmount = priceChangeAmount * coin.amount;

  function handleDeleteButtonClick() {
    const newList = purchasedCoinList.filter(
      (item: any) => item.id !== coin.id
    );
    setPurchasedCoinList(newList);
    setLocalStorage("purchasedCoinList", newList);
  }

  return (
    <div className="h-[530px] sm:h-[292px] block sm:flex mt-[20px] sm:mt-[24px] ">
      <PortfolioImageContainer
        isError={historyIsError}
        data={historyDateCoinData}
        isLoading={historyIsLoading}
        style="w-full sm:w-[258px] h-[40%] sm:h-full"
      />
      <div
        className={`w-full sm:w-[calc(100%-258px)] h-[60%] sm:h-full p-[12px]  sm:p-[24px] ${
          isDark ? "bg-[#191934]" : "bg-[#EBEBFC]"
        }`}
      >
        <div
          className={`flex flex-col gap-[8px] sm:gap-[16px] ${
            isDark ? "text-[white]" : "text-[#191925]"
          } `}
        >
          <PortfolioCoinCardHeading
            isDark={isDark}
            isError={historyIsError}
            isLoading={historyIsLoading}
            historyDateCoinData={historyDateCoinData}
            handleDeleteButtonClick={handleDeleteButtonClick}
          />
          {isError && (
            <div className={`${hasErrorStyle(isDark, isError)}`}>
              <p className="text-[16px] sm:text-[24px]">
                Opps! something went wrong
              </p>
            </div>
          )}
          {!isError && (
            <PortfolioCoinCardTopRow
              isLoading={isLoading}
              currencySign={currencySign}
              currentPrice={currentPrice}
              marketVsVolume={marketVsVolume}
              circVsMaxSupply={circVsMaxSupply}
              priceChange24hInCurrency={
                data?.market_data?.price_change_24h_in_currency?.[currency]
              }
            />
          )}
        </div>
        {!isError && (
          <>
            <ConvertorBoxLine isDark={isDark} />
            <PortfolioCoinCardBottomRow
              coin={coin}
              isDark={isDark}
              isLoading={isLoading}
              amountValue={amountValue}
              currencySign={currencySign}
              isGainOrLoss={isGainOrLoss}
              gainOrLossAmount={gainOrLossAmount}
              purchasedCoinList={purchasedCoinList}
              setPurchasedCoinList={setPurchasedCoinList}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PortfolioCoinCard;

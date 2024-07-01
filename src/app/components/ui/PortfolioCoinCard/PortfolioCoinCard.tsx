"use client";
import React from "react";
import { useSelector } from "react-redux";
import { getPercentage, setLocalStorage } from "@/app/utils/utils";
import ConvertorBoxLine from "../ConvertorBoxLine/ConvertorBoxLine";
import { selectCurrency, selectIsDark } from "@/lib/features/cryptoSlice";
import { useGetHistoryDateCoinDetailQuery } from "@/lib/features/cryptoApi";
import PortfolioImageContainer from "../PortfolioImageContainer/PortfolioImageContainer";
import PortfolioCoinCardTopRow from "../PortfolioCoinCardTopRow/PortfolioCoinCardTopRow";
import PortfolioCoinCardHeading from "../PortfolioCoinCardHeading/PortfolioCoinCardHeading";
import PortfolioCoinCardBottomRow from "../PortfolioCoinCardBottomRow/PortfolioCoinCardBottomRow";

function hasErrorStyle(isDark: boolean, hasError: boolean) {
  if (hasError) {
    if (isDark) {
      return "w-full flex items-center justify-center bg-[#191934] text-[white]";
    } else {
      return "w-full flex items-center justify-center bg-[#EBEBFC] text-[#191925]";
    }
  }
}
const PortfolioCoinCard = ({
  coin,
  hasError,
  isLoading,
  purchasedCoinList,
  uniqueCoinDataList,
  setPurchasedCoinList,
}: {
  coin: any;
  hasError: boolean;
  isLoading: boolean;
  purchasedCoinList: any;
  uniqueCoinDataList: any;
  setPurchasedCoinList: any;
}) => {
  const isDark = useSelector(selectIsDark);
  const getCurrency = useSelector(selectCurrency);
  const currency = getCurrency.name.toLowerCase();
  const currencySign = getCurrency.sign;
  const coinName = coin.coin;
  const purchaseDate = coin.purchaseTime?.split("-").reverse().join("-");
  const query = `${coinName}/history?date=${purchaseDate}`;
  const { data: historyDateCoinData } = useGetHistoryDateCoinDetailQuery(query);

  const marketVsVolume = getPercentage(
    uniqueCoinDataList?.[coinName].totalVolume,
    uniqueCoinDataList?.[coinName].marketCap
  );

  const circVsMaxSupply = (
    uniqueCoinDataList?.[coinName].circulatingSupply /
    uniqueCoinDataList?.[coinName].maxSupply
  ).toFixed(2);

  const amountValue =
    coin?.amount * uniqueCoinDataList?.[coinName].currentPrice;

  const currentPrice = uniqueCoinDataList?.[coinName].currentPrice;
  const purchasePrice =
    historyDateCoinData?.market_data.current_price[currency];

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
    <div
      className={`h-[292px] flex mt-[24px] cursor-pointer ${hasErrorStyle(
        isDark,
        hasError
      )}`}
    >
      {hasError && <h4 className="text-[24px]">Opps! something went wrong</h4>}
      {!hasError && (
        <>
          <PortfolioImageContainer
            style="w-[258px]"
            isLoading={isLoading}
            data={historyDateCoinData}
          />
          <div
            className={`w-[calc(100%-258px)] h-full p-[24px] ${
              isDark ? "bg-[#191934]" : "bg-[#EBEBFC]"
            }`}
          >
            <div
              className={`flex flex-col gap-[16px] ${
                isDark ? "text-[white]" : "text-[#191925]"
              }`}
            >
              <PortfolioCoinCardHeading
                isDark={isDark}
                historyDateCoinData={historyDateCoinData}
                handleDeleteButtonClick={handleDeleteButtonClick}
              />
              <PortfolioCoinCardTopRow
                isLoading={isLoading}
                currencySign={currencySign}
                currentPrice={currentPrice}
                marketVsVolume={marketVsVolume}
                circVsMaxSupply={circVsMaxSupply}
                priceChange24hInCurrency={
                  uniqueCoinDataList?.[coinName].priceChange24hInCurrency
                }
              />
            </div>
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
          </div>
        </>
      )}
    </div>
  );
};

export default PortfolioCoinCard;

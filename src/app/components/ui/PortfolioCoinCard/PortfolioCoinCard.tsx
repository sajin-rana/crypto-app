"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getPercentage, setLocalStorage } from "@/app/utils/utils";
import ConvertorBoxLine from "../ConvertorBoxLine/ConvertorBoxLine";
import { selectCurrency, selectIsDark } from "@/lib/features/cryptoSlice";
import { useGetHistoryDateCoinDetailQuery } from "@/lib/features/cryptoApi";
import PortfolioImageContainer from "../PortfolioImageContainer/PortfolioImageContainer";
import PortfolioCoinCardTopRow from "../PortfolioCoinCardTopRow/PortfolioCoinCardTopRow";
import PortfolioCoinCardHeading from "../PortfolioCoinCardHeading/PortfolioCoinCardHeading";
import PortfolioCoinCardBottomRow from "../PortfolioCoinCardBottomRow/PortfolioCoinCardBottomRow";

const PortfolioCoinCard = ({
  coin,
  purchasedCoinList,
  nonDuplicateCoinList,
  setPurchasedCoinList,
}: {
  coin: any;
  purchasedCoinList: any;
  nonDuplicateCoinList: any;
  setPurchasedCoinList: any;
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const isDark = useSelector(selectIsDark);
  const getCurrency = useSelector(selectCurrency);
  const currency = getCurrency.name.toLowerCase();
  const currencySign = getCurrency.sign;
  const coinName = coin.coin;
  const purchaseDate = coin.purchaseTime?.split("-").reverse().join("-");
  const query = `${coinName}/history?date=${purchaseDate}`;
  const { data: historyDateCoinData } = useGetHistoryDateCoinDetailQuery(query);

  const marketVsVolume = getPercentage(
    nonDuplicateCoinList?.[coinName].totalVolume,
    nonDuplicateCoinList?.[coinName].marketCap
  );

  const circVsMaxSupply = (
    nonDuplicateCoinList?.[coinName].circulatingSupply /
    nonDuplicateCoinList?.[coinName].maxSupply
  ).toFixed(2);

  const amountValue =
    coin?.amount * nonDuplicateCoinList?.[coinName].currentPrice;

  const currentPrice = nonDuplicateCoinList?.[coinName].currentPrice;
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
    <div className="h-[292px] flex mt-[24px] cursor-pointer">
      <PortfolioImageContainer style="w-[258px]" data={historyDateCoinData} />
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
            isDeleteOpen={isDeleteOpen}
            setIsDeleteOpen={setIsDeleteOpen}
            historyDateCoinData={historyDateCoinData}
            handleDeleteButtonClick={handleDeleteButtonClick}
          />
          <PortfolioCoinCardTopRow
            currencySign={currencySign}
            currentPrice={currentPrice}
            marketVsVolume={marketVsVolume}
            circVsMaxSupply={circVsMaxSupply}
            priceChange24hInCurrency={
              nonDuplicateCoinList?.[coinName].priceChange24hInCurrency
            }
          />
        </div>
        <ConvertorBoxLine isDark={isDark} />
        <PortfolioCoinCardBottomRow
          coin={coin}
          isDark={isDark}
          isEditOpen={isEditOpen}
          amountValue={amountValue}
          currencySign={currencySign}
          isGainOrLoss={isGainOrLoss}
          setIsEditOpen={setIsEditOpen}
          gainOrLossAmount={gainOrLossAmount}
          purchasedCoinList={purchasedCoinList}
          setPurchasedCoinList={setPurchasedCoinList}
        />
      </div>
    </div>
  );
};

export default PortfolioCoinCard;

"use client";
import React, { useState } from "react";
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

const PortfolioCoinCard = ({
  coin,
  purchasedCoinList,
  setPurchasedCoinList,
}: {
  coin: any;
  purchasedCoinList: any;
  setPurchasedCoinList: any;
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const isDark = useSelector(selectIsDark);
  const getCurrency = useSelector(selectCurrency);
  const currency = getCurrency.name.toLowerCase();
  const currencySign = getCurrency.sign;
  const coinName = coin.coin;
  const { data }: any = useGetOneCoinDetailQuery(coinName);
  const purchaseDate = coin.purchaseTime?.split("-").reverse().join("-");
  const query = `${coinName}/history?date=${purchaseDate}`;
  const { data: historyDateCoinData } = useGetHistoryDateCoinDetailQuery(query);
  const marketVsVolume = getPercentage(
    data?.market_data.total_volume[currency],
    data?.market_data.market_cap[currency]
  );
  const circVsMaxSupply = (
    data?.market_data.circulating_supply / data?.market_data.max_supply
  ).toFixed(2);
  const amountValue = coin?.amount * data?.market_data?.current_price[currency];
  const currentPrice = data?.market_data?.current_price[currency];
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
      <PortfolioImageContainer data={data} style="w-[258px]" />
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
            data={data}
            isDark={isDark}
            isDeleteOpen={isDeleteOpen}
            setIsDeleteOpen={setIsDeleteOpen}
            handleDeleteButtonClick={handleDeleteButtonClick}
          />
          <PortfolioCoinCardTopRow
            data={data}
            currency={currency}
            currencySign={currencySign}
            currentPrice={currentPrice}
            marketVsVolume={marketVsVolume}
            circVsMaxSupply={circVsMaxSupply}
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

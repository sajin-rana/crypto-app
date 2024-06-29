"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getLocalStorage } from "../utils/utils";
import { selectCurrency } from "@/lib/features/cryptoSlice";
import PortfolioHeader from "../components/ui/PortfolioHeader/PortfolioHeader";
import PortfolioCoinCard from "../components/ui/PortfolioCoinCard/PortfolioCoinCard";

function Portfolio() {
  const coins = getLocalStorage("purchasedCoinList");
  const [purchasedCoinList, setPurchasedCoinList] = useState(coins);
  const getCurrency = useSelector(selectCurrency);
  const currency = getCurrency.name.toLowerCase();

  const nonDuplicateCoinList = purchasedCoinList?.reduce(
    (acc: any, el: any) => {
      if (acc[el?.coin]) return acc;
      return { ...acc, [el?.coin]: el };
    },
    {}
  );

  async function getNonDuplicateCoinListData() {
    await Promise.all(
      Object.keys(nonDuplicateCoinList).map(async (coinName) => {
        const data = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinName}`
        );
        const json = await data.json();
        nonDuplicateCoinList[coinName].currentPrice =
          json?.market_data.current_price[currency];

        nonDuplicateCoinList[coinName].totalVolume =
          json?.market_data.total_volume[currency];

        nonDuplicateCoinList[coinName].marketCap =
          json?.market_data.market_cap[currency];

        nonDuplicateCoinList[coinName].circulatingSupply =
          json?.market_data.circulating_supply;

        nonDuplicateCoinList[coinName].maxSupply = json?.market_data.max_supply;

        nonDuplicateCoinList[coinName].priceChange24hInCurrency =
          json?.market_data.price_change_24h_in_currency[currency];
      })
    );
  }

  getNonDuplicateCoinListData();

  return (
    <div className="mt-[40px] min-h-[80vh]">
      <PortfolioHeader
        purchasedCoinList={purchasedCoinList}
        setPurchasedCoinList={setPurchasedCoinList}
      />
      {purchasedCoinList?.length > 0 &&
        purchasedCoinList.map((coin: any) => (
          <PortfolioCoinCard
            coin={coin}
            key={coin.id}
            purchasedCoinList={purchasedCoinList}
            setPurchasedCoinList={setPurchasedCoinList}
            nonDuplicateCoinList={nonDuplicateCoinList}
          />
        ))}
    </div>
  );
}

export default Portfolio;

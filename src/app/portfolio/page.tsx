"use client";
import { useEffect, useState } from "react";
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
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const nonDuplicateCoinList = purchasedCoinList?.reduce(
    (acc: any, el: any) => {
      if (acc[el?.coin]) return acc;
      return { ...acc, [el?.coin]: el };
    },
    {}
  );
  const [uniqueCoinDataList, setUniqueCoinDataList] =
    useState(nonDuplicateCoinList);

  useEffect(
    function () {
      async function getNonDuplicateCoinListData() {
        try {
          setIsLoading(true);
          const uniqueCoinData: any = uniqueCoinDataList;
          await Promise.all(
            Object.keys(uniqueCoinDataList).map(async (coinName) => {
              const data = await fetch(
                `https://api.coingecko.com/api/v3/coins/${coinName}`
              );
              const json = await data.json();
              const currentUniqueCoin = uniqueCoinData[coinName];

              currentUniqueCoin.currentPrice =
                json?.market_data.current_price[currency];

              currentUniqueCoin.totalVolume =
                json?.market_data.total_volume[currency];

              currentUniqueCoin.marketCap =
                json?.market_data.market_cap[currency];

              currentUniqueCoin.circulatingSupply =
                currentUniqueCoin?.market_data.circulating_supply;

              currentUniqueCoin.maxSupply = json?.market_data.max_supply;

              currentUniqueCoin.priceChange24hInCurrency =
                json?.market_data.price_change_24h_in_currency[currency];
            })
          );
          setUniqueCoinDataList(uniqueCoinData);
          setIsLoading(false);
        } catch (error) {
          setHasError(true);
        }
      }
      getNonDuplicateCoinListData();
    },
    [currency, uniqueCoinDataList]
  );

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
            hasError={hasError}
            isLoading={isLoading}
            purchasedCoinList={purchasedCoinList}
            setPurchasedCoinList={setPurchasedCoinList}
            uniqueCoinDataList={uniqueCoinDataList}
          />
        ))}
    </div>
  );
}

export default Portfolio;

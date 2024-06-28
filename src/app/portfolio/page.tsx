"use client";
import { useState } from "react";
import { getLocalStorage } from "../utils/utils";
import PortfolioHeader from "../components/ui/PortfolioHeader/PortfolioHeader";
import PortfolioCoinCard from "../components/ui/PortfolioCoinCard/PortfolioCoinCard";

function Portfolio() {
  const coins = getLocalStorage("purchasedCoinList");
  const [purchasedCoinList, setPurchasedCoinList] = useState(coins);
  return (
    <div className="mt-[40px] min-h-[80vh] ">
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
          />
        ))}
    </div>
  );
}

export default Portfolio;

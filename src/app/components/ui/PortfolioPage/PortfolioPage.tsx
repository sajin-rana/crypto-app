"use client";
import { useState } from "react";
import { getLocalStorage } from "@/app/utils/utils";
import PortfolioHeader from "../PortfolioHeader/PortfolioHeader";
import PortfolioCoinCard from "../PortfolioCoinCard/PortfolioCoinCard";

function PortfolioPage() {
  const coins = getLocalStorage("purchasedCoinList") || [];
  const [purchasedCoinList, setPurchasedCoinList] = useState(coins);

  return (
    <div>
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

export default PortfolioPage;

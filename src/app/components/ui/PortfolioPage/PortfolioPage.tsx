"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getLocalStorage } from "@/app/utils/utils";
import { selectIsDark } from "@/lib/features/cryptoSlice";
import PortfolioHeader from "../PortfolioHeader/PortfolioHeader";
import PortfolioCoinCard from "../PortfolioCoinCard/PortfolioCoinCard";

function PortfolioPage() {
  const isDark = useSelector(selectIsDark);
  const coins = getLocalStorage("purchasedCoinList") || [];
  const [purchasedCoinList, setPurchasedCoinList] = useState(coins);

  return (
    <div>
      <PortfolioHeader
        purchasedCoinList={purchasedCoinList}
        setPurchasedCoinList={setPurchasedCoinList}
      />
      {purchasedCoinList?.length > 0 ? (
        purchasedCoinList.map((coin: any) => (
          <PortfolioCoinCard
            coin={coin}
            key={coin.id}
            purchasedCoinList={purchasedCoinList}
            setPurchasedCoinList={setPurchasedCoinList}
          />
        ))
      ) : (
        <h4
          className={`text-[20px] sm:text-[24px] text-center mt-[40px] sm:mt-[80px] ${
            isDark ? "text-[#ffffff]" : "text-[#424286]"
          }`}
        >
          Your portfolio is currently empty
        </h4>
      )}
    </div>
  );
}

export default PortfolioPage;

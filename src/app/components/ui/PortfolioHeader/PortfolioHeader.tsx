"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";
import PortfolioAddAsset from "../PortfolioAddAsset/PortfolioAddAsset";
import PortfolioCalculator from "../PortfolioCalculator/PortfolioCalculator";

const PortfolioHeader = ({
  purchasedCoinList,
  setPurchasedCoinList,
}: {
  purchasedCoinList: any;
  setPurchasedCoinList: any;
}) => {
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const isDark = useSelector(selectIsDark);

  return (
    <div className="flex items-center  justify-between">
      <p
        className={`text-[20px] font-[500] hidden sm:block ${
          isDark ? "text-[#ffffff]" : "text-[#424286]"
        }`}
      >
        Your statistics
      </p>
      <div className="block sm:flex items-center w-full sm:w-[464px] sm:gap-4">
        <button
          className={` text-[white] text-[14px] sm:text-[16px] font-[500] w-full sm:w-[224px] py-[6px] sm:py-[12px] px-[8px] sm:px-[16px] rounded-[6px] ${
            isDark ? "darkGlowBackground " : "lightGlowBackground"
          }`}
          onClick={() => setIsCalculatorOpen((isOpen) => !isOpen)}
        >
          Investments Calculator
        </button>
        <button
          className={` text-[white] text-[14px] sm:text-[16px] mt-[10px] sm:mt-[0px] font-[500] w-full sm:w-[224px] py-[6px] sm:py-[12px] px-[8px] sm:px-[16px]  rounded-[6px] ${
            isDark ? "darkGlowBackground " : "lightGlowBackground"
          }`}
          onClick={() => setIsAddAssetOpen((isOpen) => !isOpen)}
        >
          Add Asset
        </button>
      </div>
      {isCalculatorOpen && (
        <PortfolioCalculator setIsCalculatorOpen={setIsCalculatorOpen} />
      )}
      {isAddAssetOpen && (
        <PortfolioAddAsset
          setIsAddAssetOpen={setIsAddAssetOpen}
          purchasedCoinList={purchasedCoinList}
          setPurchasedCoinList={setPurchasedCoinList}
        />
      )}
    </div>
  );
};

export default PortfolioHeader;

import React, { useState } from "react";
import UpDownArrow from "../UpDownArrow/UpDownArrow";
import { greaterThanZero, numberWithCommas } from "@/app/utils/utils";
import PortfolioAddAsset from "../PortfolioAddAsset/PortfolioAddAsset";
import PortfolioEditIcon from "../PortfolioEditIcon/PortfolioEditIcon";
import PortfolioCoinCardLoading from "../PortfolioCoinCardLoading/PortfolioCoinCardLoading";

const PortfolioCoinCardBottomRow = ({
  coin,
  isDark,
  isLoading,
  amountValue,
  currencySign,
  isGainOrLoss,
  gainOrLossAmount,
  purchasedCoinList,
  setPurchasedCoinList,
}: {
  coin: any;
  isDark: boolean;
  amountValue: any;
  isLoading: boolean;
  currencySign: string;
  isGainOrLoss: number;
  purchasedCoinList: any;
  gainOrLossAmount: number;
  setPurchasedCoinList: any;
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <div
      className={`flex flex-col gap-[8px] sm:gap-[16px] mt-[10px] sm:mt-[20px]  ${
        isDark ? "text-[white]" : "text-[#191925]"
      }`}
    >
      <div className="flex items-center justify-between ">
        <h4
          className={`text-[16px] sm:text-[20px] font-[500] ${
            isDark ? "text-[white]" : "text-[#191925]"
          }`}
        >
          Your coin
        </h4>
        <div
          className={`h-[30px] w-[30px] sm:h-[40px] sm:w-[40px] rounded-[4px] flex items-center justify-center cursor-pointer ${
            isDark ? "bg-[#3A3978]" : "bg-[#B0B0F0]"
          }`}
          onClick={() => setIsEditOpen(true)}
        >
          <PortfolioEditIcon />
        </div>
      </div>
      <div className="block sm:flex item-center justify-between text-[12px] sm:text-[14px] font-[400]">
        <div className="flex sm:item-center justify-between sm:justify-around sm:w-full">
          <div className="flex flex-col justify-center items-start sm:items-center w-[155.5px] sm:w-[93px]">
            <p>Coin amount:</p>
            {isLoading ? (
              <PortfolioCoinCardLoading />
            ) : (
              <p className="text-[14px] sm:text-[16px]  font-[500] text-[#01F1E3]">
                {coin.amount}
              </p>
            )}
          </div>
          <div className="flex flex-col justify-center items-start sm:items-center w-[155.5px] sm:w-[137px]">
            <p>Amount value:</p>
            {isLoading ? (
              <PortfolioCoinCardLoading />
            ) : (
              <p className="text-[14px] sm:text-[16px]  font-[500] text-[#01F1E3]">
                {currencySign}
                {numberWithCommas(amountValue?.toFixed(2))}
              </p>
            )}
          </div>
        </div>
        <div className="flex sm:item-center justify-between sm:justify-around sm:w-full mt-[10px] sm:mt-[0px]">
          <div className=" flex flex-col justify-center items-start sm:items-center w-[155.5px] sm:w-[152px]">
            <div>
              <span className="text-[#01F1E3]">Gain</span> /{" "}
              <span className="text-[#FE2264]">Loss</span>
            </div>
            {isLoading ? (
              <PortfolioCoinCardLoading />
            ) : (
              <div className="flex items-center gap-[4px] sm:gap-[8px]">
                <div className="flex items-center gap-[4px]">
                  <UpDownArrow
                    upArrowColor="#01F1E3"
                    priceChangePercentage={isGainOrLoss}
                  />
                  <p
                    className={`text-[14px] sm:text-[16px] font-[500] ${
                      greaterThanZero(isGainOrLoss)
                        ? "text-[#01F1E3]"
                        : "text-[#FE2264]"
                    }`}
                  >
                    {currencySign}
                    {numberWithCommas(Math.abs(gainOrLossAmount).toFixed(2))}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className=" flex flex-col justify-center items-start sm:items-center w-[155.5px] sm:w-[179px]">
            <p>Purchase date:</p>
            {isLoading ? (
              <PortfolioCoinCardLoading />
            ) : (
              <p className="text-[14px] sm:text-[16px] font-[500] text-[#01F1E3]">
                {coin?.purchaseTime?.replaceAll("-", ".")}
              </p>
            )}
          </div>
        </div>
      </div>
      {isEditOpen && (
        <PortfolioAddAsset
          isEdited={true}
          coinForEdit={coin}
          setIsAddAssetOpen={setIsEditOpen}
          purchasedCoinList={purchasedCoinList}
          setPurchasedCoinList={setPurchasedCoinList}
        />
      )}
    </div>
  );
};

export default PortfolioCoinCardBottomRow;

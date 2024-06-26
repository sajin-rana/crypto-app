"use client";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import PortfolioTable from "../PortfolioTable/PortfolioTable";
import PortfolioFooter from "../PortfolioFooter/PortfolioFooter";
import { useHandleClickOutside } from "@/app/customHook/CustomHook";
import PortfolioHeading from "../PortfolioHeading/PortfolioHeading";
import PortfolioDateAndQuantity from "../PortfolioDateAndQuantity/PortfolioDateAndQuantity";
import PortfolioCalculateButton from "../PortfolioCalculateButton/PortfolioCalculateButton";
import PortfolioSelectAndSearchCoin from "../PortfolioSelectAndSearchCoin/PortfolioSelectAndSearchCoin";
import PortfolioValueAndDollarButton from "../PortfolioValueAndDollarButton/PortfolioValueAndDollarButton";
import {
  useGetOneCoinDetailQuery,
  useGetHistoryDateCoinDetailQuery,
} from "@/lib/features/cryptoApi";
import {
  selectIsDark,
  selectCurrency,
  selectedCoinOne,
} from "@/lib/features/cryptoSlice";
import {
  calculateDCA,
  calculateVCA,
  convertToUnixTimestamp,
  formatPortfolioDateAndTime,
  getPriceAndDateForEachInvterval,
} from "@/app/utils/utils";

const initialQuantity = {
  growRate: 0,
  coinsValue: 0,
  totalAmount: 0,
  investmentAdded: 0,
  initialInvestment: 0,
  contributionInterval: 0,
};

const PortfolioCalculator = ({
  setIsCalculatorOpen,
}: {
  setIsCalculatorOpen: any;
}) => {
  const [isValueSelected, setIsValueSelected] = useState(true);
  const [isDollarSelected, setIsDollarSelected] = useState(false);
  const [startDateAndTime, setStartDateAndTime] = useState("2024-01-01 00:00");
  const [quantity, setQuantity] = useState(initialQuantity);
  const [endDateAndTime, setEndDateAndTime] = useState(
    formatPortfolioDateAndTime(new Date())
  );
  const isDark = useSelector(selectIsDark);
  const coin = useSelector(selectedCoinOne);
  const getCurrency = useSelector(selectCurrency);
  const currency = getCurrency.name;
  const { data } = useGetOneCoinDetailQuery(coin);
  const startDateInUnix = convertToUnixTimestamp(startDateAndTime);
  const endDateInUnix = convertToUnixTimestamp(endDateAndTime);
  const { data: historyData } = useGetHistoryDateCoinDetailQuery(
    `${coin}/market_chart/range?vs_currency=${currency}&from=${startDateInUnix}&to=${endDateInUnix}&precision=2`
  );
  const ref: any = useRef();
  useHandleClickOutside(ref, setIsCalculatorOpen);

  function handleCalculation() {
    const priceAndDateForEachInterval = getPriceAndDateForEachInvterval(
      historyData,
      quantity,
      startDateAndTime,
      endDateAndTime
    );
    const actualPricesArray = priceAndDateForEachInterval?.map((item) => {
      if (item) {
        return item[1];
      }
    });
    if (isValueSelected) {
      const returnFromVACalculation = calculateVCA(
        quantity.initialInvestment,
        quantity.growRate,
        actualPricesArray
      );
      setQuantity({
        ...quantity,
        totalAmount: returnFromVACalculation.netInvestment,
        coinsValue: returnFromVACalculation.coinsValue,
      });
    } else if (isDollarSelected) {
      const returnFromDACalculation = calculateDCA(
        quantity.initialInvestment,
        quantity.investmentAdded,
        actualPricesArray
      );
      setQuantity({
        ...quantity,
        totalAmount: returnFromDACalculation.netInvestment,
        coinsValue: returnFromDACalculation.coinsValue,
      });
    }
  }

  return (
    <div className=" top-0 left-0 z-10 bg-[#26243752] bg-opacity-65 backdrop-blur-[2px] absolute h-full w-full">
      <div
        className={`absolute w-[886px] h-[810px] top-[30px] left-[calc(50%-443px)] rounded-[20px] p-[48px]   ${
          isDark ? "bg-[#13121A] text-[#ffffff]" : "bg-[#FFFFFF] text-[#424286]"
        } `}
        ref={ref}
      >
        <PortfolioHeading
          text="Investment Calculator"
          setterFunction={setIsCalculatorOpen}
        />
        <PortfolioSelectAndSearchCoin data={data} />
        <PortfolioValueAndDollarButton
          isValueSelected={isValueSelected}
          isDollarSelected={isDollarSelected}
          setIsValueSelected={setIsValueSelected}
          setIsDollarSelected={setIsDollarSelected}
        />
        <PortfolioDateAndQuantity
          endDateAndTime={endDateAndTime}
          startDateAndTime={startDateAndTime}
          setEndDateAndTime={setEndDateAndTime}
          setStartDateAndTime={setStartDateAndTime}
        />
        <PortfolioTable
          quantity={quantity}
          setQuantity={setQuantity}
          isValueSelected={isValueSelected}
        />
        <PortfolioCalculateButton
          isValueSelected={isValueSelected}
          handleCalculation={handleCalculation}
        />
        <PortfolioFooter isValueSelected={isValueSelected} />
      </div>
    </div>
  );
};

export default PortfolioCalculator;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import BarChart from "../../ui/BarChart/BarChart";
import LineChart from "../../ui/LineChart/LineChart";
import ChartButton from "../../ui/ChartButton/ChartButton";
import { useGetChartCoinDataQuery } from "@/lib/features/cryptoApi";
import {
  selectCurrency,
  selectedCoinOne,
  selectedCoinTwo,
} from "@/lib/features/cryptoSlice";

const Chart = () => {
  const [days, setDays] = useState(1);
  const coinOne = useSelector(selectedCoinOne);
  const coinTwo = useSelector(selectedCoinTwo) || "ethereum";
  const getCurrency = useSelector(selectCurrency);
  const currency = getCurrency.name.toLowerCase();

  const {
    data: chartDataOne,
    isLoading,
    isError,
  } = useGetChartCoinDataQuery(
    `${coinOne}/market_chart?vs_currency=${currency}&days=${days}`
  );

  const { data: chartDataTwo } = useGetChartCoinDataQuery(
    `${coinTwo}/market_chart?vs_currency=${currency}&days=${days}`
  );

  return (
    <div className="mt-[20px]  sm:mt-[40px]">
      <div className="flex flex-col gap-[10px] sm:gap-[0px] sm:flex-row items-center sm:justify-between">
        <LineChart
          days={days}
          isError={isError}
          isLoading={isLoading}
          chartDataOne={chartDataOne}
          chartDataTwo={chartDataTwo}
        />
        <BarChart
          days={days}
          isError={isError}
          isLoading={isLoading}
          chartDataOne={chartDataOne}
          chartDataTwo={chartDataTwo}
        />
      </div>
      <ChartButton days={days} setDays={setDays} />
    </div>
  );
};

export default Chart;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetChartCoinDataQuery } from "@/lib/features/cryptoApi";
import {
  selectCurrency,
  selectedCoinOne,
  selectedCoinTwo,
} from "@/lib/features/cryptoSlice";
import LineChart from "../../ui/LineChart/LineChart";
import BarChart from "../../ui/BarChart/BarChart";
import ChartButton from "../../ui/ChartButton/ChartButton";

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
    <div className="mt-[40px]">
      <div className=" flex items-center justify-between">
        <LineChart
          chartDataOne={chartDataOne}
          chartDataTwo={chartDataTwo}
          days={days}
          isLoading={isLoading}
          isError={isError}
        />
        <BarChart
          chartDataOne={chartDataOne}
          chartDataTwo={chartDataTwo}
          days={days}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
      <ChartButton days={days} setDays={setDays} />
    </div>
  );
};

export default Chart;

import React from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";
import CrosshairPlugin from "chartjs-plugin-crosshair";
import {
  selectIsCompare,
  selectIsDark,
  selectedCoinOne,
  selectedCoinOneSymbol,
  selectedCoinTwo,
} from "@/lib/features/cryptoSlice";
import {
  chartData,
  chartOptions,
  firstLetterCapitalize,
  getChartLabels,
  numberWithCommas,
} from "@/app/utils/utils";
import ChartHeader from "../ChartHeader/ChartHeader";
import ChartFooter from "../ChartFooter/ChartFooter";
import ChartLoading from "../ChartLoading/ChartLoading";
import ChartError from "../ChartError/ChartError";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  CrosshairPlugin
);

const LineChart = ({
  chartDataOne,
  chartDataTwo,
  days,
  isLoading,
  isError,
}: {
  chartDataOne: any;
  chartDataTwo: any;
  days: number;
  isLoading: boolean;
  isError: any;
}) => {
  const isDark = useSelector(selectIsDark);
  const isCompare = useSelector(selectIsCompare);
  const coinOne = useSelector(selectedCoinOne);
  const coinTwo = useSelector(selectedCoinTwo);
  const coinOneSymbol = useSelector(selectedCoinOneSymbol);
  const priceDataOne = chartDataOne?.prices.map((item: any) => item[1]);
  const priceDataTwo = isCompare
    ? chartDataTwo?.prices.map((item: any) => item[1]) || []
    : [];
  const coinPriceOne = numberWithCommas(
    priceDataOne?.at(priceDataOne?.length - 1)?.toFixed(2)
  );
  const coinPriceTwo = numberWithCommas(
    priceDataTwo?.at(priceDataTwo?.length - 1)?.toFixed(2)
  );
  const chartLabels = chartDataOne?.prices.map((item: any) =>
    getChartLabels(days, item[0])
  );

  return (
    <div
      className={`w-[632px] h-[404px] rounded-[12px] p-[24px]  flex flex-col justify-between ${
        isDark ? "bg-[#191932]" : "bg-[#ffff]"
      }`}
    >
      {isLoading && <ChartLoading chartLoadingClass="chart-loading-line" />}
      {isError && <ChartError />}
      {!isLoading && !isError && (
        <>
          <ChartHeader
            name={`${firstLetterCapitalize(
              coinOne
            )} (${coinOneSymbol.toUpperCase()})`}
            amounts={coinPriceOne}
            isVolume={false}
          />
          <div className="h-[193px] w-[584px]">
            <Line
              options={chartOptions}
              data={chartData(
                chartLabels,
                coinOne,
                coinTwo,
                priceDataOne,
                priceDataTwo
              )}
            />
          </div>
          {isCompare && (
            <ChartFooter
              coinOne={firstLetterCapitalize(coinOne)}
              coinTwo={firstLetterCapitalize(coinTwo)}
              amountsOne={coinPriceOne}
              amountsTwo={coinPriceTwo}
            />
          )}
        </>
      )}
    </div>
  );
};

export default LineChart;

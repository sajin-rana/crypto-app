import React from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import ChartError from "../ChartError/ChartError";
import ChartHeader from "../ChartHeader/ChartHeader";
import ChartFooter from "../ChartFooter/ChartFooter";
import CrosshairPlugin from "chartjs-plugin-crosshair";
import ChartLoading from "../ChartLoading/ChartLoading";
import { useWindowWidth } from "@/app/customHook/CustomHook";
import {
  selectIsDark,
  selectedCoinOne,
  selectedCoinTwo,
  selectIsCompare,
  selectedCoinOneSymbol,
} from "@/lib/features/cryptoSlice";
import {
  chartData,
  chartOptions,
  getChartLabels,
  numberWithCommas,
  firstLetterCapitalize,
} from "@/app/utils/utils";
import {
  Title,
  Filler,
  Legend,
  Tooltip,
  BarElement,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale,
  Chart as ChartJS,
} from "chart.js/auto";

ChartJS.register(
  Title,
  Filler,
  Legend,
  Tooltip,
  BarElement,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  CrosshairPlugin
);

const LineChart = ({
  days,
  isError,
  isLoading,
  chartDataOne,
  chartDataTwo,
}: {
  days: number;
  isError: any;
  chartDataOne: any;
  chartDataTwo: any;
  isLoading: boolean;
}) => {
  const width = useWindowWidth();
  const isMobile = width < 1107;
  const options: any = chartOptions(isMobile);
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
      className={`w-[100%] h-[199px] sm:w-[632px] sm:h-[404px] rounded-[12px] p-[16px] sm:p-[24px]  flex flex-col justify-between ${
        isDark ? "bg-[#191932]" : "bg-[#ffff]"
      }`}
    >
      {isLoading && <ChartLoading chartLoadingClass="chart-loading-line" />}
      {isError && <ChartError />}
      {!isLoading && !isError && (
        <>
          <ChartHeader
            isVolume={false}
            amounts={coinPriceOne}
            name={`${firstLetterCapitalize(
              coinOne
            )} (${coinOneSymbol.toUpperCase()})`}
          />
          <div className="w-full h-[80px] sm:h-[193px] sm:w-[584px]">
            <Line
              options={options}
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
              amountsOne={coinPriceOne}
              amountsTwo={coinPriceTwo}
              coinOne={firstLetterCapitalize(coinOne)}
              coinTwo={firstLetterCapitalize(coinTwo)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default LineChart;

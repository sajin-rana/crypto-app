import React, { useState } from "react";
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
import ConvertorChartHeading from "../../ui/ConvertorChartHeading/ConvertorChartHeading";
import { useGetChartCoinDataQuery } from "@/lib/features/cryptoApi";
import ChartButton from "../../ui/ChartButton/ChartButton";
import ChartLoading from "../../ui/ChartLoading/ChartLoading";
import ChartError from "../../ui/ChartError/ChartError";
import {
  selectCurrency,
  selectIsDark,
  selectedCoinOne,
  selectedCoinTwo,
} from "@/lib/features/cryptoSlice";
import {
  chartData,
  chartOptions,
  firstLetterCapitalize,
  getChartLabels,
} from "@/app/utils/utils";
import { useWindowWidth } from "@/app/customHook/CustomHook";

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

const ConvertorChart = () => {
  const width = useWindowWidth();
  const isMobile = width < 1107;
  const options: any = chartOptions(isMobile);
  const [days, setDays] = useState(1);
  const coinOne = useSelector(selectedCoinOne);
  const coinTwo = useSelector(selectedCoinTwo) || "ethereum";
  const getCurrency = useSelector(selectCurrency);
  const currency = getCurrency.name.toLowerCase();
  const isDark = useSelector(selectIsDark);
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
  const chartLabels = chartDataOne?.prices.map((item: any) =>
    getChartLabels(days, item[0])
  );
  const priceDataOne = chartDataOne?.prices.map((item: any) => item[1]);
  const priceDataTwo = chartDataTwo?.prices.map((item: any) => item[1]) || [];
  const priceOneToPriceTwo = priceDataOne?.map(
    (price: number, index: number) => price / priceDataTwo?.[index]
  );
  const label = `${firstLetterCapitalize(coinOne)} to ${firstLetterCapitalize(
    coinTwo
  )}`;
  const data = chartData(chartLabels, label, coinTwo, priceOneToPriceTwo, []);

  return (
    <div className="mb-[40px]">
      <div
        className={`w-full h-[293px] rounded-[12px] p-[24px] mt-[40px] ${
          isDark ? "bg-[#191932]" : "bg-[#ffffff]"
        }`}
      >
        {isLoading && <ChartLoading chartLoadingClass="chart-loading-line" />}
        {isError && <ChartError />}
        {!isLoading && !isError && (
          <div className="flex flex-col h-full  justify-between">
            <ConvertorChartHeading />
            <div className="">
              <Line options={options} data={data} />
            </div>
          </div>
        )}
      </div>
      <ChartButton days={days} setDays={setDays} />
    </div>
  );
};

export default ConvertorChart;

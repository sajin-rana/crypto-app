import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import CrosshairPlugin from "chartjs-plugin-crosshair";
import ChartError from "../../ui/ChartError/ChartError";
import ChartButton from "../../ui/ChartButton/ChartButton";
import ChartLoading from "../../ui/ChartLoading/ChartLoading";
import { useWindowWidth } from "@/app/customHook/CustomHook";
import { useGetChartCoinDataQuery } from "@/lib/features/cryptoApi";
import ConvertorChartHeading from "../../ui/ConvertorChartHeading/ConvertorChartHeading";
import {
  selectIsDark,
  selectCurrency,
  selectedCoinOne,
  selectedCoinTwo,
} from "@/lib/features/cryptoSlice";
import {
  chartData,
  chartOptions,
  getChartLabels,
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
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale,
  CrosshairPlugin
);

const ConvertorChart = () => {
  const [days, setDays] = useState(1);
  const width = useWindowWidth();
  const isMobile = width < 1107;
  const options: any = chartOptions(isMobile);
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
    <div className="mb-[20px] sm:mb-[40px]">
      <div
        className={`w-full h-[223px] sm:h-[293px] rounded-[12px] p-[16px] sm:p-[24px] mt-[20px] sm:mt-[40px] ${
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

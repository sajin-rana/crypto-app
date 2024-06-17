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

const options: any = {
  responsive: true,
  maintainAspectRatio: false,
  radius: 5,
  hitRadius: 30,
  hoverRadius: 12,
  scales: {
    y: {
      display: false,
      grid: {
        display: false,
        drawBorder: false,
      },
    },
    x: {
      display: true,
      ticks: {
        maxTicksLimit: 8,
        align: "inner",
      },
      beforeFit(axis: any) {
        const labels = axis.chart.config._config.data.labels;
        const length = labels.length - 1;
        axis.ticks.push({
          value: length,
          label: labels[length],
        });
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

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

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: coinOne,
        data: priceDataOne,
        borderColor: "#7878FF",
        backgroundColor: (context: any) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "#7878FA");
          gradient.addColorStop(0.5, "rgba(120, 120, 250, 0)");
          return gradient;
        },
        pointRadius: 0,
        fill: true,
      },
      {
        label: coinTwo,
        data: priceDataTwo,
        borderColor: "#E771FF",
        backgroundColor: (context: any) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "#D878FA");
          gradient.addColorStop(0.55, "rgba(216, 120, 250, 0)");
          return gradient;
        },
        pointRadius: 0,
        fill: true,
      },
    ],
  };

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
            <Line options={options} data={data} />
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

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
import { Bar } from "react-chartjs-2";
import CrosshairPlugin from "chartjs-plugin-crosshair";
import {
  selectIsCompare,
  selectIsDark,
  selectedCoinOne,
  selectedCoinTwo,
} from "@/lib/features/cryptoSlice";
import {
  firstLetterCapitalize,
  formatNumber,
  getChartLabels,
} from "../../../utils/utils";
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
      stacked: true,
      ticks: {
        display: false,
      },
    },
    x: {
      display: true,
      stacked: true,
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

const BarChart = ({
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
  const coinOneVolumes = chartDataOne?.total_volumes.map(
    (item: any) => item[1]
  );
  const coinTwoVolumes = isCompare
    ? chartDataTwo?.total_volumes.map((item: any) => item[1]) || []
    : [];
  const coinVolumesAmountsOne =
    String(
      formatNumber(coinOneVolumes?.at(coinOneVolumes?.length - 1)?.toFixed(2))
    ).toLowerCase() + "ln";
  const coinVolumesAmountsTwo =
    String(
      formatNumber(coinTwoVolumes?.at(coinTwoVolumes?.length - 1)?.toFixed(2))
    ).toLowerCase() + "ln";
  const chartLabels = chartDataOne?.total_volumes.map((item: any) =>
    getChartLabels(days, item[0])
  );

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: coinOne,
        data: coinOneVolumes,
        borderColor: "#7878FA",
        borderWidth: 0,
        borderRadius: 3,
        categoryPercentage: 0.75,
        backgroundColor: (context: any) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "#7878FA");
          gradient.addColorStop(0.65, "rgba(120, 120, 250, 0)");
          return gradient;
        },
        pointRadius: 0,
        fill: true,
      },
      {
        label: coinTwo,
        data: coinTwoVolumes,
        borderColor: "#D878FA",
        borderWidth: 0,
        borderRadius: 3,
        categoryPercentage: 0.75,
        backgroundColor: (context: any) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "#D878FA");
          gradient.addColorStop(0.65, "rgba(216, 120, 250, 0)");
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
        isDark ? "bg-[#1E1932]" : "bg-[#ffff]"
      }`}
    >
      {isLoading && <ChartLoading chartLoadingClass="chart-loading-bar" />}
      {isError && <ChartError />}
      {!isLoading && !isError && (
        <>
          <ChartHeader
            name="Volume 24h"
            amounts={coinVolumesAmountsOne}
            isVolume={true}
          />
          <div className="h-[193px] w-[584px]">
            <Bar options={options} data={data} />
          </div>
          {isCompare && (
            <ChartFooter
              coinOne={firstLetterCapitalize(coinOne)}
              coinTwo={firstLetterCapitalize(coinTwo)}
              amountsOne={coinVolumesAmountsOne}
              amountsTwo={coinVolumesAmountsTwo}
            />
          )}
        </>
      )}
    </div>
  );
};

export default BarChart;

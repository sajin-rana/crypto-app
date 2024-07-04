import React from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import ChartError from "../ChartError/ChartError";
import ChartHeader from "../ChartHeader/ChartHeader";
import ChartFooter from "../ChartFooter/ChartFooter";
import CrosshairPlugin from "chartjs-plugin-crosshair";
import ChartLoading from "../ChartLoading/ChartLoading";
import { useWindowWidth } from "@/app/customHook/CustomHook";
import {
  selectIsDark,
  selectIsCompare,
  selectedCoinOne,
  selectedCoinTwo,
} from "@/lib/features/cryptoSlice";
import {
  chartData,
  chartOptions,
  formatNumber,
  getChartLabels,
  firstLetterCapitalize,
} from "../../../utils/utils";
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
  PointElement,
  LinearScale,
  CategoryScale,
  CrosshairPlugin
);

const BarChart = ({
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
  const isDark = useSelector(selectIsDark);
  const options: any = chartOptions(isMobile);
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

  return (
    <div
      className={`w-[100%] h-[199px] sm:w-[632px] sm:h-[404px] rounded-[12px] p-[16px] sm:p-[24px]  flex flex-col justify-between ${
        isDark ? "bg-[#1E1932]" : "bg-[#ffff]"
      }`}
    >
      {isLoading && <ChartLoading chartLoadingClass="chart-loading-bar" />}
      {isError && <ChartError />}
      {!isLoading && !isError && (
        <>
          <ChartHeader
            isVolume={true}
            name="Volume 24h"
            amounts={coinVolumesAmountsOne}
          />
          <div className="w-full h-[80px] sm:h-[193px] sm:w-[584px]">
            <Bar
              options={options}
              data={chartData(
                chartLabels,
                coinOne,
                coinTwo,
                coinOneVolumes,
                coinTwoVolumes
              )}
            />
          </div>
          {isCompare && (
            <ChartFooter
              amountsOne={coinVolumesAmountsOne}
              amountsTwo={coinVolumesAmountsTwo}
              coinOne={firstLetterCapitalize(coinOne)}
              coinTwo={firstLetterCapitalize(coinTwo)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default BarChart;

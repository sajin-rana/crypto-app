import React from "react";
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
import { colors, formatMonthAndTime } from "@/app/utils/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options: any = {
  responsive: true,
  maintainAspectRatio: false,
  radius: 3,
  hitRadius: 20,
  hoverRadius: 6,

  scales: {
    y: {
      display: false,

      ticks: {
        display: false,
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
    x: {
      display: false,
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
    tooltip: {
      titleColor: "#ffffff",
      titleFont: {
        family: "Arial",
        size: 10,
      },

      borderWidth: 0.3,
      padding: {
        top: 2,
        left: 5,
        right: 5,
      },
      cornerRadius: 5,
    },
    legend: {
      display: false,
    },
  },
};

const TableChart = ({
  index,
  chartData,
}: {
  index: number;
  chartData: any;
}) => {
  const totalMillisecondInWeek = Array.from(
    { length: 168 },
    (_, i) => (i + 1) * 60 * 60 * 1000
  );

  const data = {
    labels: totalMillisecondInWeek.map((time) => formatMonthAndTime(time)),
    datasets: [
      {
        fill: true,
        tension: 0.75,
        label: "$",
        data: chartData,
        borderColor: colors[index % 17],
        borderWidth: 1.5,
        pointRadius: 0,
        backgroundColor: (context: any) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 380);
          gradient.addColorStop(0, colors[index % 17]);
          gradient.addColorStop(0.15, "rgba(120, 120, 250, 0)");
          return gradient;
        },
      },
    ],
  };
  return (
    <div>
      <Line options={options} data={data} width={120} height={36} />
    </div>
  );
};

export default TableChart;

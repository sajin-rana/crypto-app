"use client";

export function formatNumber(marketCap: number) {
  const trillion = 1e12;
  const billion = 1e9;
  const million = 1e6;

  if (marketCap >= trillion) {
    return (marketCap / trillion).toFixed(2) + " T";
  } else if (marketCap >= billion) {
    return (marketCap / billion).toFixed(2) + " B";
  } else if (marketCap >= million) {
    return (marketCap / million).toFixed(2) + " M";
  } else {
    return marketCap;
  }
}

export function getPercentage(value: number, totalValue: number) {
  return Math.floor((value / totalValue) * 100);
}

export function setLocalStorage(key: string, value: any) {
  return window.localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key: string) {
  if (typeof window !== "undefined") {
    return JSON.parse(window.localStorage.getItem(key)!);
  }
}

export function numberWithCommas(x: any) {
  x = x?.toString();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

export function greaterThanZero(number: number) {
  return number > 0 ? true : false;
}

export function firstLetterCapitalize(string: string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase();
}

export const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getChartLabels(days: number, milliseconds: number) {
  if (days === 1) {
    let minutes: string | number = (milliseconds / (1000 * 60)) % 60;
    let hours: string | number = (milliseconds / (1000 * 60 * 60)) % 24;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return (
      Math.floor(+hours) + ":" + String(Math.floor(+minutes)).padStart(2, "0")
    );
  } else {
    const d = new Date(milliseconds);
    const currentMonth = month[d.getMonth()];
    const currentDate = d.getDate();
    return `${currentMonth.slice(0, 3)} ${currentDate}`;
  }
}

export const chartOptions: any = {
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
      grid: {
        display: false,
        drawBorder: false,
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

export function chartData(
  chartLabels: any[],
  labelOne: string,
  labelTwo: string,
  dataOne: any[],
  dataTwo: any[]
) {
  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: labelOne,
        data: dataOne,
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
        label: labelTwo,
        data: dataTwo,
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
  return data;
}

export const currencyLists = [
  {
    id: 1,
    name: "USD",
    sign: "$",
  },
  {
    id: 2,
    name: "GBP",
    sign: "£",
  },
  {
    id: 3,
    name: "EUR",
    sign: "€",
  },
  {
    id: 4,
    name: "BTC",
    sign: "₿",
  },
  {
    id: 5,
    name: "ETH",
    sign: "Ξ",
  },
  {
    id: 6,
    name: "CAD",
    sign: "C$",
  },
  {
    id: 7,
    name: "CHF",
    sign: "₣",
  },
  {
    id: 8,
    name: "AUD",
    sign: "A$",
  },
  {
    id: 9,
    name: "INR",
    sign: "₹",
  },
  {
    id: 10,
    name: "JPY",
    sign: "¥",
  },
  {
    id: 11,
    name: "PLN",
    sign: "zł",
  },
  {
    id: 12,
    name: "LTC",
    sign: "Ł",
  },
];

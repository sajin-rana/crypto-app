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
    return numberWithCommas(Number(marketCap)?.toFixed(2));
  }
}

export function getPercentage(value: number, totalValue: number) {
  return Math.floor((value / totalValue) * 100);
}

export function getNumberUsingPercentage(percentage: number, total: number) {
  return Math.abs(+((total / 100) * percentage).toFixed(2));
}

export function setLocalStorage(key: string, value: any) {
  return window.localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key: string) {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    const initial = saved !== null ? JSON.parse(saved) : "";
    return initial;
  }
}

export function numberWithCommas(x: any) {
  x = Number(x) % 1 === 0 ? x : Number(x).toFixed(2);
  x = x?.toString();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

export function greaterThanZero(number: number) {
  return number > 0 ? true : false;
}

export function firstLetterCapitalize(string: string) {
  return string?.slice(0, 1).toUpperCase() + string?.slice(1).toLowerCase();
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

export const colors = [
  "#C27721",
  "#6374C3",
  "#30E0A1",
  "#F5AC37",
  "#F3EB2F",
  "#638FFE",
  "#4DEEE5",
  "#F06142",
  "#5082CF",
  "#00B1A7",
  "#FE2264",
  "#FFA500",
  "#6374C3",
  "#FFA500",
  "#FFD700",
  "#FF6347",
  "#FF0000",
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

export function formatMonthAndTime(milliseconds: number) {
  const d = new Date();
  const time = new Date(d.getTime() - milliseconds);
  const currentMonth = month[time.getMonth()];
  const currentDate = time.getDate();
  const hour = String(time.getHours()).padStart(2, "0");
  return `${currentMonth.slice(0, 3)} ${currentDate},${hour}:00 `;
}

export function coinConverter(
  inputNumber: number,
  priceOne: number,
  priceTwo: number
) {
  const price = (inputNumber * priceOne) / priceTwo;
  return price % 1 === 0 ? +price : +price?.toFixed(3);
}

export function dropDownColor(isDark: boolean) {
  const isDarkColor = isDark ? "bg-[#191925]" : "bg-[#EBEBFC]";
  const textColor = isDark ? "text-[#D1D1D3]" : "text-[#6464A2]";
  const hoverColor = isDark ? "hover:bg-[rgb(5,5,15)]" : "hover:bg-[white]";
  return { isDarkColor, textColor, hoverColor };
}

export function handleKeyDown(e: any, stateSetter: any) {
  if (e.key === "Escape") {
    e.currentTarget.blur();
    if (stateSetter) {
      stateSetter(false);
    }
  }
}

export function formatPortfolioDateAndTime(date: any) {
  date.setDate(date.getDate() - 5);
  const currentDate = date?.toISOString().substring(0, 10);
  const hours = String(date?.getHours()).padStart(2, "0");
  const minutes = String(date?.getMinutes()).padStart(2, "0");
  return `${currentDate} ${hours}:${minutes}`;
}

export function chartOptions(isMobile: boolean) {
  const data = {
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
          maxTicksLimit: isMobile ? 6 : 7,
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
  return data;
}

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
        borderWidth: 3,
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
        borderWidth: 3,
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

export function disableFutureDate() {
  return new Date().toISOString().slice(0, -8);
}

export function convertToUnixTimestamp(dateStr: string) {
  const date = new Date(dateStr);
  const unixTimestamp = Math.floor(date.getTime() / 1000).toString();
  return unixTimestamp;
}

export function getPriceAndDateForEachInvterval(
  historyData: any,
  quantity: any,
  startDateAndTime: string,
  endDateAndTime: string
) {
  const intervalQuantity = CalculateIntervals(
    String(quantity.contributionInterval),
    startDateAndTime,
    endDateAndTime
  );
  const timePeriod: number = CalculateInvestmentTimePeriod(
    startDateAndTime,
    endDateAndTime
  );
  const arrayOfPriceAndDateforEachInterval = [];
  for (let i = 0; i <= intervalQuantity; i++) {
    if (timePeriod / (24 * 60 * 60 * 1000) > 90) {
      const data =
        historyData?.prices[
          parseInt(String(quantity.contributionInterval)) * i
        ];
      arrayOfPriceAndDateforEachInterval.push(data);
    } else {
      const data =
        historyData?.prices[
          parseInt(String(quantity.contributionInterval)) * i * 24
        ];
      arrayOfPriceAndDateforEachInterval.push(data);
    }
  }
  return arrayOfPriceAndDateforEachInterval;
}

export function CalculateIntervals(
  interval: string,
  startDateAndTime: string,
  endDateAndTime: string
) {
  const timePeriod: number = CalculateInvestmentTimePeriod(
    startDateAndTime,
    endDateAndTime
  );
  const intervalToMs: number = parseInt(interval) * 24 * 60 * 60 * 1000;
  const intervalQuantity: number = Math.floor(timePeriod / intervalToMs);
  return intervalQuantity;
}

export function CalculateInvestmentTimePeriod(
  startDateStr: string,
  endDateStr: string
) {
  const startDate: Date = new Date(startDateStr);
  const endDate: Date = new Date(endDateStr);
  const timePeriod: number = endDate.getTime() - startDate.getTime();
  return timePeriod;
}

export function calculateVCA(
  initialInvestment: number,
  growthRate: number,
  actualPrices: any
) {
  let netInvestment = initialInvestment;
  let targetValue, investmentNeeded, actualValue;
  let adjustedInitialInvestment = initialInvestment;
  for (let i = 1; i < actualPrices.length; i++) {
    targetValue = initialInvestment * Math.pow(1 + growthRate / 100, i);
    const actualGrowthRate =
      (actualPrices[i] - actualPrices[i - 1]) / actualPrices[i - 1];
    actualValue = adjustedInitialInvestment * (1 + actualGrowthRate);
    investmentNeeded = targetValue - actualValue;
    netInvestment += investmentNeeded;
    adjustedInitialInvestment = targetValue;
  }
  return {
    netInvestment: netInvestment,
    coinsValue: adjustedInitialInvestment,
  };
}

export function calculateDCA(
  initialInvestment: number,
  investmentAdded: number,
  actualPrices: any
) {
  let netInvestment = initialInvestment;
  let actualValue;
  for (let i = 1; i < actualPrices.length; i++) {
    const growthRate =
      (actualPrices[i] - actualPrices[i - 1]) / actualPrices[i - 1];
    actualValue = netInvestment * (growthRate + 1);
    netInvestment = actualValue + investmentAdded;
  }
  const totalNetInvestment =
    initialInvestment + investmentAdded * (actualPrices.length - 1);
  return { netInvestment: totalNetInvestment, coinsValue: netInvestment };
}

export function handleCalendarClick(dateRef: any) {
  if (dateRef.current) {
    (dateRef.current as any).showPicker();
    (dateRef.current as any).focus();
  }
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

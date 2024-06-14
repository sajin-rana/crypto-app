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
    return JSON.parse(window?.localStorage?.getItem(key) || "");
  }
}

export function numberWithCommas(x: any) {
  x = x.toString();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

export function greaterThanZero(number: number) {
  return number > 0 ? true : false;
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

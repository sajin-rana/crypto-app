import React from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";

const tableHead = [
  { name: "id", headerText: "#", style: "w-[16px]" },
  { name: "market_cap", headerText: "Name", style: "w-[208px]" },
  { name: "current_price", headerText: "Price", style: "w-[80px]" },
  {
    name: "price_change_percentage_1h_in_currency",
    headerText: "1h%",
    style: "w-[72px]",
  },
  {
    name: "price_change_percentage_24h_in_currency",
    headerText: "24%",
    style: "w-[72px]",
  },
  {
    name: "price_change_percentage_7d_in_currency",
    headerText: "7d%",
    style: "w-[72px]",
  },
  {
    name: "total_volume",
    headerText: "24hVolume / Market Cap",
    style: "w-[228px]",
  },
  {
    name: "circulating_supply",
    headerText: "Circulating / Total Supply",
    style: "w-[228px]",
  },
  {
    name: "price_change_percentage_7d_in_currency",
    headerText: "Last 7d",
    style: "w-[120px]",
  },
];

function headingStyle(order: string, isDark: string, name: string) {
  if (isDark) {
    if (order === name) {
      return "text-[#ffffff]";
    } else {
      return "text-[#D1D1D1]";
    }
  } else {
    if (order === name) {
      return "text-[black]";
    } else {
      return "text-[#424286]";
    }
  }
}

const TableHeading = ({
  handleHeadingClick,
  order,
}: {
  handleHeadingClick: any;
  order: string;
}) => {
  const isDark = useSelector(selectIsDark);
  return (
    <div
      className={`flex items-center justify-between mb-[20px] px-[16px] py-[20px] z-10 top-[0px] sticky ${
        isDark ? "bg-[#13121B]" : "bg-[#F2F5F9]"
      }`}
    >
      {tableHead.map((item) => (
        <div
          key={crypto.randomUUID()}
          onClick={() => handleHeadingClick(item.name)}
          className={`cursor-pointer text-[14px] font-[400] flex items-center  ${headingStyle(
            order,
            isDark,
            item.name
          )} ${item.style}`}
        >
          {item.headerText}
        </div>
      ))}
    </div>
  );
};

export default TableHeading;

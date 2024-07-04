import React from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";

const tableHead = [
  { name: "id", headerText: "#", style: "hidden sm:block w-[16px]" },
  { name: "market_cap", headerText: "Name", style: "w-[108px] sm:w-[208px]" },
  { name: "current_price", headerText: "Price", style: "w-[64px] sm:w-[80px]" },
  {
    name: "price_change_percentage_1h_in_currency",
    headerText: "1h%",
    style:
      "w-[64px] sm:w-[72px] text-right sm:text-left sm:block flex justify-center",
  },
  {
    name: "price_change_percentage_24h_in_currency",
    headerText: "24%",
    style:
      "w-[64px] sm:w-[72px] text-right sm:text-left sm:block flex justify-end",
  },
  {
    name: "price_change_percentage_7d_in_currency",
    headerText: "7d%",
    style: "w-[72px] hidden sm:block",
  },
  {
    name: "total_volume",
    headerText: "24hVolume / Market Cap",
    style: "w-[228px] hidden sm:block",
  },
  {
    name: "circulating_supply",
    headerText: "Circulating / Total Supply",
    style: "w-[228px] hidden sm:block",
  },
  {
    name: "price_change_percentage_7d_in_currency",
    headerText: "Last 7d",
    style: "w-[120px] hidden sm:block",
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
  order,
  handleHeadingClick,
}: {
  order: string;
  handleHeadingClick: any;
}) => {
  const isDark = useSelector(selectIsDark);
  return (
    <div
      className={`flex items-center justify-between mb-[0px] sm:mb-[20px] p-[12px] sm:px-[16px] sm:py-[20px] z-10 top-[0px] sticky  ${
        isDark ? "bg-[#13121B]" : "bg-[#F2F5F9]"
      }`}
    >
      {tableHead.map((item) => (
        <div
          key={item.headerText}
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

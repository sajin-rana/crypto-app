import React from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useDispatch } from "react-redux";
import { dropDownColor } from "@/app/utils/utils";
import { setCoinOne } from "@/lib/features/cryptoSlice";
import DropDownLoading from "../DropDownLoading/DropDownLoading";
import { useGetSearchQueryDataQuery } from "@/lib/features/cryptoApi";
const inter = Inter({ weight: "400", subsets: ["latin"] });

const PortfolioDropDown = ({
  isDark,
  searchCoinInput,
  setSearchCoinInput,
}: {
  isDark: boolean;
  searchCoinInput: string;
  setSearchCoinInput: any;
}) => {
  const { data, isLoading } = useGetSearchQueryDataQuery(searchCoinInput);
  const { hoverColor, isDarkColor, textColor } = dropDownColor(isDark);
  const dispatch = useDispatch();

  function handleClick(id: string) {
    dispatch(setCoinOne(id));
    setSearchCoinInput("");
  }

  return (
    <ul
      className={`absolute   rounded-bl-[6px] rounded-br-[6px] border border-[#FFFFFF0D] w-full max-h-[370px] top-[43px] overflow-auto z-10 border-t-1 ${
        isDark ? "border-t-[#FFFFFF0D] " : "border-t-[#B0B0EB] "
      } ${isDarkColor}`}
    >
      <li className="flex justify-center items-center mt-[10px]">
        {isLoading && <DropDownLoading />}
      </li>
      {data?.coins.map((item: any) => (
        <li
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={`cursor-pointer ${inter.className} text-[14px]   py-[8px] px-[16px] flex gap-[20px] ${hoverColor} ${textColor}`}
        >
          <Image src={item.large} alt={item.name} height={24} width={24} />
          <p>{item.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default PortfolioDropDown;

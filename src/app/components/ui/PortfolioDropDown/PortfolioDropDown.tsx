import React, { useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useDispatch } from "react-redux";
import { dropDownColor } from "@/app/utils/utils";
import { setCoinOne } from "@/lib/features/cryptoSlice";
import DropDownLoading from "../DropDownLoading/DropDownLoading";
import { useGetSearchQueryDataQuery } from "@/lib/features/cryptoApi";
import { useDropDownUpDownKeypress } from "@/app/customHook/CustomHook";
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
  const [index, setIndex] = useState<any>(null);
  const { data, isLoading } = useGetSearchQueryDataQuery(searchCoinInput);
  const { hoverColor, isDarkColor, textColor } = dropDownColor(isDark);
  const dispatch = useDispatch();

  function handleClick(id: string) {
    dispatch(setCoinOne(id));
    setSearchCoinInput("");
  }

  useDropDownUpDownKeypress(index, setIndex, data?.coins?.length, function () {
    const coinId = data?.coins?.[index].id;
    handleClick(coinId);
  });

  return (
    <ul
      className={`absolute rounded-bl-[6px] rounded-br-[6px] border border-[#FFFFFF0D] w-full max-h-[370px] top-[43px] overflow-auto z-10 border-t-1 ${
        isDark ? "border-t-[#FFFFFF0D] " : "border-t-[#B0B0EB] "
      } ${isDarkColor}`}
    >
      <li className="flex justify-center items-center mt-[10px]">
        {isLoading && <DropDownLoading />}
      </li>
      {data?.coins.map((item: any, i: number) => (
        <li
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={`cursor-pointer ${inter.className}  ${
            index === i ? hoverColor.slice(6) : ""
          } text-[12px] sm:text-[14px]  py-[6px] px-[12px] sm:py-[8px] sm:px-[16px] flex gap-[10px] sm:gap-[20px] ${hoverColor} ${textColor}`}
        >
          <div className="h-[24px] w-[24px]">
            <Image src={item.large} alt={item.name} height={24} width={24} />
          </div>
          <p className="w-[141px] sm:w-[550px] overflow-hidden">{item.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default PortfolioDropDown;

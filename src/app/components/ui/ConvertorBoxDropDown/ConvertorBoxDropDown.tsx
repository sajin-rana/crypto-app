import React, { useRef, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useSelector } from "react-redux";
import SearchIcon from "../SearchIcon/SearchIcon";
import UpDownArrow from "../UpDownArrow/UpDownArrow";
import { selectIsDark } from "@/lib/features/cryptoSlice";
import { dropDownColor, greaterThanZero } from "@/app/utils/utils";
import {
  useHandleClickOutside,
  useCloseOnEscapePressed,
  useDropDownUpDownKeypress,
} from "@/app/customHook/CustomHook";
const inter = Inter({ weight: "400", subsets: ["latin"] });

const ConvertorBoxDropDown = ({
  coinList,
  handleCoinClick,
  coinDropDownInput,
  setIsCoinDropDownOpen,
  handleCoinDropInputChange,
}: {
  coinList: any;
  handleCoinClick: any;
  coinDropDownInput: any;
  setIsCoinDropDownOpen: any;
  handleCoinDropInputChange: any;
}) => {
  const [index, setIndex] = useState<any>(null);
  const isDark = useSelector(selectIsDark);
  const coinDropdownRef: any = useRef();
  useCloseOnEscapePressed(setIsCoinDropDownOpen);
  useHandleClickOutside(coinDropdownRef, setIsCoinDropDownOpen);
  const { isDarkColor, textColor, hoverColor } = dropDownColor(isDark);

  useDropDownUpDownKeypress(index, setIndex, coinList?.length, function () {
    const id = coinList[index]?.id;
    const symbol = coinList[index]?.symbol;
    handleCoinClick(id, symbol);
  });

  return (
    <div
      ref={coinDropdownRef}
      className="absolute w-[242px] sm:w-[262px] h-[300px]  max-h-[564px] z-10 border-t-1  left-[0px] top-[30px] sm:top-[50px] "
    >
      <div
        className={`flex items-center gap-[8px] sm:gap-[12px] py-[4px] sm:py-[8px] px-[8px] sm:px-[16px] rounded-[6px] border border-[#FFFFFF0D] ${
          isDark ? "bg-[#191925]" : "bg-[#EBEBFD]"
        }`}
      >
        <SearchIcon />
        <input
          type="text"
          value={coinDropDownInput}
          placeholder="Search coin..."
          onChange={handleCoinDropInputChange}
          className={`border-0 focus:outline-none  placeholder:w-400 placeholder:text-[12px]   sm:placeholder:text-[14px]  w-full h-full ${
            isDark
              ? "placeholder-[#D1D1D6] bg-[#191925]"
              : "placeholder-[#424286] bg-[#EBEBFD]"
          }  `}
        />
      </div>
      <ul
        className={`   rounded-bl-[6px] rounded-br-[6px] border border-[#FFFFFF0D]  overflow-auto  w-[242px] sm:w-[262px] h-[250px]  max-h-[564px]  ${
          isDark ? "border-t-[#FFFFFF0D] " : "border-t-[#B0B0EB] "
        } ${isDarkColor} ${textColor}`}
      >
        {coinList?.length === 0 && (
          <li className="text-[20px] flex items-center justify-center">
            No results
          </li>
        )}
        {coinList?.length > 0 &&
          coinList.map((coin: any, i: number) => (
            <li
              key={coin.id}
              onClick={() => handleCoinClick(coin?.id, coin?.symbol)}
              className={`cursor-pointer ${inter.className}  text-[14px] ${
                index === i ? hoverColor.slice(6) : ""
              }  py-[8px] px-[16px] ${hoverColor} flex justify-between`}
            >
              <div className="flex items-center gap-[5px]">
                <Image
                  width={20}
                  height={20}
                  alt={coin.name}
                  src={coin.image}
                />
                <p>{coin?.name}</p>
              </div>
              <div className="flex items-center gap-[5px]">
                <UpDownArrow
                  priceChangePercentage={coin.price_change_percentage_24h}
                />
                <p
                  className={`${
                    greaterThanZero(coin.price_change_percentage_24h)
                      ? "text-[#00B1A7]"
                      : "text-[#FE2264]"
                  }`}
                >
                  {Math.abs(coin.price_change_percentage_24h.toFixed(2))}%
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ConvertorBoxDropDown;

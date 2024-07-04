"use client";
import React from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { dropDownColor } from "@/app/utils/utils";
import DropDownLoading from "../DropDownLoading/DropDownLoading";
import { useGetSearchQueryDataQuery } from "@/lib/features/cryptoApi";
const inter = Inter({ weight: "400", subsets: ["latin"] });

const DropDown = ({
  input,
  isDark,
  setInput,
  setMobileShowInput,
}: {
  input: string;
  setInput: any;
  isDark: boolean;
  setMobileShowInput: any;
}) => {
  const { data, isLoading } = useGetSearchQueryDataQuery(input);
  const { hoverColor, isDarkColor, textColor } = dropDownColor(isDark);

  return (
    <ul
      className={`absolute   rounded-bl-[6px] rounded-br-[6px] border border-[#FFFFFF0D] w-[190px] sm:w-[356px] max-h-[564px] sm:top-[45px] top-[35px] overflow-auto z-10 border-t-1 ${
        isDark ? "border-t-[#FFFFFF0D] " : "border-t-[#B0B0EB] "
      } ${isDarkColor}`}
    >
      <li className="flex justify-center items-center mt-[10px]">
        {isLoading && <DropDownLoading />}
      </li>
      {data?.coins.map((item: any) => (
        <Link
          key={item.id}
          href={`/coin/${item.id}`}
          onClick={() => setInput("")}
        >
          <li
            className={`cursor-pointer ${inter.className} text-[14px]   py-[8px] px-[16px] ${hoverColor} ${textColor}`}
            onClick={() => setMobileShowInput(false)}
          >
            {item.name}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default DropDown;

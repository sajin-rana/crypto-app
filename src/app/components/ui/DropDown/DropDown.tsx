"use client";
import React from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useGetSearchQueryDataQuery } from "@/lib/features/cryptoApi";
import DropDownLoading from "../DropDownLoading/DropDownLoading";

const inter = Inter({ weight: "400", subsets: ["latin"] });

const DropDown = ({
  input,
  setInput,
  isDarkColor,
  textColor,
  hoverColor,
}: {
  input: string;
  setInput: any;
  isDarkColor: string;
  textColor: string;
  hoverColor: string;
}) => {
  const { data, isLoading } = useGetSearchQueryDataQuery(input);

  return (
    <ul
      className="absolute   rounded-bl-[6px] rounded-br-[6px] border border-[#FFFFFF0D] w-[356px] max-h-[564px] top-[45px] overflow-auto z-10"
      style={{ backgroundColor: isDarkColor }}
    >
      <div className="flex justify-center items-center mt-[10px]">
        {isLoading && <DropDownLoading />}
      </div>

      {data?.coins.map((item: any) => (
        <Link
          key={item.id}
          href={`/coin/${item.id}`}
          onClick={() => setInput("")}
        >
          <li
            className={`cursor-pointer ${inter.className} text-[14px]   py-[8px] px-[16px] ${hoverColor}`}
            style={{ color: textColor }}
          >
            {item.name}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default DropDown;

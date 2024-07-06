import { useState } from "react";
import { Inter } from "next/font/google";
import { currencyLists, dropDownColor } from "@/app/utils/utils";
import { useDropDownUpDownKeypress } from "@/app/customHook/CustomHook";
const inter = Inter({ weight: "400", subsets: ["latin"] });

function CurrencyDropLists({
  isDark,
  currency,
  handleClick,
}: {
  currency: any;
  isDark: boolean;
  handleClick: any;
}) {
  const [index, setIndex] = useState<any>(null);
  const selectedColor = isDark ? "bg-[rgb(5,5,15)]" : "bg-[white]";
  const { hoverColor, isDarkColor, textColor } = dropDownColor(isDark);
  useDropDownUpDownKeypress(index, setIndex, currencyLists.length, function () {
    handleClick(currencyLists[index]);
  });
  return (
    <ul
      className={`absolute  rounded-bl-[6px] rounded-br-[6px] border border-[#FFFFFF0D] w-[100%] sm:top-[45px] top-[35px] border-t-1  z-10 ${
        isDark ? "border-t-[#FFFFFF0D] " : "border-t-[#B0B0EB] "
      } ${isDarkColor} ${textColor}`}
    >
      {currencyLists.map((item: any, i: number) => (
        <li
          key={item.id}
          onClick={() => handleClick(item)}
          className={`flex items-center  justify-around ${
            index === i ? hoverColor.slice(6) : ""
          } ${hoverColor} cursor-pointer ${
            inter.className
          } py-[4px] px-[8px] sm:py-[8px] sm:px-[16px] text-[14px] sm:text-[16px] ${
            currency.id === item.id ? selectedColor : ""
          }`}
        >
          <p>{item.sign}</p>
          <p>{item.name}</p>
        </li>
      ))}
    </ul>
  );
}

export default CurrencyDropLists;

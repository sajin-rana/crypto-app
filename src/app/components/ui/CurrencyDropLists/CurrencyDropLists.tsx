import { Inter } from "next/font/google";
import { currencyLists } from "@/app/utils/utils";

const inter = Inter({ weight: "400", subsets: ["latin"] });

function CurrencyDropLists({
  isDark,
  handleClick,
  currency,
  hoverColor,
  isDarkColor,
  textColor,
}: {
  isDark: boolean;
  handleClick: any;
  currency: any;
  hoverColor: string;
  isDarkColor: string;
  textColor: string;
}) {
  const selectedColor = isDark ? "bg-[rgb(5,5,15)]" : "bg-[white]";
  return (
    <ul
      className={`absolute  rounded-bl-[6px] rounded-br-[6px] border border-[#FFFFFF0D] w-[100%] top-[45px] border-t-1 border-t-[#B0B0EB] ${isDarkColor} ${textColor}`}
    >
      {currencyLists.map((item) => (
        <li
          key={item.id}
          className={`flex items-center justify-around ${hoverColor} cursor-pointer ${
            inter.className
          } py-[8px] px-[16px] ${currency.id === item.id ? selectedColor : ""}`}
          onClick={() => handleClick(item)}
        >
          <p>{item.sign}</p>
          <p>{item.name}</p>
        </li>
      ))}
    </ul>
  );
}

export default CurrencyDropLists;

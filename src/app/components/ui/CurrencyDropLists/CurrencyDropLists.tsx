import { Inter } from "next/font/google";
import { currencyLists, dropDownColor } from "@/app/utils/utils";

const inter = Inter({ weight: "400", subsets: ["latin"] });

function CurrencyDropLists({
  isDark,
  handleClick,
  currency,
}: {
  isDark: boolean;
  handleClick: any;
  currency: any;
}) {
  const selectedColor = isDark ? "bg-[rgb(5,5,15)]" : "bg-[white]";
  const { hoverColor, isDarkColor, textColor } = dropDownColor(isDark);
  return (
    <ul
      className={`absolute  rounded-bl-[6px] rounded-br-[6px] border border-[#FFFFFF0D] w-[100%] top-[45px] border-t-1  z-10 ${
        isDark ? "border-t-[#FFFFFF0D] " : "border-t-[#B0B0EB] "
      } ${isDarkColor} ${textColor}`}
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

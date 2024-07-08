import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useKey } from "@/app/customHook/CustomHook";
import { selectIsDark } from "@/lib/features/cryptoSlice";
import PortfolioLine from "../PortfolioLine/PortfolioLine";
import PortfolioTableItem from "../PortfolioTableItem/PortfolioTableItem";

const PortfolioTable = ({
  quantity,
  setQuantity,
  isValueSelected,
}: {
  quantity: any;
  setQuantity: any;
  isValueSelected: boolean;
}) => {
  const [index, setIndex] = useState<any>(false);
  const isDark = useSelector(selectIsDark);

  useKey("Tab", function () {
    if (index === false) {
      setIndex(1);
    } else if (index === 3) {
      setIndex(1);
    } else {
      setIndex((index: any) => index + 1);
    }
  });

  return (
    <div
      className={`w-full h-[308px] rounded-[12px] py-[20px] sm:py-[40px] px-[16px] sm:px-[32px] mt-[10px] sm:mt-[16px] flex flex-col gap-[4px] ${
        isDark ? "bg-[#1E1932]" : "bg-[#F3F5F9]"
      }`}
    >
      <PortfolioTableItem
        index={index}
        itemIndex={1}
        setIndex={setIndex}
        allQuantity={quantity}
        setQuantity={setQuantity}
        name="contributionInterval"
        itemName="Contribution interval, days"
        quantity={quantity.contributionInterval}
        content="The number of days between each investment."
      />
      <PortfolioLine />
      <PortfolioTableItem
        index={index}
        itemIndex={2}
        setIndex={setIndex}
        allQuantity={quantity}
        name="initialInvestment"
        setQuantity={setQuantity}
        itemName="Initial investment, $"
        quantity={quantity.initialInvestment}
        content="The amount of money you invest at the beginning of the period."
      />
      <PortfolioLine />
      <PortfolioTableItem
        index={index}
        itemIndex={3}
        setIndex={setIndex}
        allQuantity={quantity}
        setQuantity={setQuantity}
        name={isValueSelected ? "growRate" : "investmentAdded"}
        quantity={
          isValueSelected ? quantity.growRate : quantity.investmentAdded
        }
        itemName={
          isValueSelected
            ? "Grow rate per interval, %"
            : "Investment added each interval, $"
        }
        content="The rate at which your investment grows, during one interval. If market growth more than this rate, you will add less money to your investment."
      />
      <PortfolioLine />
      <PortfolioTableItem
        isEdited={false}
        name="totalAmount"
        allQuantity={quantity}
        setQuantity={setQuantity}
        quantity={Math.floor(quantity?.totalAmount)}
        itemName="Total amount spent on investments"
        content="The total amount of money you've spent on investments. Negative value means that you returned your investment completely, and have received returns above it."
      />
      <PortfolioLine />
      <PortfolioTableItem
        isEdited={false}
        name="coinsValue"
        allQuantity={quantity}
        setQuantity={setQuantity}
        itemName="Coins value, $"
        quantity={Math.floor(quantity?.coinsValue)}
        content="The value of all your coins at the end of the investments period."
      />
    </div>
  );
};

export default PortfolioTable;

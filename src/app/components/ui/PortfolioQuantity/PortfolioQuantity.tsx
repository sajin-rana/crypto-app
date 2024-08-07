import React from "react";
import { useSelector } from "react-redux";
import { numberWithCommas } from "@/app/utils/utils";
import { selectCurrency } from "@/lib/features/cryptoSlice";

const PortfolioQuantity = ({
  isEdited,
  quantity,
  setIndex,
  itemIndex = 0,
}: {
  setIndex?: any;
  quantity: number;
  isEdited: boolean;
  itemIndex?: number;
}) => {
  const getCurrency = useSelector(selectCurrency);
  const currencySign = getCurrency.sign;

  return (
    <div className="text-[16px] sm:text-[20px] h-[25px] sm:h-[40px] font-[500] ">
      {isEdited ? (
        <h4 onClick={() => setIndex(itemIndex)} className="cursor-pointer">
          {numberWithCommas(quantity)}
        </h4>
      ) : (
        <h4>{quantity ? numberWithCommas(quantity) : currencySign}</h4>
      )}
    </div>
  );
};

export default PortfolioQuantity;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";
import PortfolioInput from "../PortfolioInput/PortfolioInput";
import PortfolioTooltip from "../PortfolioTooltip/PortfolioTooltip";
import PortfolioQuantity from "../PortfolioQuantity/PortfolioQuantity";

const PortfolioTableItem = ({
  name,
  content,
  itemName,
  quantity,
  setQuantity,
  allQuantity,
  isEdited = true,
}: {
  name: string;
  content: string;
  itemName: string;
  quantity: number;
  setQuantity: any;
  allQuantity: any;
  isEdited?: boolean;
}) => {
  const [showInput, setShowInput] = useState(false);
  const isDark = useSelector(selectIsDark);

  function handleQuantityChange(e: any) {
    const quantity = Number(e.target.value);
    if (isNaN(quantity)) return;
    setQuantity({ ...allQuantity, [name]: quantity });
  }

  return (
    <div className="block sm:flex items-center  justify-between ">
      <div className="flex items-center justify-between sm:justify-start sm:gap-[16px]">
        <p className="text-[14px] sm:text-[16px] font-[400]">{itemName}</p>
        <PortfolioTooltip dataTooltipId={name} content={content} />
      </div>
      {showInput ? (
        <PortfolioInput
          isDark={isDark}
          quantity={quantity}
          setShowInput={setShowInput}
          handleQuantityChange={handleQuantityChange}
        />
      ) : (
        <PortfolioQuantity
          isEdited={isEdited}
          quantity={quantity}
          setShowInput={setShowInput}
        />
      )}
    </div>
  );
};

export default PortfolioTableItem;

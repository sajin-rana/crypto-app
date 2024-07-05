import React from "react";
import PortfolioCrossSvg from "../PortfolioCrossSvg/PortfolioCrossSvg";

const PortfolioHeading = ({
  text,
  setterFunction,
}: {
  text: string;
  setterFunction: any;
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <h4 className="text-[20px] sm:text-[24px] font-[500]">{text}</h4>
      <PortfolioCrossSvg setterFunction={setterFunction} />
    </div>
  );
};

export default PortfolioHeading;

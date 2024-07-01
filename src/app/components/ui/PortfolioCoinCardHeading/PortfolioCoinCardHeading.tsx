import React, { useState } from "react";
import PortfolioDeleteIcon from "../PortfolioDeleteIcon/PortfolioDeleteIcon";
import PortfolioDeleteModal from "../PortfolioDeleteModal/PortfolioDeleteModal";

const PortfolioCoinCardHeading = ({
  isDark,
  historyDateCoinData,
  handleDeleteButtonClick,
}: {
  isDark: boolean;
  historyDateCoinData: any;
  handleDeleteButtonClick: any;
}) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <h4 className="text-[20px] font-[500]">Market Price</h4>
      <div
        className={`h-[40px] w-[40px] rounded-[4px] flex items-center justify-center cursor-pointer ${
          isDark ? "bg-[#3A3978]" : "bg-[#B0B0F0]"
        }`}
        onClick={() => setIsDeleteOpen(true)}
      >
        <PortfolioDeleteIcon />
      </div>
      {isDeleteOpen && (
        <PortfolioDeleteModal
          setIsDeleteOpen={setIsDeleteOpen}
          historyDateCoinData={historyDateCoinData}
          handleDeleteButtonClick={handleDeleteButtonClick}
        />
      )}
    </div>
  );
};

export default PortfolioCoinCardHeading;

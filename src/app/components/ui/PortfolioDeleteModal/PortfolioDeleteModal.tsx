import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";
import { useHandleClickOutside } from "@/app/customHook/CustomHook";
import PortfolioImageContainer from "../PortfolioImageContainer/PortfolioImageContainer";

const PortfolioDeleteModal = ({
  setIsDeleteOpen,
  historyDateCoinData,
  handleDeleteButtonClick,
}: {
  setIsDeleteOpen: any;
  historyDateCoinData: any;
  handleDeleteButtonClick: any;
}) => {
  const isDark = useSelector(selectIsDark);
  const ref: any = useRef();
  useHandleClickOutside(ref, setIsDeleteOpen);
  const isDarkColor = isDark ? "darkGlowBackground" : "lightGlowBackground";

  return (
    <div className="fixed top-0 left-0 z-10 flex bg-[#26243752] backdrop-blur-[1px] w-full h-full">
      <div
        className={`absolute w-[584px] h-[479px] p-[48px] top-[calc(50%-292px)] left-[calc(50%-240px)] rounded-[20px]  ${
          isDark ? "bg-[#13121A] text-[#ffffff]" : "bg-[#FFFFFF] text-[#424286]"
        }`}
        ref={ref}
      >
        <div className="flex flex-col  items-center">
          <h4 className="text-[24px] font-[500]">
            Are you sure you want to delete?
          </h4>
          <PortfolioImageContainer
            isLightBackground="bg-[#EBEBFC]"
            isLightImageBackground="bg-[white]"
            data={historyDateCoinData}
            style="w-[297px] rounded-[8px] h-[241px] mt-[32px] "
          />
        </div>
        <div className="flex items-center  mt-[32px] text-[#ffffff] justify-between">
          <button
            className={`w-[230px] h-[45px] rounded-[6px] ${isDarkColor}`}
            onClick={() => setIsDeleteOpen(false)}
          >
            No
          </button>
          <button
            onClick={handleDeleteButtonClick}
            className={`w-[230px] h-[45px] rounded-[6px] ${isDarkColor}`}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDeleteModal;

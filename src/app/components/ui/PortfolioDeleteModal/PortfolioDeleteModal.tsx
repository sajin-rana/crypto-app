import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import { selectIsDark } from "@/lib/features/cryptoSlice";
import { useHandleClickOutside } from "@/app/customHook/CustomHook";
import PortfolioImageContainer from "../PortfolioImageContainer/PortfolioImageContainer";

const PortfolioDeleteModal = ({
  isError,
  isLoading,
  setIsDeleteOpen,
  historyDateCoinData,
  handleDeleteButtonClick,
}: {
  isError?: boolean;
  isLoading?: boolean;
  setIsDeleteOpen: any;
  historyDateCoinData: any;
  handleDeleteButtonClick: any;
}) => {
  const isDark = useSelector(selectIsDark);
  const ref: any = useRef();
  useHandleClickOutside(ref, setIsDeleteOpen);
  const isDarkColor = isDark ? "darkGlowBackground" : "lightGlowBackground";

  return (
    <Modal>
      <div
        className={`absolute w-[343px] left-[calc(50%-171.5px)] sm:w-[584px] h-[346px] top-[calc(50%-173px)] sm:h-[479px] p-[16px] sm:p-[48px] sm:top-[calc(50%-239.5px)] sm:left-[calc(50%-292px)] rounded-[20px]  ${
          isDark ? "bg-[#13121A] text-[#ffffff]" : "bg-[#FFFFFF] text-[#424286]"
        }`}
        ref={ref}
      >
        <div className="flex flex-col  items-center">
          <h4 className="text-[16px] sm:text-[24px] font-[500]">
            Are you sure you want to delete?
          </h4>
          <PortfolioImageContainer
            isError={isError}
            isLoading={isLoading}
            data={historyDateCoinData}
            isLightBackground="bg-[#EBEBFC]"
            isLightImageBackground="bg-[white]"
            style="w-[297px] rounded-[8px] h-[200px] sm:h-[250px] mt-[20px] sm:mt-[32px] "
          />
        </div>
        <div className="flex items-center mt-[20px] sm:mt-[32px] text-[#ffffff] justify-between">
          <button
            className={`sm:w-[230px] w-[150px] h-[44px] rounded-[6px] ${isDarkColor}`}
            onClick={() => setIsDeleteOpen(false)}
          >
            No
          </button>
          <button
            onClick={handleDeleteButtonClick}
            className={`sm:w-[230px] w-[150px] h-[44px] rounded-[6px] ${isDarkColor}`}
          >
            Yes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PortfolioDeleteModal;

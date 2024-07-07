import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { uid } from "uid";
import Modal from "../Modal/Modal";
import { useGetOneCoinDetailQuery } from "@/lib/features/cryptoApi";
import PortfolioHeading from "../PortfolioHeading/PortfolioHeading";
import { selectIsDark, selectedCoinOne } from "@/lib/features/cryptoSlice";
import { formatPortfolioDateAndTime, setLocalStorage } from "@/app/utils/utils";
import PortfolioImageContainer from "../PortfolioImageContainer/PortfolioImageContainer";
import PortfolioSearchCoinInput from "../PortfolioSearchCoinInput/PortfolioSearchCoinInput";
import PortfolioAddAssetCalendar from "../PortfolioAddAssetCalendar/PortfolioAddAssetCalendar";
import PortfolioSaveAndCancelButton from "../PortfolioSaveAndCancelButton/PortfolioSaveAndCancelButton";
import PortfolioCalculatorAndAssetInput from "../PortfolioCalculatorAndAssetInput/PortfolioCalculatorAndAssetInput";
import {
  useHandleClickOutside,
  useCloseOnEscapePressed,
} from "@/app/customHook/CustomHook";

const PortfolioAddAsset = ({
  coinForEdit,
  isEdited = false,
  setIsAddAssetOpen,
  purchasedCoinList,
  setPurchasedCoinList,
}: {
  coinForEdit?: any;
  isEdited?: boolean;
  setIsAddAssetOpen: any;
  purchasedCoinList: any;
  setPurchasedCoinList: any;
}) => {
  const [purchaseAmount, setPurchaseAmount] = useState<any>(
    isEdited ? coinForEdit.amount : ""
  );
  const [purchaseDate, setPurchaseDate] = useState(
    isEdited ? coinForEdit.purchaseTime : formatPortfolioDateAndTime(new Date())
  );
  const isDark = useSelector(selectIsDark);
  const coin = useSelector(selectedCoinOne);
  const { data, isError, isLoading }: any = useGetOneCoinDetailQuery(
    isEdited ? coinForEdit.coin : coin
  );
  const ref = useRef(null);
  useCloseOnEscapePressed(setIsAddAssetOpen);
  useHandleClickOutside(ref, setIsAddAssetOpen);

  function handlePurchaseAmountChange(e: any) {
    const amount = Number(e.target.value);
    if (!isNaN(amount)) setPurchaseAmount(amount);
  }

  function handleSubmit() {
    if (purchaseAmount && !isError && !isLoading && data?.id) {
      const purchasedCoin = {
        coin: data?.id,
        symbol: data?.symbol,
        amount: purchaseAmount,
        purchaseTime: purchaseDate.slice(0, 10),
        image: data?.image.large,
        id: isEdited ? coinForEdit.id : uid(),
      };

      if (isEdited) {
        const newEditedList = purchasedCoinList.map((el: any) => {
          if (el.id === purchasedCoin.id) {
            return purchasedCoin;
          }
          return el;
        });
        setPurchasedCoinList(newEditedList);
        setLocalStorage("purchasedCoinList", newEditedList);
      } else {
        setPurchasedCoinList([...purchasedCoinList, purchasedCoin]);
        setLocalStorage("purchasedCoinList", [
          ...purchasedCoinList,
          purchasedCoin,
        ]);
      }
      setIsAddAssetOpen(false);
    }
  }

  return (
    <Modal>
      <div
        className={`absolute w-[343px] sm:w-[886px] h-[410px] top-[calc(50%-205px)] left-[calc(50%-171.5px)]  sm:left-[calc(50%-443px)] rounded-[20px] p-[16px] sm:px-[48px] sm:py-[38px]  ${
          isDark ? "bg-[#13121A] text-[#ffffff]" : "bg-[#FFFFFF] text-[#424286]"
        } `}
        ref={ref}
      >
        <PortfolioHeading
          text="Select coins"
          setterFunction={() => setIsAddAssetOpen(false)}
        />
        <div className="sm:h-[241px] mt-[10px] sm:mt-[32px] block sm:flex  gap-[32px]">
          <PortfolioImageContainer
            data={data}
            isError={isError}
            isLoading={isLoading}
            isLightBackground="bg-[#EBEBFC]"
            isLightImageBackground="bg-[white]"
            style="w-full sm:w-[297px] rounded-[8px] h-[120px] sm:h-full "
          />
          <div className="w-full mt-[10px] sm:mt-[0px] sm:w-[461px] h-[241px]">
            <PortfolioSearchCoinInput width="w-full" />
            <PortfolioCalculatorAndAssetInput
              value={purchaseAmount}
              placeholder="Purchased amount"
              style="w-full mt-[10px] sm:mt-[16px]"
              handleChange={handlePurchaseAmountChange}
            />
            <PortfolioAddAssetCalendar
              purchaseDate={purchaseDate}
              setPurchaseDate={setPurchaseDate}
            />
            <PortfolioSaveAndCancelButton
              handleSubmit={handleSubmit}
              setIsAddAssetOpen={setIsAddAssetOpen}
              isReadyToSave={
                purchaseAmount && !isError && !isLoading && data?.id
              }
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PortfolioAddAsset;

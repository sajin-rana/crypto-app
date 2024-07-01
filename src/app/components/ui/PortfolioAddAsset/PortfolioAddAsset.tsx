import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { uid } from "uid";
import { useGetOneCoinDetailQuery } from "@/lib/features/cryptoApi";
import { useHandleClickOutside } from "@/app/customHook/CustomHook";
import PortfolioHeading from "../PortfolioHeading/PortfolioHeading";
import { selectIsDark, selectedCoinOne } from "@/lib/features/cryptoSlice";
import { formatPortfolioDateAndTime, setLocalStorage } from "@/app/utils/utils";
import PortfolioImageContainer from "../PortfolioImageContainer/PortfolioImageContainer";
import PortfolioSearchCoinInput from "../PortfolioSearchCoinInput/PortfolioSearchCoinInput";
import PortfolioAddAssetCalendar from "../PortfolioAddAssetCalendar/PortfolioAddAssetCalendar";
import PortfolioSaveAndCancelButton from "../PortfolioSaveAndCancelButton/PortfolioSaveAndCancelButton";
import PortfolioCalculatorAndAssetInput from "../PortfolioCalculatorAndAssetInput/PortfolioCalculatorAndAssetInput";

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
  const { data } = useGetOneCoinDetailQuery(isEdited ? coinForEdit.coin : coin);
  const ref = useRef(null);
  useHandleClickOutside(ref, setIsAddAssetOpen);

  function handlePurchaseAmountChange(e: any) {
    const amount = Number(e.target.value);
    if (!isNaN(amount)) setPurchaseAmount(amount);
  }

  function handleSubmit() {
    if (purchaseAmount) {
      const purchasedCoin = {
        coin: data?.id,
        symbol: data?.symbol,
        amount: purchaseAmount,
        purchaseTime: purchaseDate.slice(0, 10),
        image: data?.image.large,
        id: isEdited ? coinForEdit.id : uid(),
      };

      if (isEdited) {
        const newEditedList = [
          ...purchasedCoinList.filter(
            (coin: any) => coin.id !== coinForEdit.id
          ),
          purchasedCoin,
        ];
        setPurchasedCoinList(newEditedList);
        setLocalStorage("purchasedCoinList", [newEditedList]);
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
    <div className="top-0 left-0 z-10 bg-[#26243752] bg-opacity-65 backdrop-blur-[2px] absolute h-full w-full">
      <div
        className={`absolute w-[886px] h-[393px] top-[calc(50%-191px)] left-[calc(50%-443px)] rounded-[20px] px-[48px] py-[38px]  ${
          isDark ? "bg-[#13121A] text-[#ffffff]" : "bg-[#FFFFFF] text-[#424286]"
        } `}
        ref={ref}
      >
        <PortfolioHeading
          text="Select coins"
          setterFunction={() => setIsAddAssetOpen(false)}
        />
        <div className=" h-[241px] mt-[32px] flex  gap-[32px]">
          <PortfolioImageContainer
            data={data}
            style="w-[297px] rounded-[8px] h-full "
            isLightBackground="bg-[#EBEBFC]"
            isLightImageBackground="bg-[white]"
          />
          <div className="w-[461px] h-[241px]">
            <PortfolioSearchCoinInput width="w-full" />
            <PortfolioCalculatorAndAssetInput
              style="w-full mt-[16px]"
              value={purchaseAmount}
              handleChange={handlePurchaseAmountChange}
              placeholder="Purchased amount"
            />
            <PortfolioAddAssetCalendar
              purchaseDate={purchaseDate}
              setPurchaseDate={setPurchaseDate}
            />
            <PortfolioSaveAndCancelButton
              purchaseAmount={purchaseAmount}
              setIsAddAssetOpen={setIsAddAssetOpen}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAddAsset;

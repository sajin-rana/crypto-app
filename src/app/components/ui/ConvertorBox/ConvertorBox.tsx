import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCoinListQuery } from "@/lib/features/cryptoApi";
import ConvertorBoxLine from "../ConvertorBoxLine/ConvertorBoxLine";
import ConvertorBoxHeading from "../ConvertorBoxHeading/ConvertorBoxHeading";
import ConvertorBoxQuantity from "../ConvertorBoxQuantity/ConvertorBoxQuantity";
import ConvertorBoxDropDown from "../ConvertorBoxDropDown/ConvertorBoxDropDown";
import ConvertorBoxCoinPrice from "../ConvertorBoxCoinPrice/ConvertorBoxCoinPrice";
import ConvertorBoxQuantityInput from "../ConvertorBoxQuantityInput/ConvertorBoxQuantityInput";
import ConvertorBoxCoinDetails from "../ConvertorBoxCoinDetails/ConvertorBoxCoinDetails";
import {
  selectIsDark,
  setCoinOne,
  setCoinOneSymbol,
  setCoinTwo,
  setCoinTwoSymbol,
} from "@/lib/features/cryptoSlice";

const ConverterBox = ({
  data,
  bgColor,
  currency,
  coinPrice,
  headingText,
  currencySign,
  coinQuantity,
  handleQuantityChange,
}: {
  data: any;
  bgColor: string;
  currency: string;
  coinPrice: number;
  headingText: string;
  currencySign: string;
  coinQuantity: number;
  handleQuantityChange: any;
}) => {
  const [isQuantityOpen, setIsQuantityOpen] = useState(false);
  const [isCoinDropdownOpen, setIsCoinDropDownOpen] = useState(false);
  const [coinDropDownInput, setCoinDropDownInput] = useState("");
  const { data: coinListData } = useGetCoinListQuery(currency);
  const [coinList, setCoinList] = useState(coinListData);
  const isDark = useSelector(selectIsDark);
  const coinSymbol = data?.symbol?.toUpperCase();
  const dispatch = useDispatch();

  function handleCoinDropInputChange(e: any) {
    const value = e.target.value.toLowerCase();
    setCoinDropDownInput(value);
    setCoinList(
      coinListData?.filter((coin: any) =>
        coin?.name.toLowerCase().includes(value)
      )
    );
  }

  function handleCoinClick(id: string, symbol: string) {
    if (headingText === "You sell") {
      dispatch(setCoinOne(id));
      dispatch(setCoinOneSymbol(symbol));
    } else {
      dispatch(setCoinTwo(id));
      dispatch(setCoinTwoSymbol(symbol));
    }
  }

  useEffect(
    function () {
      setCoinList(coinListData);
    },
    [coinListData]
  );

  return (
    <div
      className={`w-[636px] h-[200px] rounded-[16px] p-[24px]  ${
        isDark ? bgColor : "bg-[white]"
      }`}
    >
      <ConvertorBoxHeading isDark={isDark} headingText={headingText} />
      <div
        className={`flex items-center justify-between mt-[40px] relative  ${
          isDark ? "text-[white]" : "text-[#353570]"
        }`}
      >
        <ConvertorBoxCoinDetails
          data={data}
          coinSymbol={coinSymbol}
          setIsCoinDropDownOpen={setIsCoinDropDownOpen}
        />
        {isCoinDropdownOpen && (
          <ConvertorBoxDropDown
            coinList={coinList}
            handleCoinClick={handleCoinClick}
            coinDropDownInput={coinDropDownInput}
            setIsCoinDropDownOpen={setIsCoinDropDownOpen}
            handleCoinDropInputChange={handleCoinDropInputChange}
          />
        )}
        {isQuantityOpen ? (
          <ConvertorBoxQuantityInput
            isDark={isDark}
            coinQuantity={coinQuantity}
            setIsQuantityOpen={setIsQuantityOpen}
            handleQuantityChange={handleQuantityChange}
          />
        ) : (
          <ConvertorBoxQuantity
            coinQuantity={coinQuantity}
            setIsQuantityOpen={setIsQuantityOpen}
          />
        )}
      </div>
      <ConvertorBoxLine isDark={isDark} />
      <ConvertorBoxCoinPrice
        isDark={isDark}
        coinPrice={coinPrice}
        coinSymbol={coinSymbol}
        currencySign={currencySign}
      />
    </div>
  );
};

export default ConverterBox;

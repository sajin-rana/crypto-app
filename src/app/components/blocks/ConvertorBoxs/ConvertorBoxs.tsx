import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { coinConverter } from "@/app/utils/utils";
import ConvertorBox from "../../ui/ConvertorBox/ConvertorBox";
import { useGetOneCoinDetailQuery } from "@/lib/features/cryptoApi";
import ConverterReverseButton from "../../ui/ConverterReverseButton/ConverterReverseButton";
import {
  setCoinOne,
  setCoinTwo,
  selectCurrency,
  selectedCoinOne,
  selectedCoinTwo,
  setCoinOneSymbol,
  setCoinTwoSymbol,
  selectedCoinOneSymbol,
  selectedCoinTwoSymbol,
} from "@/lib/features/cryptoSlice";

const ConvertorBoxs = () => {
  const getCurrency = useSelector(selectCurrency);
  const currency = getCurrency.name;
  const currencySign = getCurrency.sign;
  const coinOne = useSelector(selectedCoinOne) || "bitcoin";
  const coinOneSymbol = useSelector(selectedCoinOneSymbol) || "btc";
  const coinTwo = useSelector(selectedCoinTwo) || "ethereum";
  const coinTwoSymbol = useSelector(selectedCoinTwoSymbol) || "eth";
  const { data: coinDataOne } = useGetOneCoinDetailQuery(coinOne);
  const { data: coinDataTwo } = useGetOneCoinDetailQuery(coinTwo);
  const coinPriceOne =
    coinDataOne?.market_data?.current_price[currency.toLowerCase()];
  const coinPriceTwo =
    coinDataTwo?.market_data?.current_price[currency.toLowerCase()];
  const [coinQuantityOne, setCoinQuantityOne] = useState(1);
  const [coinQuantityTwo, setCoinQuantityTwo] = useState(
    coinConverter(coinQuantityOne, coinPriceOne, coinPriceTwo)
  );
  const dispatch = useDispatch();

  function handleQuantityChangeOne(e: any) {
    const quantity = Number(e.target.value);
    if (isNaN(quantity)) return;
    setCoinQuantityOne(quantity);
    setCoinQuantityTwo(coinConverter(quantity, coinPriceOne, coinPriceTwo));
  }

  function handleQuantityChangeTwo(e: any) {
    const quantity = Number(e.target.value);
    if (isNaN(quantity)) return;
    setCoinQuantityTwo(quantity);
    setCoinQuantityOne(coinConverter(quantity, coinPriceTwo, coinPriceOne));
  }

  function handleReverseButtonClick() {
    dispatch(setCoinOne(coinTwo));
    dispatch(setCoinOneSymbol(coinTwoSymbol));
    dispatch(setCoinTwo(coinOne));
    dispatch(setCoinTwoSymbol(coinOneSymbol));
    setCoinQuantityOne(coinQuantityTwo);
    setCoinQuantityTwo(coinQuantityOne);
  }

  useEffect(
    function () {
      setCoinQuantityTwo(
        coinConverter(coinQuantityOne, coinPriceOne, coinPriceTwo)
      );
    },
    [coinQuantityOne, coinPriceOne, coinPriceTwo]
  );
  return (
    <div className="block sm:flex justify-between items-center relative w-full">
      <ConvertorBox
        data={coinDataOne}
        currency={currency}
        bgColor="bg-[#191932]"
        headingText="You sell"
        coinPrice={coinPriceOne}
        currencySign={currencySign}
        coinQuantity={coinQuantityOne}
        handleQuantityChange={handleQuantityChangeOne}
      />
      <ConverterReverseButton
        handleReverseButtonClick={handleReverseButtonClick}
      />
      <div className="mt-[20px] sm:mt-[0px]">
        <ConvertorBox
          data={coinDataTwo}
          currency={currency}
          bgColor="bg-[#1E1932]"
          headingText="You buy"
          coinPrice={coinPriceTwo}
          currencySign={currencySign}
          coinQuantity={coinQuantityTwo}
          handleQuantityChange={handleQuantityChangeTwo}
        />
      </div>
    </div>
  );
};

export default ConvertorBoxs;

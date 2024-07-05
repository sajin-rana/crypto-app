"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import Line from "@/app/components/ui/Line/Line";
import Success from "@/app/components/ui/Success/Success";
import { useGetOneCoinDetailQuery } from "@/lib/features/cryptoApi";
import { selectCurrency, selectIsDark } from "@/lib/features/cryptoSlice";
import CoinPageMainBox from "@/app/components/ui/CoinPageMainBox/CoinPageMainBox";
import CoinPageParagraph from "@/app/components/ui/CoinPageParagraph/CoinPageParagraph";
import CoinPageFooterBox from "@/app/components/ui/CoinPageFooterBox/CoinPageFooterBox";

function Coin({ params }: { params: { coinId: string } }) {
  const [isCopy, setIsCopy] = useState(false);
  const isDark = useSelector(selectIsDark);
  const getCurrency = useSelector(selectCurrency);
  const currency = getCurrency.name.toLowerCase();
  const currencySign = getCurrency.sign;
  const { data, isError, isLoading } = useGetOneCoinDetailQuery(params.coinId);
  const currentPrice = data?.market_data?.current_price?.[currency];

  function handleIsCopy() {
    setIsCopy(true);
    const interval = setInterval(() => {
      setIsCopy(false);
      clearInterval(interval);
      return;
    }, 2000);
  }

  return (
    <div className={`relative ${isDark ? "text-[#ffffff]" : "text-[black]"}`}>
      {isCopy && (
        <Success
          className="top-[10px] sm:top-[10px] right-[20px] sm:right-[100px] "
          text="Link copied successfully"
        />
      )}
      <h4
        className={`my-[20px] sm:my-[40px] text-[16px] text-center sm:text-left sm:text-[20px] font-[400] sm:font-[500] ${
          isDark ? "text-[#ffffff]" : "text-[#424286]"
        }`}
      >
        Coin Details / Your {data?.name} summary
      </h4>
      <div className=" sm:flex h-full sm:h-[461px] justify-between">
        <CoinPageMainBox
          data={data}
          isDark={isDark}
          isError={isError}
          currency={currency}
          isLoading={isLoading}
          handleIsCopy={handleIsCopy}
          currencySign={currencySign}
          currentPrice={currentPrice}
        />
        <CoinPageParagraph
          data={data}
          isError={isError}
          isLoading={isLoading}
          handleIsCopy={handleIsCopy}
        />
      </div>
      <div className="mt-[20px] sm:mt-[30px] mb-[20px] sm:mb-[30px]">
        <Line />
      </div>
      <CoinPageFooterBox
        data={data}
        isError={isError}
        currency={currency}
        isLoading={isLoading}
        currencySign={currencySign}
      />
    </div>
  );
}

export default Coin;

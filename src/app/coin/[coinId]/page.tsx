"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrency, selectIsDark } from "@/lib/features/cryptoSlice";
import { useGetOneCoinDetailQuery } from "@/lib/features/cryptoApi";
import Line from "@/app/components/ui/Line/Line";
import Success from "@/app/components/ui/Success/Success";
import CoinPageMainBox from "@/app/components/ui/CoinPageMainBox/CoinPageMainBox";
import CoinPageParagraph from "@/app/components/ui/CoinPageParagraph/CoinPageParagraph";
import CoinPageFooterBox from "@/app/components/ui/CoinPageFooterBox/CoinPageFooterBox";

function Coin({ params }: { params: { coinId: string } }) {
  const [isCopy, setIsCopy] = useState(false);
  const isDark = useSelector(selectIsDark);
  const getCurrency = useSelector(selectCurrency);
  const currency = getCurrency.name.toLowerCase();
  const currencySign = getCurrency.sign;
  const { data } = useGetOneCoinDetailQuery(params.coinId);
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
          className="top-[-170px] right-[0px] "
          text="Link copied successfully"
        />
      )}
      <h4
        className={`my-[40px] text-[20px] font-[500] ${
          isDark ? "text-[#ffffff]" : "text-[#424286]"
        }`}
      >
        Coin Details / Your {data?.name} summary
      </h4>
      <div className="flex h-[461px] justify-between">
        <CoinPageMainBox
          isDark={isDark}
          data={data}
          handleIsCopy={handleIsCopy}
          currencySign={currencySign}
          currentPrice={currentPrice}
          currency={currency}
        />
        <CoinPageParagraph data={data} handleIsCopy={handleIsCopy} />
      </div>
      <div className="mt-[30px] mb-[30px]">
        <Line />
      </div>
      <CoinPageFooterBox
        data={data}
        currencySign={currencySign}
        currency={currency}
      />
    </div>
  );
}

export default Coin;

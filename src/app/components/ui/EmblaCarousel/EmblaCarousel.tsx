import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  selectCurrency,
  selectIsCompare,
  selectIsDark,
  selectedCoinOne,
  selectedCoinTwo,
  selectedCoinTwoSymbol,
  setCoinOne,
  setCoinOneSymbol,
  setCoinTwo,
  setCoinTwoSymbol,
} from "@/lib/features/cryptoSlice";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../CarouselArrowButtons/CarouselArrowButtons";
import { useGetCoinListQuery } from "@/lib/features/cryptoApi";
import { greaterThanZero, numberWithCommas } from "@/app/utils/utils";
import CoinCarouselLoading from "../CoinCarouselLoading/CoinCarouselLoading";
import UpDownArrow from "../UpDownArrow/UpDownArrow";

const EmblaCarousel = ({ options }: { options: any }) => {
  const isDark = useSelector(selectIsDark);
  const currency = useSelector(selectCurrency);
  const coinOne = useSelector(selectedCoinOne);
  const coinTwo = useSelector(selectedCoinTwo);
  const coinTwoSymbol = useSelector(selectedCoinTwoSymbol);
  const isCompare = useSelector(selectIsCompare);
  const dispatch = useDispatch();

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const { data, error, isLoading } = useGetCoinListQuery(
    currency.name.toLowerCase()
  );

  function handleClick(id: string, symbol: string) {
    if (isCompare) {
      if (!coinTwo) {
        dispatch(setCoinTwo(id));
        dispatch(setCoinTwoSymbol(symbol));
      } else if (coinOne !== id && coinTwo !== id) {
        dispatch(setCoinOne(coinTwo));
        dispatch(setCoinOneSymbol(coinTwoSymbol));
        dispatch(setCoinTwo(id));
        dispatch(setCoinTwoSymbol(symbol));
      }
    } else {
      dispatch(setCoinOne(id));
      dispatch(setCoinOneSymbol(symbol));
      dispatch(setCoinTwo(""));
      dispatch(setCoinTwoSymbol(""));
    }
  }

  function backgroundColor(id: string) {
    if (isDark) {
      return id === coinOne || id === coinTwo ? "darkGlowBackground" : "";
    } else {
      return id === coinOne || id === coinTwo ? "lightGlowBackground" : "";
    }
  }
  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="mt-[24px] w-full h-[80px] relative flex">
          {error !== undefined || isLoading ? (
            <CoinCarouselLoading />
          ) : (
            data?.map((coin: any) => (
              <div
                key={coin?.id}
                className={`w-[20%] h-full shrink-0 grow-0 min-w-0 ml-[5px] mr-[5px]  relative rounded-[6px] flex items-center cursor-pointer  gap-[16px] p-[16px] ${
                  isDark ? "bg-[#191925]" : "bg-[white]"
                }  ${backgroundColor(coin.id)}`}
                onClick={() => handleClick(coin.id, coin.symbol)}
              >
                <Image src={coin.image} alt={coin.id} height={32} width={32} />
                <div className="">
                  <p
                    className={`text-[16px] font-[500]  overflow-hidden  w-[160px] h-[24px] ${
                      isDark ? "text-[#ffff]" : "text-[#181825]"
                    }`}
                  >
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </p>
                  <div className="flex items-center gap-[8px]">
                    <span
                      className={`text-[14px] font-[400] ${
                        isDark ? "text-[#D1D1D1]" : "text-[#424286]"
                      }`}
                    >
                      {numberWithCommas(coin.current_price.toFixed(2))}{" "}
                      {currency.name}
                    </span>
                    <span className="">
                      <UpDownArrow
                        priceChangePercentage={coin.price_change_percentage_24h}
                      />
                    </span>
                    <span
                      className={`${
                        greaterThanZero(coin.price_change_percentage_24h)
                          ? "text-[#00B1A7]"
                          : "text-[#FE2264]"
                      }`}
                    >
                      {Math.abs(coin.price_change_percentage_24h.toFixed(2))}%
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="absolute left-[-40px] top-[40px] ">
        <PrevButton onClick={onPrevButtonClick} />
      </div>
      <div className="absolute right-[-40px] top-[40px] ">
        <NextButton onClick={onNextButtonClick} />
      </div>
    </div>
  );
};

export default EmblaCarousel;

import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useDispatch, useSelector } from "react-redux";
import UpDownArrow from "../UpDownArrow/UpDownArrow";
import { useGetCoinListQuery } from "@/lib/features/cryptoApi";
import { greaterThanZero, numberWithCommas } from "@/app/utils/utils";
import CoinCarouselLoading from "../CoinCarouselLoading/CoinCarouselLoading";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../CarouselArrowButtons/CarouselArrowButtons";
import {
  setCoinOne,
  setCoinTwo,
  selectIsDark,
  selectCurrency,
  selectIsCompare,
  selectedCoinOne,
  selectedCoinTwo,
  setCoinOneSymbol,
  setCoinTwoSymbol,
  selectedCoinTwoSymbol,
} from "@/lib/features/cryptoSlice";

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
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="mt-[20px] sm:mt-[24px] w-[343px] sm:w-full h-[51px] sm:h-[80px] relative flex ">
          {error !== undefined || isLoading ? (
            <CoinCarouselLoading />
          ) : (
            data?.map((coin: any) => (
              <div
                key={coin?.id}
                className={` w-[168px] h-[51px] sm:w-[20%] sm:h-full shrink-0 grow-0 relative rounded-[6px] flex items-center cursor-pointer gap-[8px] sm:gap-[16px] py-[8px] px-[10px] mx-[4px] sm:p-[16px] ${
                  isDark ? "bg-[#191925]" : "bg-[white]"
                }  ${backgroundColor(coin.id)}`}
                onClick={() => handleClick(coin.id, coin.symbol)}
              >
                <div className="hidden sm:block">
                  <Image
                    src={coin.image}
                    alt={coin.id}
                    height={32}
                    width={32}
                  />
                </div>
                <div className="block sm:hidden">
                  <Image
                    src={coin.image}
                    alt={coin.id}
                    height={24}
                    width={24}
                  />
                </div>

                <div className="flex items-center w-full justify-between sm:block">
                  <p
                    className={`text-[14px]  sm:text-[16px] font-[500]  overflow-hidden  sm:w-[160px] sm:h-[24px] ${
                      isDark ? "text-[#ffff]" : "text-[#181825]"
                    }`}
                  >
                    <span className="hidden sm:inline">{coin.name} </span>
                    <span className="hidden sm:inline">
                      ({coin.symbol.toUpperCase()})
                    </span>
                    <span className="sm:hidden inline">
                      {coin.symbol.toUpperCase()}
                    </span>
                  </p>
                  <div className="block sm:flex items-center gap-[8px]">
                    <span
                      className={`sm:text-[14px] text-[10px] font-[400] whitespace-nowrap ${
                        isDark ? "text-[#D1D1D1]" : "text-[#424286]"
                      }`}
                    >
                      {numberWithCommas(coin.current_price)} {currency.name}
                    </span>
                    <div className="flex items-center gap-[8px] ">
                      <span className="">
                        <UpDownArrow
                          priceChangePercentage={
                            coin.price_change_percentage_24h
                          }
                        />
                      </span>
                      <span
                        className={` sm:text-[14px] text-[10px]  ${
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
              </div>
            ))
          )}
        </div>
      </div>
      <div className="absolute hidden sm:block left-[-40px] top-[40px] ">
        <PrevButton onClick={onPrevButtonClick} />
      </div>
      <div className="absolute hidden sm:block right-[-40px] top-[40px] ">
        <NextButton onClick={onNextButtonClick} />
      </div>
    </div>
  );
};

export default EmblaCarousel;

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
  setCoinOne,
  setCoinTwo,
} from "@/lib/features/cryptoSlice";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../CarouselArrowButtons/CarouselArrowButtons";
import { useGetCoinListQuery } from "@/lib/features/cryptoApi";
import { greaterThanZero, numberWithCommas } from "@/app/utils/utils";
import CoinCarouselLoading from "../CoinCarouselLoading/CoinCarouselLoading";

const EmblaCarousel = ({ options }: { options: any }) => {
  const isDark = useSelector(selectIsDark);
  const currency = useSelector(selectCurrency);
  const coinOne = useSelector(selectedCoinOne);
  const coinTwo = useSelector(selectedCoinTwo);
  const isCompare = useSelector(selectIsCompare);
  const dispatch = useDispatch();

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const { data, error, isLoading } = useGetCoinListQuery(
    currency.name.toLowerCase()
  );

  function handleClick(id: string) {
    if (isCompare) {
      if (!coinTwo) {
        dispatch(setCoinTwo(id));
      } else if (coinOne !== id && coinTwo !== id) {
        dispatch(setCoinOne(coinTwo));
        dispatch(setCoinTwo(id));
      }
    } else {
      dispatch(setCoinOne(id));
      dispatch(setCoinTwo(""));
    }
  }

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="mt-[24px] w-full h-[80px] relative flex">
          {error !== undefined || isLoading ? (
            <CoinCarouselLoading />
          ) : (
            data?.map(
              (coin: any) =>
                coin.name.length < 10 && (
                  <div
                    key={coin?.id}
                    className={`w-[20%] h-full shrink-0 grow-0 min-w-0 ml-[5px] mr-[5px]  relative rounded-[6px] flex items-center cursor-pointer  gap-[16px] p-[16px] ${
                      isDark ? "bg-[#191925]" : "bg-[white]"
                    } 
                    ${
                      (isDark && coin.id === coinOne) ||
                      (isDark && coin.id === coinTwo)
                        ? "darkGlowBackground"
                        : ""
                    }
                    ${
                      (isDark === false && coin.id === coinOne) ||
                      (isDark === false && coin.id === coinTwo)
                        ? "lightGlowBackground"
                        : ""
                    }
                    `}
                    onClick={() => handleClick(coin.id)}
                  >
                    <Image
                      src={coin.image}
                      alt={coin.id}
                      height={32}
                      width={32}
                    />
                    <div className="">
                      <p
                        className={`text-[16px] font-[500] ${
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
                          <svg
                            transform={
                              greaterThanZero(coin.price_change_percentage_24h)
                                ? "rotate(0)"
                                : "rotate(180)"
                            }
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.00065 6.33301L4.66732 9.66634H11.334L8.00065 6.33301Z"
                              fill={
                                greaterThanZero(
                                  coin.price_change_percentage_24h
                                )
                                  ? "#00B1A7"
                                  : "#FE2264"
                              }
                              fillOpacity={1}
                            />
                          </svg>
                        </span>
                        <span
                          className={`${
                            greaterThanZero(coin.price_change_percentage_24h)
                              ? "text-[#00B1A7]"
                              : "text-[#FE2264]"
                          }`}
                        >
                          {Math.abs(
                            coin.price_change_percentage_24h.toFixed(2)
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                )
            )
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

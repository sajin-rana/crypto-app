import { selectIsDark } from "@/lib/features/cryptoSlice";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";

export const usePrevNextButtons = (emblaApi: any) => {
  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);
  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);
  return {
    onPrevButtonClick,
    onNextButtonClick,
  };
};

export const PrevButton = ({ ...restProps }) => {
  const isDark = useSelector(selectIsDark);
  return (
    <button
      {...restProps}
      className={`h-[48px] w-[48px] rounded-full darkSelectedBackground flex items-center justify-center ${
        isDark ? "darkGlowBackground" : "lightGlowBackground"
      } `}
    >
      <svg
        width="9"
        height="15"
        viewBox="0 0 9 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="rotate-180"
      >
        <path
          d="M1.42578 14.1004L6.85912 8.66706C7.50078 8.02539 7.50078 6.97539 6.85912 6.33372L1.42578 0.900391"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export const NextButton = ({ ...restProps }) => {
  const isDark = useSelector(selectIsDark);
  return (
    <button
      {...restProps}
      className={`h-[48px] w-[48px] rounded-full darkSelectedBackground flex items-center justify-center ${
        isDark ? "darkGlowBackground" : "lightGlowBackground"
      } `}
    >
      <svg
        width="9"
        height="15"
        viewBox="0 0 9 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.42578 14.1004L6.85912 8.66706C7.50078 8.02539 7.50078 6.97539 6.85912 6.33372L1.42578 0.900391"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

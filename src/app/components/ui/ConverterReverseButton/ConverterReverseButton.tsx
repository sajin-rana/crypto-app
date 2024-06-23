import React from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";

const ConverterReverseButton = ({
  handleReverseButtonClick,
}: {
  handleReverseButtonClick: any;
}) => {
  const isDark = useSelector(selectIsDark);
  return (
    <div
      className={`h-[48px] w-[48px] rounded-full flex items-center justify-center cursor-pointer absolute top-[calc(50%-24px)]  left-[calc(50%-24px)] ${
        isDark ? "bg-[#FFFFFF]" : "bg-[#353570]"
      }`}
      onClick={handleReverseButtonClick}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 16L6.5 20M6.5 20L10.5 16M6.5 20L6.5 6C6.5 4.89543 7.39543 4 8.5 4V4"
          stroke={isDark ? "#3D3D7E" : "white"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.5 8L17.5 4M17.5 4L21.5 8M17.5 4L17.5 19C17.5 20.1046 16.6046 21 15.5 21V21"
          stroke={isDark ? "#3D3D7E" : "white"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default ConverterReverseButton;

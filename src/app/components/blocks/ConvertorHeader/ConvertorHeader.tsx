import React from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";

const ConverterHeader = () => {
  const isDark = useSelector(selectIsDark);
  const date = new Date();
  const datetime = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;

  return (
    <div className="my-[20px] sm:my-[40px] text-center sm:text-left">
      <h4
        className={`text-[16px] sm:text-[20px] font-[400] sm:font-[500]  ${
          isDark ? "text-[#ffffff]" : "text-[#424286]"
        }`}
      >
        Online currency convertor
      </h4>
      <p
        className={`text-[14px] sm:text-[16px] font-[400] ${
          isDark ? "text-[#9E9E9E]" : "text-[#424286CC]"
        }`}
      >
        {datetime}
      </p>
    </div>
  );
};

export default ConverterHeader;

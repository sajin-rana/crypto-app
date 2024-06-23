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
    <div className="mt-[40px] mb-[40px]">
      <h4
        className={` text-[20px] font-[500] ${
          isDark ? "text-[#ffffff]" : "text-[#424286]"
        }`}
      >
        Online currency convertor
      </h4>
      <p
        className={`text-[16px] font-[400] ${
          isDark ? "text-[#9E9E9E]" : "text-[#424286CC]"
        }`}
      >
        {datetime}
      </p>
    </div>
  );
};

export default ConverterHeader;

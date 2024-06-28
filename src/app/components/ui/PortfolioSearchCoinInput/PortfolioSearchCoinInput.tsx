"use client";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsDark } from "@/lib/features/cryptoSlice";
import { useHandleClickOutside } from "@/app/customHook/CustomHook";
import PortfolioDropDown from "../PortfolioDropDown/PortfolioDropDown";
import PortfolioCalculatorAndAssetInput from "../PortfolioCalculatorAndAssetInput/PortfolioCalculatorAndAssetInput";

const PortfolioSearchCoinInput = ({
  width = "w-[550px]",
}: {
  width?: string;
}) => {
  const [searchCoinInput, setSearchCoinInput] = useState("");
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const isDark = useSelector(selectIsDark);
  const ref: any = useRef();
  useHandleClickOutside(ref, setDropDownOpen);

  function handleChange(e: any) {
    setSearchCoinInput(e.target.value);
    setDropDownOpen(true);
  }
  return (
    <div className="relative" ref={ref}>
      <PortfolioCalculatorAndAssetInput
        style={width}
        value={searchCoinInput}
        handleChange={handleChange}
        setterFunction={setDropDownOpen}
      />
      {searchCoinInput && dropdownOpen && (
        <PortfolioDropDown
          isDark={isDark}
          searchCoinInput={searchCoinInput}
          setSearchCoinInput={setSearchCoinInput}
        />
      )}
    </div>
  );
};

export default PortfolioSearchCoinInput;

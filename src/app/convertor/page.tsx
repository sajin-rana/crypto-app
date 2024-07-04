"use client";
import ConvertorBoxs from "../components/blocks/ConvertorBoxs/ConvertorBoxs";
import ConvertorChart from "../components/blocks/ConvertorChart/ConvertorChart";
import ConvertorHeader from "../components/blocks/ConvertorHeader/ConvertorHeader";
import CoinConvertorButton from "../components/blocks/CoinConvertorButton/CoinConvertorButton";

function Converter() {
  return (
    <div>
      <CoinConvertorButton />
      <ConvertorHeader />
      <ConvertorBoxs />
      <ConvertorChart />
    </div>
  );
}

export default Converter;

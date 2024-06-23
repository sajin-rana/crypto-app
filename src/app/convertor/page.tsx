"use client";
import CoinConvertorButton from "../components/blocks/CoinConvertorButton/CoinConvertorButton";
import ConvertorBoxs from "../components/blocks/ConvertorBoxs/ConvertorBoxs";
import ConvertorHeader from "../components/blocks/ConvertorHeader/ConvertorHeader";
import ConvertorChart from "../components/blocks/ConvertorChart/ConvertorChart";

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

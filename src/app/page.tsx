"use client";

import CoinConvertorButton from "./components/blocks/CoinConvertorButton/CoinConvertorButton";
import Compare from "./components/blocks/Compare/Compare";

export default function Home() {
  return (
    <div className="text-white ">
      <CoinConvertorButton />
      <Compare />
    </div>
  );
}

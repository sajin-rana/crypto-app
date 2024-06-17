"use client";
import CoinCarousel from "./components/blocks/CoinCarousel/CoinCarousel";
import CoinConvertorButton from "./components/blocks/CoinConvertorButton/CoinConvertorButton";
import Compare from "./components/blocks/Compare/Compare";
import Chart from "./components/blocks/Chart/Chart";

export default function Home() {
  return (
    <div className="text-white ">
      <CoinConvertorButton />
      <Compare />
      <CoinCarousel />
      <Chart />
    </div>
  );
}

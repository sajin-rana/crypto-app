"use client";
import Chart from "./components/blocks/Chart/Chart";
import Compare from "./components/blocks/Compare/Compare";
import CoinTable from "./components/blocks/CoinTable/CoinTable";
import CoinCarousel from "./components/blocks/CoinCarousel/CoinCarousel";
import CoinConvertorButton from "./components/blocks/CoinConvertorButton/CoinConvertorButton";

export default function Home() {
  return (
    <div className="text-white ">
      <CoinConvertorButton />
      <Compare />
      <CoinCarousel />
      <Chart />
      <CoinTable />
    </div>
  );
}

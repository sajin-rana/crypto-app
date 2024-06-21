"use client";
import React from "react";
import { useGetMarketDataQuery } from "@/lib/features/cryptoApi";
import { formatNumber, getPercentage } from "@/app/utils/utils";
import NavBarCoin from "../../ui/NavBarCoin/NavBarCoin";
import Exchange from "../../ui/Exchange/Exchange";
import TotalMarketCap from "../../ui/TotalMarketCap/TotalMarketCap";
import TotalVolume from "../../ui/TotalVolume/TotalVolume";
import BtcPercentage from "../../ui/BtcPercentage/BtcPercentage";
import EthPercentage from "../../ui/EthPercentage/EthPercentage";
import { useSelector } from "react-redux";
import { selectCurrency, selectIsDark } from "@/lib/features/cryptoSlice";

const TopGlobalNavbar = () => {
  const isDark = useSelector(selectIsDark);
  const currency = useSelector(selectCurrency).name.toLowerCase();
  const { data, isLoading } = useGetMarketDataQuery("");
  const globalData = data?.data;

  const cryptoData = {
    coin: globalData?.active_cryptocurrencies,
    exchange: globalData?.markets,
    totalMarketCap: formatNumber(globalData?.total_market_cap[currency]),
    totalVolume: formatNumber(globalData?.total_volume[currency]),
    totalVolumePercentage: getPercentage(
      globalData?.total_volume[currency],
      globalData?.total_market_cap[currency]
    ),
    btcPercentage: Math.floor(globalData?.market_cap_percentage.btc),
    ethPercentage: Math.floor(globalData?.market_cap_percentage.eth),
  };

  return (
    <nav
      className={`h-56px py-[16px] px-[72px]  flex justify-center gap-[32px] border-b-[1px]  ${
        isDark
          ? "bg-[#1E1932]  border-[#FFFFFF1A] "
          : "bg-[#353570] border-[#494982]"
      }`}
    >
      <NavBarCoin coin={cryptoData.coin} isLoading={isLoading} />
      <Exchange exchange={cryptoData.exchange} isLoading={isLoading} />
      <TotalMarketCap
        totalMarketCap={cryptoData.totalMarketCap}
        isLoading={isLoading}
      />
      <TotalVolume
        totalVolume={cryptoData.totalVolume}
        totalVolumePercentage={cryptoData.totalVolumePercentage}
        isLoading={isLoading}
      />
      <BtcPercentage
        btcPercentage={cryptoData.btcPercentage}
        isLoading={isLoading}
      />
      <EthPercentage
        ethPercentage={cryptoData.ethPercentage}
        isLoading={isLoading}
      />
    </nav>
  );
};

export default TopGlobalNavbar;

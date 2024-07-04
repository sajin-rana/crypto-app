"use client";
import React from "react";
import { useSelector } from "react-redux";
import Exchange from "../../ui/Exchange/Exchange";
import NavBarCoin from "../../ui/NavBarCoin/NavBarCoin";
import TotalVolume from "../../ui/TotalVolume/TotalVolume";
import { formatNumber, getPercentage } from "@/app/utils/utils";
import BtcPercentage from "../../ui/BtcPercentage/BtcPercentage";
import EthPercentage from "../../ui/EthPercentage/EthPercentage";
import { useGetMarketDataQuery } from "@/lib/features/cryptoApi";
import TotalMarketCap from "../../ui/TotalMarketCap/TotalMarketCap";
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
      className={`h-[56px]  flex sm:justify-center sm:gap-[32px] px-[16px] sm:px-[0px] border-b-[1px]  sm:items-center sm:min-w-[775px] overflow-scroll w-[100%]  gap-10 noScrollbar ${
        isDark
          ? "bg-[#1E1932]  border-[#FFFFFF1A] "
          : "bg-[#353570] border-[#494982]"
      }`}
    >
      <NavBarCoin coin={cryptoData.coin} isLoading={isLoading} />
      <Exchange exchange={cryptoData.exchange} isLoading={isLoading} />
      <TotalMarketCap
        isLoading={isLoading}
        totalMarketCap={cryptoData.totalMarketCap}
      />
      <TotalVolume
        isLoading={isLoading}
        totalVolume={cryptoData.totalVolume}
        totalVolumePercentage={cryptoData.totalVolumePercentage}
      />
      <BtcPercentage
        isLoading={isLoading}
        btcPercentage={cryptoData.btcPercentage}
      />
      <EthPercentage
        isLoading={isLoading}
        ethPercentage={cryptoData.ethPercentage}
      />
    </nav>
  );
};

export default TopGlobalNavbar;

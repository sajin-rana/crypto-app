import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { selectCurrency, selectIsDark } from "@/lib/features/cryptoSlice";
import { useGetTableCoinListQuery } from "@/lib/features/cryptoApi";
import TableHeading from "../../ui/TableHeading/TableHeading";
import TableCoinList from "../../ui/TableCoinList/TableCoinList";

const CoinTable = () => {
  const isDark = useSelector(selectIsDark);
  const getCurrency = useSelector(selectCurrency);
  const [order, setOrder] = useState("market_cap");
  const [page, setPage] = useState(1);
  const [coinList, setCoinList] = useState<any[]>([]);
  const currency = getCurrency.name.toLowerCase();
  const { data } = useGetTableCoinListQuery({ currency, order, page });

  function handleHeadingClick(name: string) {
    if (name === "market_cap" || name === "id") {
      setOrder(name);
    } else {
      setCoinList((coin) => [...coin].sort((a, b) => b[name] - a[name]));
    }
  }

  useEffect(
    function () {
      if (page === 1) {
        setCoinList(data);
      } else if (page > 1) {
        data?.forEach((coin: any) => {
          if (!coinList?.some((c: any) => c.id === coin.id)) {
            setCoinList((coins) => [...coins, coin]);
          }
        });
      }
    },
    [page, data, coinList]
  );

  function fetchData() {
    setPage((page) => page + 1);
  }

  return (
    <div>
      <div className="mt-[72px] w-[100%]">
        <TableHeading handleHeadingClick={handleHeadingClick} order={order} />
        <div>
          <InfiniteScroll
            dataLength={coinList?.length}
            next={fetchData}
            hasMore={true}
            loader={
              <p
                className={`coin-table-loading w-full mb-[20px] ${
                  isDark ? "text-[#FFFFFF]" : "text-[#232336]"
                }`}
              ></p>
            }
            endMessage={
              <p
                className={`text-center text-[20px] mb-[20px] ${
                  isDark ? "text-[#FFFFFF]" : "text-[#232336]"
                }`}
              >
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {coinList?.map((item, index) => (
              <TableCoinList key={item.id} item={item} index={index} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default CoinTable;

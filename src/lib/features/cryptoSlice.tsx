import { currencyLists, getLocalStorage } from "@/app/utils/utils";
import { createSlice } from "@reduxjs/toolkit";

const cryptoSlice = createSlice({
  name: "cryptoSlice",
  initialState: {
    currency: getLocalStorage("currency") || currencyLists[0],
    isDark: getLocalStorage("isDark") || true,
    isCompare: false,
    coinOne: "bitcoin",
    coinTwo: "",
    coinOneSymbol: "btc",
    coinTwoSymbol: "",
    purchasedCoinList: getLocalStorage("purchasedCoinList") || [],
  },
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setIsDark: (state, action) => {
      state.isDark = action.payload;
    },
    setIsCompare: (state, action) => {
      state.isCompare = action.payload;
    },
    setCoinOne: (state, action) => {
      state.coinOne = action.payload;
    },
    setCoinTwo: (state, action) => {
      state.coinTwo = action.payload;
    },
    setCoinOneSymbol: (state, action) => {
      state.coinOneSymbol = action.payload;
    },
    setCoinTwoSymbol: (state, action) => {
      state.coinTwoSymbol = action.payload;
    },
    setPurchasedCoinList: (state, action) => {
      state.coinTwoSymbol = action.payload;
    },
  },
});

export const selectCurrency = (state: any) => state.cryptoSlice.currency;
export const selectIsDark = (state: any) => state.cryptoSlice.isDark;
export const selectIsCompare = (state: any) => state.cryptoSlice.isCompare;
export const selectedCoinOne = (state: any) => state.cryptoSlice.coinOne;
export const selectedCoinTwo = (state: any) => state.cryptoSlice.coinTwo;
export const selectedCoinOneSymbol = (state: any) =>
  state.cryptoSlice.coinOneSymbol;
export const selectedCoinTwoSymbol = (state: any) =>
  state.cryptoSlice.coinTwoSymbol;
export const selectPurchasedCoinList = (state: any) =>
  state.cryptoSlice.purchasedCoinList;
export const {
  setCurrency,
  setIsDark,
  setIsCompare,
  setCoinOne,
  setCoinTwo,
  setCoinOneSymbol,
  setCoinTwoSymbol,
  setPurchasedCoinList,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;

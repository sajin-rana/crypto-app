import { createSlice } from "@reduxjs/toolkit";
import { currencyLists, getLocalStorage } from "@/app/utils/utils";

const cryptoSlice = createSlice({
  name: "cryptoSlice",
  initialState: {
    coinTwo: "",
    isCompare: false,
    coinTwoSymbol: "",
    coinOne: "bitcoin",
    coinOneSymbol: "btc",
    isDark: getLocalStorage("isDark") || true,
    currency: getLocalStorage("currency") || currencyLists[0],
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
  },
});

export const selectIsDark = (state: any) => state.cryptoSlice.isDark;
export const selectedCoinTwo = (state: any) => state.cryptoSlice.coinTwo;
export const selectedCoinOne = (state: any) => state.cryptoSlice.coinOne;
export const selectCurrency = (state: any) => state.cryptoSlice.currency;
export const selectIsCompare = (state: any) => state.cryptoSlice.isCompare;
export const selectedCoinOneSymbol = (state: any) =>
  state.cryptoSlice.coinOneSymbol;
export const selectedCoinTwoSymbol = (state: any) =>
  state.cryptoSlice.coinTwoSymbol;
export const {
  setCurrency,
  setIsDark,
  setIsCompare,
  setCoinOne,
  setCoinTwo,
  setCoinOneSymbol,
  setCoinTwoSymbol,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;

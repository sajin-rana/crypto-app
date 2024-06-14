import { currencyLists, getLocalStorage } from "@/app/utils/utils";
import { createSlice } from "@reduxjs/toolkit";

const cryptoSlice = createSlice({
  name: "cryptoSlice",
  initialState: {
    currency: getLocalStorage("currency") || currencyLists[0],
    isDark: getLocalStorage("isDark"),
    isCompare: false,
    coinOne: "bitcoin",
    coinTwo: "",
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
  },
});

export const selectCurrency = (state: any) => state.cryptoSlice.currency;
export const selectIsDark = (state: any) => state.cryptoSlice.isDark;
export const selectIsCompare = (state: any) => state.cryptoSlice.isCompare;
export const selectedCoinOne = (state: any) => state.cryptoSlice.coinOne;
export const selectedCoinTwo = (state: any) => state.cryptoSlice.coinTwo;
export const { setCurrency, setIsDark, setIsCompare, setCoinOne, setCoinTwo } =
  cryptoSlice.actions;

export default cryptoSlice.reducer;

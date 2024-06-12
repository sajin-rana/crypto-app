import { currencyLists, getLocalStorage } from "@/app/utils/utils";
import { createSlice } from "@reduxjs/toolkit";

const cryptoSlice = createSlice({
  name: "cryptoSlice",
  initialState: {
    currency: getLocalStorage("currency") || currencyLists[0],
    isDark: getLocalStorage("isDark"),
  },
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setIsDark: (state, action) => {
      state.isDark = action.payload;
    },
  },
});

export const selectCurrency = (state: any) => state.cryptoSlice.currency;
export const selectIsDark = (state: any) => state.cryptoSlice.isDark;
export const { setCurrency, setIsDark } = cryptoSlice.actions;

export default cryptoSlice.reducer;

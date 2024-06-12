import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "./features/cryptoApi";
import cryptoSlice from "./features/cryptoSlice";

const rootReducer = combineReducers({
  [cryptoApi.reducerPath]: cryptoApi.reducer,
  cryptoSlice: cryptoSlice,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cryptoApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
